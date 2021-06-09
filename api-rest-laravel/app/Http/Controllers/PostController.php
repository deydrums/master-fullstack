<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class PostController extends Controller
{

    public function __construct(){
        $this->middleware('api.auth',['except' =>['index', 'show']]);
    }

    public function index(){
        $posts = Post::all()->Load('category');
        return response()->json([
            'code' => 200,
            'status' =>'success',
            'categories' => $posts
        ]);
    }

    public function show($id) {
        $post = Post::find($id);
        if(is_object($post)){
            $post = $post->Load('category');
            $data = [
                'code' => 200,
                'status' =>'success',
                'category' => $post
            ];
        }else{
            $data = [
                'code' => 404,
                'status' =>'error',
                'message' => 'No existe el post'
            ];
        }
        return response()->json($data,$data['code']);
    }


    
    public function store(request $request){
        //Recoger los datos por post
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);

        if(!empty($params_array)){
            //Conseguir usuario identificado
            $user = $this->getIdentity($request);
            //Validar los datos
            $validate = Validator::make($params_array,[
                'title' => 'required',
                'content' => 'required',
                'category_id' => 'required',
                'image' => 'required'
            ]);
            //Guardar la categoria
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' =>'error',
                    'message' => 'No se ha guardado el post, faltan datos'
                ];
            }else{
                $post = new Post();
                $post->user_id = $user->sub;
                $post->category_id = $params->category_id;
                $post->title = $params->title;
                $post->content = $params->content;
                $post->image = $params->image;
                $post->save();

                $data = [
                    'code' => 200,
                    'status' =>'success',
                    'Post' => $post
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' =>'error',
                'message' => 'No se ha enviado ningun post'
            ];       
        }
        //Devolver resultado
        return response()->json($data,$data['code']);
    }

    public function update(request $request,$id){
        $post = Post::find($id);
        if(is_object($post)){

            //Recoger datos por post
            $json = $request->input('json',null);
            $params_array = json_decode($json,true);

            if(!empty($params_array)){
                //Validar los datos
                $validate = Validator::make($params_array,[
                    'title' => 'required',
                    'content' => 'required',
                    'category_id' => 'required'
                ]);

                if($validate->fails()){
                    $data = [
                        'code' => 400,
                        'status' =>'error',
                        'message' => 'No se ha actualizado el post, faltan datos'
                    ];
                }else{
                    //Quitar lo que no quero actualizar
                    unset($params_array['id']);
                    unset($params_array['user_id']);
                    unset($params_array['create_at']);
                    unset($params_array['user']);

                    //Conseguir usuario identificado
                    $user = $this->getIdentity($request);

                    //Buscar el registro a actualizar
                    $post = Post::where('id',$id)->where('user_id',$user->sub)->first();
                    if(!empty($post) && is_object($post)){
                        //Actualizar el registro(categoria)
                        $post->update($params_array);
                        $data = [
                            'code' => 200,
                            'status' =>'success',
                            'post' => $post,
                            'changes' => $params_array
                        ];
                    }else{
                        $data = [
                            'code' => 400,
                            'status' =>'error',
                            'message' => 'Este post no es de tu propiedad'
                        ];     

                    }
                    // $where = [
                    //     'id' => $id,
                    //     'user_id' => $user->sub
                    // ];
                    // $post = Post::updateOrCreate($where,$params_array);
                    //Devolver respuesta

                }
            }else{
                $data = [
                    'code' => 400,
                    'status' =>'error',
                    'message' => 'No se ha enviado ninguna actualizacion'
                ];       
            }
        }else{
            $data = [
                'code' => 404,
                'status' =>'error',
                'message' => 'El post no existe'
            ];          
        }
        //Devolver resultado
        return response()->json($data,$data['code']);
    }

    public function destroy(request $request,$id){
        //Conseguir usuario identificado
        $user = $this->getIdentity($request);
        
        //Conseguir el post
        $post = Post::where('id',$id)->where('user_id',$user->sub)->first();

        if(is_object($post)){
            $post->delete();
            $data = [
                'code' =>200,
                'status' =>'success',
                'post' =>$post
            ];
        }else{
            $data = [
                'code' => 404,
                'status' =>'error',
                'message' => 'El post no existe'
            ];          
        }
        //Devolver resultado
        return response()->json($data,$data['code']);
    }

    private function getIdentity($request){
        //Conseguir usuario identificado
        $jwtAuth = new \JwtAuth();
        $token = $request->header('Authorization',null);
        $user = $jwtAuth->checkToken($token,true);
        return $user;
    }

    public function upload(Request $request){
        //Recoger la imagen de la pericion 
        $image = $request->file('file0');
        //Validar la imagen 
        $validate = Validator::make($request->all(),[
            'file0'=> ['required','mimes:jpg,jpeg,png,gif']
        ]);
        //Guardar la imagen
        if(!$image || $validate->fails()){
            $data =[
                'code' =>400,
                'status' =>'error',
                'message' =>'Error al subir la imagen'
            ];
        }else{
            $image_name = time().$image->getClientOriginalName();
            Storage::disk('images')->put($image_name, File::get($image));            
            $data =[
                'code' =>200,
                'status' =>'success',
                'image' => $image_name
            ];
        }
        
        //Devolver datos
        return response()->json($data,$data['code']);
    }
}
