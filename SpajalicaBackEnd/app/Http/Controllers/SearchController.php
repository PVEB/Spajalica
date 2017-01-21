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

    public function SearchUsers()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);

        $users = DB::select('SELECT li.userName, ui.firstName, ui.lastName, ui.birthDate, ui.joinedDate, '.
            'ui.sex, ui.location, ui.profilePicture, ui.relationshipStatus '.
            'FROM loginInfo li join usersInfo ui '.
            'ON ui.idloginInfo = li.idloginInfo '.
            'WHERE li.idloginInfo <> ? '.
            'AND NOT EXISTS(SELECT ub.idloginInfo, ub.idBlocked '.
            'FROM userBlocks ub '.
            'WHERE ub.idloginInfo = ? AND ub.idBlocked = li.idloginInfo OR '.
            'ub.idloginInfo = li.idloginInfo AND ub.idBlocked = ?) '.
            'AND NOT EXISTS(SELECT uf.idloginInfo, uf.idFollowed '.
            'FROM userFollows uf '.
            'WHERE uf.idloginInfo = ? AND uf.idFollowed = li.idloginInfo) '.
            'ORDER BY li.userName',
            [$userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo]);

        $searchedUsers = [];

        for ($i = 0; $i < count($users); $i++)
        {
            if (strstr($users[$i]->userName, $res->criteria) !== false ||
                strstr($users[$i]->firstName, $res->criteria) !== false ||
                strstr($users[$i]->lastName, $res->criteria) !== false ||
                strstr($users[$i]->location, $res->criteria) !== false ||
                strstr($users[$i]->relationshipStatus, $res->criteria) !== false)
            {
                array_push($searchedUsers, $users[$i]);
                continue;
            }

            if(strlen($res->criteria) > 3 && strlen($res->criteria) < strlen($users[$i]->userName))
            {
                $substrLen = ceil(0.7*strlen($res->criteria));

                $begin = 0;

                while($begin + $substrLen <= strlen($res->criteria))
                {
                    $subcriteria = substr($res->criteria, $begin, $substrLen);
                    if (strstr($users[$i]->userName, $subcriteria) !== false ||
                        strstr($users[$i]->firstName, $subcriteria) !== false ||
                        strstr($users[$i]->lastName, $subcriteria) !== false ||
                        strstr($users[$i]->location, $subcriteria) !== false ||
                        strstr($users[$i]->relationshipStatus, $subcriteria) !== false)
                    {
                        array_push($searchedUsers, $users[$i]);
                    }
                    $begin++;
                }
            }
        }

        return json_encode($searchedUsers);
    }

    public function FollowUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $follower = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);
        $userFollowed = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userFollowed]);
        DB::insert('insert into userFollows (idloginInfo, idFollowed) values (?, ?)',
                  [$follower[0]->idloginInfo, $userFollowed[0]->idloginInfo]);

        return 200;
    }

    public function BlockUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $blocker = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);
        $userBlocked = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userBlocked]);
        DB::insert('insert into userBlocks (idloginInfo, idBlocked) values (?, ?)',
                  [$blocker[0]->idloginInfo, $userBlocked[0]->idloginInfo]);

        return 200;
    }
}
