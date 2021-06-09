<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function __construct(){
        $this->middleware('api.auth',['except' =>['index', 'show']]);
    }
    public function index(){
        $categories = Category::all();
        return response()->json([
            'code' => 200,
            'status' =>'success',
            'categories' => $categories
        ]);
    }

    public function show($id) {
        $category = Category::find($id);
        if(is_object($category)){
            $data = [
                'code' => 200,
                'status' =>'success',
                'category' => $category
            ];
        }else{
            $data = [
                'code' => 404,
                'status' =>'error',
                'message' => 'No existe la categoria'
            ];
        }
        return response()->json($data,$data['code']);
    }

    public function store(request $request){
        //Recoger los datos por post
        $json = $request->input('json',null);
        $params_array = json_decode($json,true);

        if(!empty($params_array)){
            //Validar los datos
            $validate = Validator::make($params_array,[
                'name' => 'required'
            ]);
            //Guardar la categoria
            if($validate->fails()){
                $data = [
                    'code' => 400,
                    'status' =>'error',
                    'message' => 'No se ha guardado la categoria'
                ];
            }else{
                $category = new Category();
                $category->name = $params_array['name'];
                $category->save();
                $data = [
                    'code' => 200,
                    'status' =>'success',
                    'category' => $category
                ];
            }
        }else{
            $data = [
                'code' => 400,
                'status' =>'error',
                'message' => 'No se ha enviado ninguna categoria'
            ];       
        }
        //Devolver resultado
        return response()->json($data,$data['code']);
    }
}
