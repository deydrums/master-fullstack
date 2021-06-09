<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

}
