<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "Accion de pruebas de USER-Controller";
    }

    public function register(Request $request){
        return "Accion de registro de usuario";
    }
    public function login(Request $request){
        $name = $request->input('name');
        $surname = $request->input('surname');
        return "Accion de login de usuario: $name $surname";
    }
}
