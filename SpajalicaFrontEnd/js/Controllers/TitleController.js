/**
 * Created by djnenadovic on 15.1.2017..
 */

angular.module('SpajalicaFrontEnd').controller('TitleController', function ($scope, $window, $http, Constants, SharedData) {
    SharedData.tokenCheck();

    if(!SharedData.tokenValid)
        return;

    var data = {
      token: $window.sessionStorage.device
    };

    $http.post(Constants.urlBE + 'GetUserName', data).then(
        function (response) {
            if (response.data)
            {
                console.log("Successfully get the userName");
                console.log(response.data);
                $scope.nickname = response.data;
            }
            else
            {
                console.log("Couldn't get the userName");
            }
        }, function (response) {
            console.log("Service not Exists: " +
                response.status + "|" +
                response.statusText + "|");
        });

    //$scope.nickname = $window.sessionStorage.device;
});