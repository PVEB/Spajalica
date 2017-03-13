<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use JWT;

class NewsController extends Controller
{
    public function GetStatusUpdates()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        $statuses = DB::select('select l.userName, u.statusMessage, u.statusTime, u.statusLocation '.
                               'from userstatusupdates u join logininfo l on l.idloginInfo = u.idloginInfo '.
                               'where l.idloginInfo = ? or exists (select * from userFollows uf '.
                               'where uf.idloginInfo = ? and uf.idFollowed = l.idloginInfo) '.
                               'order by u.statusTime desc',
                               [$userID[0]->idloginInfo, $userID[0]->idloginInfo]);

        return json_encode($statuses);
    }

    public function WriteStatus()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        DB::insert('INSERT INTO userstatusupdates (statusMessage, statusTime, statusLocation, idloginInfo) VALUES (?, NOW(), ?, ?)',
                    [$res->statusMessage, 'Default', $userID[0]->idloginInfo]);

        return 200;
    }
}
