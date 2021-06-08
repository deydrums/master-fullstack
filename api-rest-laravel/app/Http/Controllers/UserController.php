<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "Accion de pruebas de USER-Controller";
    }

    public function register(Request $request){

        //Recoger los datos del usuario por post
        $json = $request->input('json',null);
        $params = json_decode($json); //Objeto
        $params_array = json_decode($json,true);//Array

        if((!empty($params)) && (!empty($params_array))){
            //Limpiar datos
            $params_array = array_map('trim',$params_array);
            
            //Validar datos
            $validate = Validator::make($params_array,[
                'name' => 'required|regex:/^[\pL\s\-]+$/u',
                'surname' => 'required|regex:/^[\pL\s\-]+$/u',
                'email' => 'required|email|unique:users', //Comprobar si el usuario existe
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
                $pwd = hash('sha256',$params->password);
        
                //Crear el usuario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->role = 'ROLE_USER';
                $user->password = $pwd;

                //Guardar el usuario
                $user->save();               

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se ha creado correctamente',
                    'user' => $user
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
        $jwtAuth = new \JwtAuth();
        //Recibir datos por post
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);

        //Validar esos datos
        $validate = Validator::make($params_array,[
            'email' => 'required|email', 
            'password' => 'required'
        ]);

        if($validate->fails()){
            //Validacion fallida
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha podido loggear',
                'errors' => $validate->errors()
            );
        }else{
        //Cifrar la contraseña
            $pwd = hash('sha256',$params -> password);
        //Devolver token o datos
            $signup = $jwtAuth->signup($params->email,$pwd);

            if(!empty($params->gettoken)){
                $signup = $jwtAuth->signup($params->email,$pwd,true);
            }
        }

        

        return  response()->json($signup,200);
    }
}



//{"name":"David","surname":"Garcia","email":"dagarcia100@gmail.com","password":"david1234"}