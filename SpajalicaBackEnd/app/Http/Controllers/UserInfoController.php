<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use JWT;

class UserInfoController extends Controller
{
    public function GetUserName()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        return JWT::decode($res->token, config('app.key'), array('HS256'))->userName;
    }
}
