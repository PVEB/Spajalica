<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('ID/{id}',function($id){
    echo 'ID: '.$id;
});

Route::get('hello', function () {
    return '<h1>Hello World</h1>';
});

Route::get('Profile/{id}', 'ProfileController@Show');

Route::post('Profile', 'ProfileController@Transform')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginVerify', 'LoginController@VerifyUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginRegister', 'LoginController@AddUser')->middleware(\App\Http\Middleware\Cors::class);
