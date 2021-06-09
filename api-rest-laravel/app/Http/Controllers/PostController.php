<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Helpers\JwtAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
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
            $jwtAuth = new \JwtAuth();
            $token = $request->header('Authorization',null);
            $user = $jwtAuth->checkToken($token,true);
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
}
