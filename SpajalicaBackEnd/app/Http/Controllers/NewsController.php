<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function GetStatusUpdates()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);

        $statuses = DB::select('select l.userName, u.statusMessage, u.statusTime, u.statusLocation '.
                               'from userstatusupdates u join logininfo l on l.idloginInfo = u.idloginInfo '.
                               'where l.idloginInfo <> ? and exists (select * from userFollows uf '.
                               'where uf.idloginInfo = ? and uf.idFollowed = l.idloginInfo) ',
                               [$userID[0]->idloginInfo, $userID[0]->idloginInfo]);

        return json_encode($statuses);
    }

    public function WriteStatus()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);

        DB::insert('INSERT INTO userstatusupdates (statusMessage, statusTime, statusLocation, idloginInfo) VALUES (?, NOW(), ?, ?)',
                    [$res->statusMessage, 'Default', $userID[0]->idloginInfo]);

        return 200;
    }
}
