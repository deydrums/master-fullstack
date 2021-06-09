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
Route::post('/api/user/update', 'UserController@update');