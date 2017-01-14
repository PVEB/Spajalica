<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;


class UserInfo {
    public $firstName = null;
    public $lastName = null;
    public $birthDate = null;
    public $joinedDate = null;
    public $sex = null;
    public $location = null;
    public $profilePicture = null;
    public $relationshipStatus = null;
}

class ProfileController extends Controller
{
     /**
     * Show the profile for the given user
     * @return Response
     */
    public function Show()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?', [$res->userName]);
        $usersInfo = DB::select('select * from usersInfo where idloginInfo = ?', [$loginInfo[0]->idloginInfo]);

        if (count($usersInfo) > 0)
        {
            //ne moze biti vise od jednog unosa,
            //to je reseno na nivou baze
            return json_encode($usersInfo[0]);
        }
        else
        {
            //treba obraditi i ako nema unos, za svaki slucaj
            //iako je to reseno na nivou baze
            return 0;
        }
    }
}

