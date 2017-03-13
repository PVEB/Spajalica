<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public static function VerifyUser($credentials)
    {
        $res = json_decode(json_encode($credentials), FALSE);

        try{
            $results = DB::select('select * from loginInfo where userName = ? and password = ?',
                [$res->userName, $res->password]);
        }
        catch(\Exception $e){
            return [];
        }

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
