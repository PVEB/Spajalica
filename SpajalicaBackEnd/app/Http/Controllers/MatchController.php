<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use JWT;

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

        $userID = DB::select('select idloginInfo from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

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
        $score = 0;

        $mainUserDetails = DB::select("SELECT * ".
            "FROM usersInfo ui ".
            "WHERE ui.idloginInfo = ? ", [$mainUser]
        );

        $otherUserDetails = DB::select("SELECT * ".
            "FROM usersInfo ui ".
            "WHERE ui.idloginInfo = ? ", [$otherUser]
        );

        if(!$this->isInRelationship($mainUserDetails[0]->relationshipStatus) && !$this->isInRelationship($otherUserDetails[0]->relationshipStatus)){
            $score += 30;
        } else{
            $score -= 50;
        }

        if($this->isMale($mainUserDetails[0]->sex) && $this->isFemale($otherUserDetails[0]->sex)) {
            $score += 30;
        } elseif($this->isFemale($mainUserDetails[0]->sex) && $this->isMale($otherUserDetails[0]->sex)) {
            $score += 30;
        } elseif($this->isMale($mainUserDetails[0]->sex) && $this->isMale($otherUserDetails[0]->sex)) {
            $score -= 30;
        } elseif($this->isFemale($mainUserDetails[0]->sex) && $this->isFemale($otherUserDetails[0]->sex)) {
            $score -= 30;
        }

        if($mainUserDetails[0]->location == $otherUserDetails[0]->location) {
            $score += 15;
        } else{
            $score -= 5;
        }

        $ageDif = $this->getAgeDiff($mainUserDetails[0]->birthDate, $otherUserDetails[0]->birthDate);

        if($ageDif > 0 && $ageDif <= 5) {
            $score += 15;
        } else {
            $score -= 10 + $ageDif;
        }
        //echo ("test".$otherUserDetails[0]->birthDate."\n");

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

        return $score;

        //return rand(-500, 500);
    }

    private function getAgeDiff($age1, $age2) {

        if($age1 == "" || $age2 == "") {
            return -1;
        }

        $intAge1 = intval(substr($age1, 0, 4));
        $intAge2 = intval(substr($age2, 0, 4));

        return abs($intAge1 - $intAge2);
    }

    private function  isInRelationship($relationship) {
        if($relationship == "U vezi" || $relationship == "Komplikovano"  || $relationship == "У вези") {
            return true;
        } else {
            return false;
        }
    }

    private function isMale($sex) {
        if($sex == "M" || $sex == "М") {
            return true;
        } else {
            return false;
        }
    }

    private function isFemale($sex) {
        if($sex == "Z" ||$sex == "Ž"|| $sex == "Ж") {
            return true;
        } else {
            return false;
        }
    }
    private function IndividualScoreValue($value1, $value2) {
        $product = $value1 * $value2;
        $sign = $product == 0 ? 0 : $product / abs($product);
        $score = $sign * (abs($value1) + abs($value2))/2;

        return $score;
    }

    //usort($your_data, "cmp");
}
