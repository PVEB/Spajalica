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

Route::group(['prefix' => 'verify'], function()
{
    Route::post('login', 'AuthenticateController@login')->middleware(\App\Http\Middleware\Cors::class);
    Route::post('register', 'AuthenticateController@register')->middleware(\App\Http\Middleware\Cors::class);
});

//Route::get('ID/{id}',function($id){
//    echo 'ID: '.$id;
//});

Route::post('ShowProfile', 'ProfileController@Show')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginVerify', 'OldLoginController@VerifyUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('LoginRegister', 'OldLoginController@AddUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('UpdateProfile', 'SettingsController@Update')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SendMessage', 'MessagesController@Send')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetMessages', 'MessagesController@GetMessages')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUsers', 'MessagesController@GetUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetAvailableUsers', 'SearchController@GetAvailableUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SearchUserCriteria', 'SearchController@SearchUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('BlockUser', 'SearchController@BlockUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('FollowUser', 'SearchController@FollowUser')->middleware(\App\Http\Middleware\Cors::class);

Route::post('WriteStatus', 'NewsController@WriteStatus')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetStatusUpdates', 'NewsController@GetStatusUpdates')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetPrefTags', 'SettingsController@GetPrefTags')->middleware(\App\Http\Middleware\Cors::class);

Route::post('InsertPrefTag', 'SettingsController@InsertPrefTag')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUserTags', 'SettingsController@GetUserTags')->middleware(\App\Http\Middleware\Cors::class);

Route::post('InsertUserTag', 'SettingsController@InsertUserTag')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetListOfPeople', 'MatchController@GetListOfPeople')->middleware(\App\Http\Middleware\Cors::class);

Route::post('DelUserTag', 'SettingsController@DelUserTag')->middleware(\App\Http\Middleware\Cors::class);

Route::post('DelPrefTag', 'SettingsController@DelPrefTag')->middleware(\App\Http\Middleware\Cors::class);

Route::get('GetTags', 'SettingsController@GetAllTags')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SearchFollowCriteria', 'SearchController@SearchFollowedUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('SearchBlockedCriteria', 'SearchController@SearchBlockedUsers')->middleware(\App\Http\Middleware\Cors::class);

Route::post('Unfollow', 'SearchController@Unfollow')->middleware(\App\Http\Middleware\Cors::class);

Route::post('Unblock', 'SearchController@Unblock')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUserUpdates', 'ProfileController@GetUserUpdates')->middleware(\App\Http\Middleware\Cors::class);

Route::post('DeleteStatus', 'ProfileController@DeleteStatus')->middleware(\App\Http\Middleware\Cors::class);

Route::post('GetUserName', 'UserInfoController@GetUserName')->middleware(\App\Http\Middleware\Cors::class);
