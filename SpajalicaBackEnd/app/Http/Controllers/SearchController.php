<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function GetUsers()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);

        $users = DB::select('SELECT li.userName FROM loginInfo li WHERE li.idloginInfo <> ? '.
                            'AND NOT EXISTS(SELECT ub.idloginInfo, ub.idBlocked '.
                            'FROM userBlocks ub '.
                            'WHERE ub.idloginInfo = ? AND ub.idBlocked = li.idloginInfo OR '.
                            'ub.idloginInfo = li.idloginInfo AND ub.idBlocked = ?) '.
                            'AND NOT EXISTS(SELECT uf.idloginInfo, uf.idFollowed '.
                            'FROM userFollows uf '.
                            'WHERE uf.idloginInfo = ? AND uf.idFollowed = li.idloginInfo) '.
                            'ORDER BY li.userName',
                             [$userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo]);

        return json_encode($users);
    }

    public function FollowUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        //$usersInfo = DB::select('select userName from loginInfo where userName <> ?', [$res->userName]);

        //return json_encode($usersInfo);
    }

    public function BlockUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        //$usersInfo = DB::select('select userName from loginInfo where userName <> ?', [$res->userName]);

        //return json_encode($usersInfo);
    }
}
