<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Cargando clases

use App\Http\Middleware\ApiAuthMiddleware;

//Rutas de prueba
Route::get('/welcome', function () {
    return view('welcome');
});



Route::get('/pruebas/{nombre?}', function ($nombre = null) {
    $texto = '<h2>Texto desde una ruta ';
    $texto.= 'Nombre: ' .$nombre. '</h2>';
    return view ('pruebas',array('texto' => $texto));
});

Route::get('/animales','PruebasController@index');
Route::get('/test-orm','PruebasController@testOrm');

//RUTAS DEL API
/**Metodos HTTP comunes
 * GET: Conseguir datos o recursos
 * POST: Guardar datos o recursos o hacer logica desde un formulario
 * PUT: Actualizar datos o recursos
 * DELETE: Eliminar dtos o recursos
 */

//Rutas de prueba
Route::get('/usuario/pruebas','UserController@pruebas');
Route::get('/categoria/pruebas','CategoryController@pruebas');
Route::get('/entrada/pruebas','PostController@pruebas');

//Rutas del controlador de usuarios
Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::put('/api/user/update', 'UserController@update');

Route::post('/api/user/upload','UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('/api/user/avatar/{filename}','UserController@getImage');

Route::get('/api/user/detail/{id}','UserController@detail');

//Rutas del controlador de categorias
Route::resource('/api/category', 'CategoryController');

//Rutas del controlador de entradas
Route::resource('/api/post', 'PostController');