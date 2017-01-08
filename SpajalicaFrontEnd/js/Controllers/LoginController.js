/**
 * Created by nevidjen on 8.1.2017..
 */

angular.module("SpajalicaFrontEnd", [])
    .controller("LoginController", function($scope, $http) {
        $scope.login = function (userName, password) {
            var data = {
                userName: userName,
                password: password
            };

            $http.post('http://localhost:8000/LoginVerify', data).then(
                function (response) {
                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
                    $scope.prom1 = response.data.prvi;
                    $scope.prom2 = response.data.drugi;
                }, function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                });
        }
    });