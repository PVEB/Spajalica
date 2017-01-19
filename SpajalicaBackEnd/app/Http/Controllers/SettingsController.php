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

    public function GetPrefTags()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?', [$res->userName]);
    }

    public function InsertPrefTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));
    }

    public function GetUserTags()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userTags = DB::select('select pt.preferenceName '.
                               'from preferenceTags pt join userProfileTags upt  '.
                               'on pt.idPreferenceTags = upt.idPreferenceTags '.
                               'join loginInfo li '.
                               'on upt.idLoginInfo = li.idLoginInfo '.
                               'where li.userName = ?', [$res->userName]);

        return json_encode($userTags);
    }

    public function InsertUserTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?', [$res->userName]);

        $exists = DB::select('select idPreferenceTags from preferenceTags '.
                             'where preferenceName = ? ', [$res->userTag]);

        if(count($exists) > 0)
        {
            DB::insert('insert into userProfileTags (idLoginInfo, idPreferenceTags) values (?, ?)',
                       [$loginInfo[0]->idloginInfo, $exists[0]->idPreferenceTags]);
        }
        else
        {
            DB::insert('insert into preferenceTags (preferenceName) values (?)', [$res->userTag]);

            $exists = DB::select('select idPreferenceTags from preferenceTags '.
                                 'where preferenceName = ? ', [$res->userTag]);

            DB::insert('insert into userProfileTags (idLoginInfo, idPreferenceTags) values (?, ?)',
                [$loginInfo[0]->idloginInfo, $exists[0]->idPreferenceTags]);
        }

        return 200;
    }
}
