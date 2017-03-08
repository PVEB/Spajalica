<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use HttpResponse;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];
}

class AuthenticateController extends Controller
{
    private $user;
    private $header;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->header = array('alg' => 'HS256', 'typ' => 'JWT');
    }

    public function register()
    {

    }

    public function login(LoginRequest $request)
    {
        $credentials = Input::all('email', 'userName');
        $existingUser = UserLoginController::VerifyUser($credentials);

        //TODO: authenticate JWT
    }

    public function authenticate(Request $request)
    {
        $credentials = Input::all('email', 'userName');
        $result = UserLoginController::VerifyUser($credentials);

        if (count($result) == 1)
        {
            return json_encode($result);
        }
        else
        {
            return Response::json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }
    }
}
