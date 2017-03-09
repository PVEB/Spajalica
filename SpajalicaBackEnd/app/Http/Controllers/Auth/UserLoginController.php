<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class UserLoginController extends Controller
{
    public static function VerifyUser($credentials)
    {
        $res = json_decode(json_encode($credentials), FALSE);

        $results = DB::select('select * from loginInfo where userName = ? and password = ?',
            [$res->userName, $res->password]);

        if (count($results) > 0)
        {
            return $results;
        }
        else
        {
            return [];
        }
    }
}
