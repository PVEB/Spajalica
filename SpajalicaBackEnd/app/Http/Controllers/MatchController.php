<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class UserAndScore
{
    public $userName = -1;
    public $userScore = 0;

}

class MatchController extends Controller
{

    public function GetListOfPeople()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?', [$res->userName]);

        $users = DB::select('SELECT li.idloginInfo, li.userName FROM loginInfo li WHERE li.idloginInfo <> ? '.
            'AND NOT EXISTS(SELECT ub.idloginInfo, ub.idBlocked '.
            'FROM userBlocks ub '.
            'WHERE ub.idloginInfo = ? AND ub.idBlocked = li.idloginInfo OR '.
            'ub.idloginInfo = li.idloginInfo AND ub.idBlocked = ?) '.
            'AND NOT EXISTS(SELECT uf.idloginInfo, uf.idFollowed '.
            'FROM userFollows uf '.
            'WHERE uf.idloginInfo = ? AND uf.idFollowed = li.idloginInfo) '.
            'ORDER BY li.userName',
            [$userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo, $userID[0]->idloginInfo]);


        $userArray = Array();
        $i = 0;
        foreach($users as $user) {
            $userScore = $this->CalculateScore($userID[0]->idloginInfo, $user->idloginInfo);

            $userAndScore = new UserAndScore();
            $userAndScore->userName = $user->userName;
            $userAndScore->userScore = $userScore;
            $userArray[$i] = $userAndScore;
            $i++;


        }
        usort($userArray, function ($a, $b)
        {
            if ($a->userScore == $b->userScore) {
                return 0;
            }
            return ($a->userScore > $b->userScore) ? -1 : 1;
            //return $a->userScore > $b->userScore;
        });
        //for($i = 0 ; $i < 30 && $i < count($userArray); $i++) {
       //     echo($userArray[$i]->userID." ".$userArray[$i]->userScore."\n");
       // }
        //echo($users[0]->userName."\n");
        return json_encode(array_slice($userArray, 0, 30));
    }

    private function CalculateScore($mainUser, $otherUser) {
        //echo($mainUser. " ". $otherUser."\n");
        $otherUserProfileTags = DB::select("SELECT upt.idpreferenceTags, 10 as value ".
            "FROM userprofileTags upt ".
            "WHERE upt.idloginInfo = ? ", [$otherUser]
        );


        $otherUserPreferanceTags = DB::select("SELECT upt.idpreferenceTags, upt.value ".
            "FROM userprefTag upt ".
            "WHERE upt.idloginInfo = ? ", [$otherUser]
        );

        $mainUserPreferanceTags = DB::select("SELECT upt.idpreferenceTags, upt.value ".
            "FROM userprefTag upt ".
            "WHERE upt.idloginInfo = ? ", [$mainUser]
        );

        $score = 0;
        //foreach ($mainUserPreferanceTags as $tag  ) {
        for($i = 0; $i < count($mainUserPreferanceTags); $i++) {
           //if(($index = array_search ($tag ,$otherUserProfileTags))!== FALSE) {
            for($index = 0; $index < count($otherUserProfileTags); $index++) {
                if($mainUserPreferanceTags[$i]->idpreferenceTags == $otherUserProfileTags[$index]->idpreferenceTags){
                    $score += $this->IndividualScoreValue($mainUserPreferanceTags[$i]->value, $otherUserProfileTags[$index]->value);
                }

            }

            for($index = 0; $index < count($otherUserPreferanceTags); $index++) {
                if($mainUserPreferanceTags[$i]->idpreferenceTags == $otherUserPreferanceTags[$index]->idpreferenceTags){
                    $score += $this->IndividualScoreValue($mainUserPreferanceTags[$i]->value, $otherUserPreferanceTags[$index]->value);
                }

            }

        }
        //echo("SCORE = ".$score."\n");
        return $score;

        //return rand(-500, 500);
    }

    private function IndividualScoreValue($value1, $value2) {
        $product = $value1 * $value2;
        $sign = $product == 0 ? 0 : $product / abs($product);
        $score = $sign * (abs($value1) + abs($value2))/2;

        return $score;
    }

    //usort($your_data, "cmp");

    public function FollowUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $userFollowerIDArray = DB::select('SELECT li.idloginInfo FROM logininfo li WHERE li.userName = ?', [$res->userName]);
        $userFollowerID = $userFollowerIDArray[0]->idloginInfo;
        $userFollowedIDArray = DB::select("SELECT li.idloginInfo FROM logininfo li WHERE li.userName = ?", [$res->usernameFollowed]);
        $userFollowedID = $userFollowedIDArray[0]->idloginInfo;



        DB::insert('INSERT INTO userfollows (idloginInfo, idFollowed) VALUES(?, ?)',
            [$userFollowerID, $userFollowedID ]);
        //DB::insert('insert into loginInfo (userName, email, password) values (?, ?, ?)',
         //   [$res->userName, $res->email, $res->password]);
        return $this->GetListOfPeople();
    }

    public function BlockUser()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));



        $userBlockerIDArray = DB::select('SELECT li.idloginInfo FROM logininfo li WHERE li.userName = ?', [$res->userName]);
        $userBlockerID = $userBlockerIDArray[0]->idloginInfo;
        $userBlockedIDArray = DB::select("SELECT li.idloginInfo FROM logininfo li WHERE li.userName = ?", [$res->usernameBlocked]);
        $userBlockedID = $userBlockedIDArray[0]->idloginInfo;



        DB::insert('INSERT INTO userblocks (idloginInfo, idBlocked) VALUES(?, ?)',
            [$userBlockerID, $userBlockedID ]);
        //DB::insert('insert into loginInfo (userName, email, password) values (?, ?, ?)',
        //   [$res->userName, $res->email, $res->password]);
        return $this->GetListOfPeople();
    }
}
