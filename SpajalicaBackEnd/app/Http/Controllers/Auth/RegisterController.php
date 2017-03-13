<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

//class User {
//    public $userName;
//    public $email;
//    public $password;
//}

class RegisterController extends Controller
{
    public static function AddUser($data)
    {
        $res = json_decode(json_encode($data), FALSE);

        try{
            DB::insert('insert into loginInfo (userName, email, password) values (?, ?, ?)',
                [$res->userName, $res->email, $res->password]);
        }
        catch(\Exception $e){
            return [];
        }

        return DB::select('select * from loginInfo where userName = ? and password = ?',
            [$res->userName, $res->password]);
    }
}
