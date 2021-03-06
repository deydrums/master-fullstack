<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;
use App\Services\JwtAuth;
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
            $data =['code' => 400, 'status' => 'error','message' => 'Datos no enviados.'];
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
                //Si la validacion es correcta, crear el objeto del usuario
                $user = new User();
                $user->setName($name); 
                $user->setSurname($surname);
                $user->setEmail($email);
                $user->setRole('ROLE_USER');
                $user->setCreatedAt(new \DateTime('now'));
                //Cifrar la contrase??a
                $pwd = hash('sha256',$password);
                $user->setPassword($pwd);
                //Comprobar si el usuario existe
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();
                $user_repo = $doctrine->getRepository(User::class);
                $isset_user = $user_repo->findBy(array(
                    'email' => $email
                ));

                if(count($isset_user) == 0) {
                    //Si no existe, guardarlo en la bbdd
                    $em->persist($user);
                    $em->flush();
                    //Hacer respuesta
                    $data =['code' => 200,'status' => 'success','message' => 'Usuario creado exitosamente.','user'=>$user];
                }else{
                    $data =['code' => 400, 'status' => 'error','message' => 'El email ya ha sido registrado anteriormente.'];
                }
                
            }else{
                $data =['code' => 400, 'status' => 'error','message' => 'Validacion de datos incorrecta.'];
            }

            
        }

        return $this->resjson($data);
    }

    public function login(request $request, JwtAuth $jwt_auth){
        //Recoger los datos por post
        $json = $request->get('json',null);
        //Decodificar el json
        $params = json_decode($json);

        if($json == NULL || $json == ''){
            $data =['code' => 400, 'status' => 'error','message' => 'Datos no enviados.'];
        }else{
            //Comprobar y validar datos
            $email = (!empty($params->email)) ? $params -> email : null;
            $password = (!empty($params->password)) ? $params -> password : null;
            $gettoken = (!empty($params->gettoken)) ? $params -> gettoken : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email,[
                new Email()
            ]);
            if(!empty($email) && count($validate_email)==0 && !empty($password)) {
                //Cifrar la contrase??a
                $pwd = hash('sha256',$password);
                //Si todo es valido, llamaremos a un servicio para identificar al usuario (jwt, token o un objeto)
                if($gettoken){
                    $signup = $jwt_auth->signup($email, $pwd, $gettoken);
                    $data = $signup;
                }else{
                    $signup = $jwt_auth->signup($email, $pwd);
                    $data = $signup;
                }
                //Si nos devuelve bien los datos, respuesta
                
            }else{
                $data =['code' => 400, 'status' => 'error','message' => 'Validacion de datos incorrecta.'];
            }


        }


        return $this->resjson($data);
    }

    public function edit(Request $request, JwtAuth $jwt_auth){
        //Recoger la cabecera de autenticacion 
        $token = $request->headers->get('Authorization');
        //Crear un metodo para comprobar si el token es correcto
        $authCheck = $jwt_auth->checkToken($token);
        //Si es correcto, hacer la actualizacion 
        if($authCheck){
            //Actualizar usuario

            //Conseguir entity manager
            $em = $this->getDoctrine()->getManager();
            //Conseguir los datos del usuario identificado
            $identity = $jwt_auth->checkToken($token, true);
            //Conseguir el usuario a actualizar completo
            $user_repo = $this->getDoctrine()->getRepository(User::class);
            $user = $user_repo -> findOneBy([
                'id' => $identity->sub
            ]);
            //Recoger datos por post
            $json = $request->get('json',null);
            $params = json_decode($json);
            //Comprobar y validar los datos

        //Comprobar y validar datos
        if($json == NULL || $json == ''){
            $data =['code' => 400, 'status' => 'error','message' => 'Datos no enviados.'];
        }else{
            $name = (!empty($params->name)) ? $params -> name : null;
            $surname = (!empty($params->surname)) ? $params -> surname : null;
            $email = (!empty($params->email)) ? $params -> email : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email,[
                new Email()
            ]);
            if(!empty($email) && count($validate_email)==0 && !empty($name) && !empty($surname)) {
                //Si la validacion es correcta, crear el objeto del usuario
                $user->setName($name); 
                $user->setSurname($surname);
                $user->setEmail($email);

                $isset_user = $user_repo->findBy(array(
                    'email' => $email
                ));

                if(count($isset_user) == 0 || $identity->email == $email) {
                    //Si no existe, guardarlo en la bbdd
                    $em->persist($user);
                    $em->flush();
                    //Hacer respuesta
                    $data =['code' => 200,'status' => 'success','message' => 'Datos actualizados exitosamente.','user'=>$user];
                }else{
                    $data =['code' => 400, 'status' => 'error','message' => 'El email ya ha sido registrado por otro usuario.'];
                }
                
            }else{
                $data =['code' => 400, 'status' => 'error','message' => 'Validacion de datos incorrecta.'];
            }

            
        }

            //Asignar nuevos datos al objeto del usuario

            //Comprobar duplicados

            //Guardar datos en la bbdd
            //$data =['code' => '200','status' => 'success','message' => 'Datos actualizados exitosamente.',$user];

        }

        return $this->resjson($data);
    }
}
