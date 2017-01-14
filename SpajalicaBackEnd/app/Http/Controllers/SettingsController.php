<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    public function Update()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?', [$res->userName]);
        $userId = $loginInfo[0]->idloginInfo;

        if (property_exists($res->selected, "firstName"))
        {
            $affected = DB::update('update usersInfo set firstName = ? where idLoginInfo = ?',
                                    [$res->selected->firstName, $userId]);
        }

        if (property_exists($res->selected, "lastName"))
        {
            $affected = DB::update('update usersInfo set lastName = ? where idLoginInfo = ?',
                                    [$res->selected->lastName, $userId]);
        }

        if (property_exists($res->selected, "birthDate"))
        {
            $affected = DB::update('update usersInfo set birthDate = ? where idLoginInfo = ?',
                [$res->selected->birthDate, $userId]);
        }

        if (property_exists($res->selected, "sex"))
        {
            $affected = DB::update('update usersInfo set sex = ? where idLoginInfo = ?',
                                    [$res->selected->sex, $userId]);
        }

        if (property_exists($res->selected, "location"))
        {
            $affected = DB::update('update usersInfo set location = ? where idLoginInfo = ?',
                                    [$res->selected->location, $userId]);
        }

        if (property_exists($res->selected, "relationshipStatus"))
        {
            $affected = DB::update('update usersInfo set relationshipStatus = ? where idLoginInfo = ?',
                                    [$res->selected->relationshipStatus, $userId]);
        }

        return 200;
    }
}
