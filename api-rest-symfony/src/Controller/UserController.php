<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use App\Entity\Video;

class UserController extends AbstractController
{
    private function resjson($data){
        //Serializar datos con servicio serializer
        $json = $this->get('serializer')->serialize($data, 'json');
        //Respose HttpFoundation
        $response = new Response();
        //Asignar contenido a la respuesta
        $response->setContent($json);
        //Indicar formato de respuesta
        $response->headers->set('Content-Type', 'application/json');
        //Devolver respuesta
        return $response;
    }

    public function index(): Response
    {
        $user_repo = $this->getDoctrine()->getRepository(User::class);
        $video_repo = $this->getDoctrine()->getRepository(Video::class);

        $users = $user_repo->findAll();
        $videos = $video_repo->findAll();
        $user = $user_repo->find(1);
        $data = [
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ];
        // foreach ($users as $user){
        //     echo "<h1>{$user->getName()} {$user->getSurname()}</h1>";
        //     foreach ($user ->getVideos() as $video){
        //         echo "<p>{$video->getTitle()} {$video->getUser()->getEmail()}</p>";
        //     }
        // }
        //die();
        return $this->resjson($videos);
    }

    public function create(Request $request){
        //Recoger los datos por post

        //Decodificar el json

        //Hacer una respuesta por defecto
        $data =[
            'status' => 'success',
            'message' => 'Usuario creado',
            'code' => '200'
        ];
        //Comprobar y validar datos

        //Si la validacion es correcta, crear el objeto del usuario

        //Cifrar la contraseña

        //Comprobar si el usuario existe

        //Si no existe, guardarlo en la bbdd

        //Hacer respuesta
        return $this->resjson($data);
    }
}
