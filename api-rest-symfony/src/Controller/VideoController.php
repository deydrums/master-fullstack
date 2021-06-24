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

use Knp\Component\Pager\PaginatorInterface;

class VideoController extends AbstractController
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
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/VideoController.php',
        ]);
    }

    public function create(Request $request, JwtAuth $jwt_auth){
        //Recoger token
        $token = $request->headers->get('Authorization',null);
        //Comprobar si es correcto
        $authCheck = $jwt_auth->checkToken($token);
        if(!$authCheck){
            $data =['code' => 400,'status' => 'error','message' => 'No estas autenticado.'];
        }else{
            //Recoger datos por post
            $json = $request->get('json',null);
            $params = json_decode($json);

            //Recoger objeto del usuario
            $identity = $jwt_auth->checkToken($token, true);

            //Comprobar y validar datos
            if(!empty($json)){
                $user_id = ($identity ->sub !=null) ? $identity ->sub : null;
                $title = (!empty($params->title)) ? $params -> title : null;
                $description = (!empty($params->description)) ? $params -> description : null;
                $url = (!empty($params->url)) ? $params -> url : null;

                if(!empty($user_id) && !empty($title)){
                    //Guardar nuevo video
                    $em = $this->getDoctrine()->getManager();
                    $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                        'id' => $user_id
                    ]);
                    //Crear y guardar objeto
                    $video = new Video();
                    $video->setUser($user);
                    $video->setTitle($title);
                    $video->setDescription($description);
                    $video->setUrl($url);
                    $video->setStatus('normal');
                    $createAt = new \DateTime('now');
                    $updateAt = new \DateTime('now');
                    $video->setCreatedAt($createAt);
                    $video->setUpdatedAt($updateAt);

                    //Guardar en bbdd
                    $em->persist($video);
                    $em->flush();
                    $data =['code' => 200,'status' => 'success','message' => 'Video creado exitosamente.', $video];

                }else{
                    $data =['code' => 400,'status' => 'error','message' => 'Faltan datos.'];

                }


            }else{
                $data =['code' => 400,'status' => 'error','message' => 'No has enviado datos.'];

            }

        }


        //Respuesta
        
        return $this->resjson($data);
    }

    public function videos(Request $request, JwtAuth $jwt_auth, PaginatorInterface $paginator){
        //Recoger la cabecera de autenticacion
        $token = $request->headers->get('Authorization');
        //Comprobar el token
        $authCheck = $jwt_auth->checkToken($token);
        //Si es valido 
        if(!$authCheck){
            $data =['code' => 400,'error' => 'success','message' => 'No estas autenticado.'];
        }else{
            //Conseguir identidad del usuario
            $identity = $jwt_auth->checkToken($token, true);
            $em = $this->getDoctrine()->getManager();
            //Hacer una consulta para paginar
            $dql = "SELECT v FROM App\Entity\Video v WHERE v.user = {$identity->sub} ORDER BY v.id DESC";
            $query = $em->createQuery($dql);
            //Recoger el parametro page de la url
            $page = $request->query->getInt('page', 1);
            $items_per_page = 5;
            //Invocar paginacion
            $pagination = $paginator -> paginate($query, $page, $items_per_page);
            $total = $pagination->getTotalItemCount();
            //Preparar array de datos para devolver
            $data =['code' => 200,'status' => 'success','message' => 'Listado de videos.','total_items_count' => $total, 'page_actual'=> $page, 'items_per_page' => $items_per_page, 'total_pages'=> ceil($total / $items_per_page), 'videos' => $pagination, 'user_id' => $identity->sub];
        }

        
        return $this->resjson($data);

    }

    public function video(Request $request, JwtAuth $jwt_auth, $id = null){
        //Sacar el token y comprobarla

        //Sacar identitidad del usuario

        //Sacar objeto del video

        //Comprobar si el video existe y es propiedad del usuario autenticado

        //Devolver respuesta
        $data =['code' => 200,'status' => 'success','message' => 'Video.'];
        return $this->resjson($data);
    }
}
