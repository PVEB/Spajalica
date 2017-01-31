/**
 * Created by nevidjen on 8.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("LoginController", function ($scope, $http, $window, Constants, Constants) {
    $scope.login = function (userName, password) {
        var data = {
            userName: userName,
            password: password
        };

        console.log(userName + "|" + password);

        $http.post(Constants.urlBE + 'LoginVerify', data).then(
            function (response) {
                if (response.data != 0)
                {
                    console.log("I did something");
                    $window.sessionStorage.device = userName;
                    $window.location.href = Constants.IndexPage;
                }
                else
                {
                    console.log("User not found");
                    $scope.errorStyle = {'border': '1px solid red'};
                }
            }, function (response) {
                console.log("Failed request");
                $scope.errorStyle = {'border': '1px solid red'};
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
            $scope.errorStyle = {'border': '1px solid red'};
            return;
        }

        console.log(userNameReg + "|" + passReg + "|" + emailReg);

        $http.post(Constants.urlBE + 'LoginRegister', data).then(
            function (response) {
                if (response.data == 200)
                {
                    console.log("I did something");
                    $window.sessionStorage.device = userNameReg;
                    $window.location.href = Constants.IndexPage;
                }
                else
                {
                    console.log("User not found");
                    $scope.errorStyle = {'border': '1px solid red'};
                }
            }, function (response) {
                console.log("Failed request" + response.status);
                $scope.errorStyle = {'border': '1px solid red'};
            });
    };
});