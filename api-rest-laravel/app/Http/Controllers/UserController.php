<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "Accion de pruebas de USER-Controller";
    }

    public function register(Request $request){

        //Recoger los datos del usuario por post
        $json = $request->input('json',null);
        var_dump($json);
        $params = json_decode($json); //Objeto
        $params_array = json_decode($json,true);//Array
        
        //Validar datos
        //Cifrar la contraseña
        //Comprobar si el usuario existe
        //Crear el usuario

        $data = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'El usuario no se ha creado'
        );

        return response()->json($data,$data['code']);
    }

    public function login(Request $request){
        $name = $request->input('name');
        $surname = $request->input('surname');
        return "Accion de login de usuario: $name $surname";
    }
}



//{"name":"David","surname":"Garcia","email":"dagarcia100@gmail.com","password":"david1234"}