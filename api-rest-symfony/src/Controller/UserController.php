<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;
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
        $json = $request->get('json',null);
        //Decodificar el json
        $params = json_decode($json);
        //Hacer una respuesta por defecto


        //Comprobar y validar datos
        if($json == NULL || $json == ''){
            $data =['code' => '400', 'status' => 'error','message' => 'Datos no enviados.'];
        }else{
            $name = (!empty($params->name)) ? $params -> name : null;
            $surname = (!empty($params->surname)) ? $params -> surname : null;
            $email = (!empty($params->email)) ? $params -> email : null;
            $password = (!empty($params->password)) ? $params -> password : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email,[
                new Email()
            ]);
            if(!empty($email) && count($validate_email)==0 && !empty($password) && !empty($name) && !empty($surname)) {
                $data =['code' => '200','status' => 'success','message' => 'Usuario creado'];
            }else{
                $data =['code' => '400', 'status' => 'error','message' => 'Validacion incorrecta.'];
            }

            
        }
        //Si la validacion es correcta, crear el objeto del usuario

        //Cifrar la contraseña

        //Comprobar si el usuario existe

        //Si no existe, guardarlo en la bbdd

        //Hacer respuesta
        return new JsonResponse($data);
    }
}
