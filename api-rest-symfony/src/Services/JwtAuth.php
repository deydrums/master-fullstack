<?php 
namespace App\Services;
use Firebase\JWT\JWT;
use App\Entity\User;

class JwtAuth{
    public $manager;
    public $key;

    public function __construct($manager){
        $this->manager = $manager;
        $this->key = 'Esta es una clave supersecreta%$#';
    }

    public function signup($email, $password, $gettoken = null){
        //Comprobar si el usuario existe 
        $user = $this->manager->getRepository(User::class)->findOneBy([
            'email' => $email,
            'password' => $password
        ]);

        $singup = false;
        if(is_object($user)){
            $singup = true;
        }
        //Si existe, generar el token de jwt
        if($singup){
            $token = [
                'sub' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'email' => $user->getEmail(),
                'iat' => time(),
                'exp' => time() + (7*24*60*60),
            ];

            $jwt = JWT::encode($token, $this->key, 'HS256');

            //Comprobar el flag gettoken, condicion
            if(!empty($gettoken)){
                //Devolver los datos
                $data = ['code' => 200,'status' => 'success','message' => 'Bienvenido de nuevo.','token' => $jwt];
            }else{
                $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                $data = ['code' => 200,'status' => 'success','message' => 'Bienvenido de nuevo.','user' => $decoded];
            }

        
        }else{
            $data = ['code' => 400,'status' => 'error','message' => 'Email o/y password incorrectos'];
        }

        return $data;
    }

    public function checkToken($jwt, $identity = false){
        $auth = false;
        try{
        $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        }catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\SignatureInvalidException $e){
            $auth = false;
        }catch( \DomainException $e){
            $auth = false;
        }

        if(isset($decoded) && !empty($decoded) && is_object($decoded) && isset($decoded->sub)){
            $auth = true;
        }else{
            $auth = false;
        }

        if($identity != false){
            return $decoded;
        }else{
            return $auth;
        }

        return $auth;
    }
}

?>