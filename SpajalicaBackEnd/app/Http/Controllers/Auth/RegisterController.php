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

class RegisterController extends Controller
{
    public function AddUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data), FALSE);

        DB::insert('insert into loginInfo (userName, email, password) values (?, ?, ?)',
            [$res->userName, $res->email, $res->password]);

        return 200;
    }
}
