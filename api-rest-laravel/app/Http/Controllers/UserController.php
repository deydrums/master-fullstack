<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


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

        if((!empty($params)) && (!empty($params_array))){
            //Limpiar datos
            $params_array = array_map('trim',$params_array);
            
            //Validar datos
            $validate = Validator::make($params_array,[
                'name' => 'required|regex:/^[\pL\s\-]+$/u',
                'surname' => 'required|regex:/^[\pL\s\-]+$/u',
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validate->fails()){
                //Validacion fallida
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se ha creado',
                    'errors' => $validate->errors()
                );
            }else{
                //Validacion Correcta
                //Cifrar la contraseña
                //Comprobar si el usuario existe
                //Crear el usuario

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se ha creado correctamente'
                );
            }
        }else{
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Los datos enviados no son correctos'
            );
        }



        return response()->json($data,$data['code']);
    }

    public function login(Request $request){
        $name = $request->input('name');
        $surname = $request->input('surname');
        return "Accion de login de usuario: $name $surname";
    }
}



//{"name":"David","surname":"Garcia","email":"dagarcia100@gmail.com","password":"david1234"}