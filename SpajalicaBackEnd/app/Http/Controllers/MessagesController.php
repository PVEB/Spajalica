<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class messageResponse
{
    public $sent;
    public $received;
}

class MessagesController extends Controller
{
    public function Send()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $senderInfo = DB::select('select * from loginInfo where userName = ?', [$res->sender]);
        $receiverInfo = DB::select('select * from loginInfo where userName = ?', [$res->receiver]);
        $senderId = $senderInfo[0]->idloginInfo;
        $receiverId = $receiverInfo[0]->idloginInfo;

        DB::insert('insert into messages (idloginInfoSender, idloginInfoReceiver, messageText, messageTime) values (?, ?, ?, NOW())',
            [$senderId, $receiverId, $res->message]);

        return 200;
    }

    public function GetMessages()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $senderInfo = DB::select('select * from loginInfo where userName = ?', [$res->sender]);
        $receiverInfo = DB::select('select * from loginInfo where userName = ?', [$res->receiver]);
        $senderId = $senderInfo[0]->idloginInfo;
        $receiverId = $receiverInfo[0]->idloginInfo;

        $messages = DB::select('select * from messages where idloginInfoSender = ? and idloginInfoReceiver = ?'.
                               ' or idloginInfoSender = ? and idloginInfoReceiver = ? order by messageTime',
            [$senderId, $receiverId, $receiverId, $senderId]);


        $response = [];

        foreach ($messages as &$message) {
            if($senderId == $message->idloginInfoSender && $receiverId == $message->idloginInfoReceiver)
            {
                $responseObj = new messageResponse();
                $responseObj->sent = $message;
                $responseObj->received = null;
                array_push($response, $responseObj);
            }
            else if ($senderId == $message->idloginInfoReceiver && $receiverId == $message->idloginInfoSender)
            {
                $responseObj = new messageResponse();
                $responseObj->sent = null;
                $responseObj->received = $message;
                array_push($response, $responseObj);
            }
        }

        return json_encode($response);
    }

    public function GetUsers()
    {
        $data = Input::all();
        $res = json_decode(json_encode($data));

        $senderInfo = DB::select('select * from loginInfo where userName = ?', [$res->userName]);
        $senderId = $senderInfo[0]->idloginInfo;

        $usersInfo = DB::select('select li.userName from loginInfo li '.
                                'where userName <> ? '.
                                'and exists (select * from userFollows uf '.
                                'where uf.idloginInfo = li.idloginInfo and uf.idFollowed = ? '.
                                'or uf.idloginInfo = ? and uf.idFollowed = li.idloginInfo) '.
                                'and not exists (select * from userBlocks ub '.
                                'where ub.idloginInfo = li.idloginInfo and ub.idBlocked = ?) '.
                                'and not exists (select * from userBlocks ub '.
                                'where ub.idloginInfo = ? and ub.idBlocked = li.idloginInfo) ',
                                [$res->userName, $senderId, $senderId, $senderId, $senderId]);

        return json_encode($usersInfo);
    }
}
