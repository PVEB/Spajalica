/**
 * Created by nevidjen on 8.1.2017..
 */

angular.module("SpajalicaFrontEnd", [])
    .controller("LoginController", function ($scope, $http, $window) {
        $scope.login = function (userName, password) {
            var data = {
                userName: userName,
                password: password
            };

            console.log(userName + "|" + password);

            $http.post('http://localhost:8000/LoginVerify', data).then(
                function (response) {
                    if (response.data != 0)
                    {
                        console.log("I did something");
                        $window.sessionStorage.device = userName;
                        $window.location.href = './index.html';
                    }
                    else
                    {
                        console.log("User not found...");
                        $scope.nameStyle = {'border': '1px solid red'};
                        $scope.passStyle = {'border': '1px solid red'};
                    }
                }, function (response) {
                    console.log("I failed...");
                    $scope.nameStyle = {'border': '1px solid red'};
                    $scope.passStyle = {'border': '1px solid red'};
                });
        };

        $scope.register = function (userNameReg, emailReg, passReg, passReg2) {
            var data = {
                userName: userNameReg,
                password: passReg,
                email: emailReg
            };

            if(passReg != passReg2) // || !emailReg.contains('@')
            {
                $scope.nameStyleReg = {'border': '1px solid red'};
                $scope.emailStyleReg = {'border': '1px solid red'};
                $scope.passStyleReg = {'border': '1px solid red'};
                $scope.passStyleReg2 = {'border': '1px solid red'};
                return;
            }

            console.log(userNameReg + "|" + passReg + "|" + emailReg);

            $http.post('http://localhost:8000/LoginRegister', data).then(
                function (response) {
                    if (response.data == 200)
                    {
                        console.log("I did something");
                        $window.sessionStorage.device.userName = userName;
                        $window.location.href = './index.html';
                    }
                    else
                    {
                        console.log("User not found...");
                        $scope.nameStyleReg = {'border': '1px solid red'};
                        $scope.emailStyleReg = {'border': '1px solid red'};
                        $scope.passStyleReg = {'border': '1px solid red'};
                        $scope.passStyleReg2 = {'border': '1px solid red'};
                    }
                }, function (response) {
                    console.log("I failed... " + response.status);
                    $scope.nameStyleReg = {'border': '1px solid red'};
                    $scope.emailStyleReg = {'border': '1px solid red'};
                    $scope.passStyleReg = {'border': '1px solid red'};
                    $scope.passStyleReg2 = {'border': '1px solid red'};
                });
        };
    });