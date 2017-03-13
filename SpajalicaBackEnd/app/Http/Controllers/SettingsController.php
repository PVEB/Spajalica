<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use JWT;

class SettingsController extends Controller
{
    public function Update()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);
        $userId = $loginInfo[0]->idloginInfo;

        if (property_exists($res->selected, "firstName"))
        {
            if($res->selected->firstName != null)
                $affected = DB::update('update usersInfo set firstName = ? where idLoginInfo = ?',
                    [$res->selected->firstName, $userId]);
        }

        if (property_exists($res->selected, "lastName"))
        {
            if($res->selected->lastName != null)
                $affected = DB::update('update usersInfo set lastName = ? where idLoginInfo = ?',
                    [$res->selected->lastName, $userId]);
        }

        if (property_exists($res->selected, "birthDate"))
        {
            if($res->selected->birthDate != null)
                $affected = DB::update('update usersInfo set birthDate = ? where idLoginInfo = ?',
                    [$res->selected->birthDate, $userId]);
        }

        if (property_exists($res->selected, "sex"))
        {
            if($res->selected->sex != null)
                $affected = DB::update('update usersInfo set sex = ? where idLoginInfo = ?',
                    [$res->selected->sex, $userId]);
        }

        if (property_exists($res->selected, "location"))
        {
            if($res->selected->location != null)
                $affected = DB::update('update usersInfo set location = ? where idLoginInfo = ?',
                    [$res->selected->location, $userId]);
        }

        if (property_exists($res->selected, "relationshipStatus"))
        {
            if($res->selected->relationshipStatus != null)
                $affected = DB::update('update usersInfo set relationshipStatus = ? where idLoginInfo = ?',
                    [$res->selected->relationshipStatus, $userId]);
        }

        if (property_exists($res->selected, "profilePicture"))
        {
            if($res->selected->profilePicture != null)
            {
                $userPic = base64_decode($res->selected->profilePicture);
                DB::table('usersInfo')
                    ->where('idLoginInfo', $userId)
                    ->update(['profilePicture' => $userPic]);
            }
        }

        return 200;
    }

    public function GetPrefTags()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userPrefTags = DB::select('select pt.preferenceName, upt.value '.
                                   'from preferenceTags pt join userPrefTag upt '.
                                   'on pt.idPreferenceTags = upt.idPreferenceTags '.
						           'join loginInfo li on li.idloginInfo = upt.idloginInfo '.
                                   'where li.userName = ?',
                                   [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        return json_encode($userPrefTags);
    }

    public function InsertPrefTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        $exists = DB::select('select idPreferenceTags from preferenceTags '.
                             'where preferenceName = ? ', [$res->userTag]);

        if(count($exists) > 0)
        {
            DB::insert('insert into userPrefTag (idLoginInfo, idPreferenceTags, value) values (?, ?, ?)',
                [$loginInfo[0]->idloginInfo, $exists[0]->idPreferenceTags, $res->value]);
        }
        else
        {
            DB::insert('insert into preferenceTags (preferenceName) values (?)', [$res->userTag]);

            $exists = DB::select('select idPreferenceTags from preferenceTags '.
                                 'where preferenceName = ? ', [$res->userTag]);

            DB::insert('insert into userPrefTag (idLoginInfo, idPreferenceTags, value) values (?, ?, ?)',
                       [$loginInfo[0]->idloginInfo, $exists[0]->idPreferenceTags, $res->value]);
        }

        return 200;
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
                               'where li.userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        return json_encode($userTags);
    }

    public function InsertUserTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

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

    public function DelPrefTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?',
                                [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);
        $idPrefTag = DB::select('select idPreferenceTags from preferenceTags where preferenceName = ?',
                                [$res->userPrefTagName]);

        $num = DB::delete('DELETE FROM userpreftag WHERE idpreferenceTags = ? and idloginInfo = ?',
            [$idPrefTag[0]->idPreferenceTags, $loginInfo[0]->idloginInfo]);

        if($num < 0)
            return 500;

        return 200;
    }

    public function DelUserTag()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $loginInfo = DB::select('select * from loginInfo where userName = ?',
                                [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);
        $idPrefTag = DB::select('select idPreferenceTags from preferenceTags where preferenceName = ?',
                                [$res->userTagName]);

        $num = DB::delete('DELETE FROM userprofiletags WHERE idpreferenceTags = ? and idloginInfo = ?',
                    [$idPrefTag[0]->idPreferenceTags, $loginInfo[0]->idloginInfo]);

        if($num < 0)
            return 500;

        return 200;
    }

    public function GetAllTags()
    {
        $tags = DB::select('select preferenceName from preferenceTags');

        return json_encode($tags);
    }
}
