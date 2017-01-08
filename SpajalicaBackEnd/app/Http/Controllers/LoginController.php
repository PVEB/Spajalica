<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class Korisnik {
    public $ime;
    public $prezime;
    public $userName;
    public $email;
    public $lozinka;
}

class LoginController extends Controller
{
    public function VerifyUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data), FALSE);

        $results = DB::select('select * from users where userName = ? and lozinka = ?', [$res->userName, $res->password]);

        if (count($results) > 0)
        {
            return json_encode($results[0]);
        }
        else
        {
            return 0;
        }
    }

    public function AddUser()
    {
        $data = Input::all();
        $results = DB::select('select * from users where userName = ? and lozinka = ?', $data.userName, $data.password);
        if (count($results))
        {
            return $results[0];
        }
        else
        {
            return 0;
        }
    }
}
