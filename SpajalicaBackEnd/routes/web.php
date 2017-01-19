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

Route::post('ShowProfile', 'ProfileController@Show')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginVerify', 'LoginController@VerifyUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginRegister', 'LoginController@AddUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('UpdateProfile', 'SettingsController@Update')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SendMessage', 'MessagesController@Send')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetMessages', 'MessagesController@GetMessages')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUsers', 'MessagesController@GetUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetFollowListUsers', 'SearchController@GetUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SearchUserCriteria', 'SearchController@SearchUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('BlockUser', 'SearchController@BlockUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('FollowUser', 'SearchController@FollowUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('WriteStatus', 'NewsController@WriteStatus')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetStatusUpdates', 'NewsController@GetStatusUpdates')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetPrefTags', 'SettingsController@GetPrefTags')->middleware(\App\Http\Middleware\Cors::class);

Route::post('InsertPrefTag', 'SettingsController@InsertPrefTag')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUserTags', 'SettingsController@GetUserTags')->middleware(\App\Http\Middleware\Cors::class);

Route::post('InsertUserTag', 'SettingsController@InsertUserTag')->middleware(\App\Http\Middleware\Cors::class);
