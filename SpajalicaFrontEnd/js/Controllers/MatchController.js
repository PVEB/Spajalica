/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("MatchController", function ($scope, $window, $http, Constants, SharedData) {

    SharedData.tokenCheck();

    if(!SharedData.tokenValid)
        return;

    $scope.MatchPageUrl = Constants.MatchPageUrl;

    $scope.refresh = function () {
        var data = {
            token: $window.sessionStorage.device
        };

        $http.post(Constants.urlBE + 'GetListOfPeople', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully get the List of people");
                    console.log(response.data);
                    $scope.responseObject = angular.copy(response.data);
                }
                else
                {
                    console.log("Couldn't get the List of people");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    var refresh = $scope.refresh;

    $scope.follow = function (userName) {
        var data = {
            token: $window.sessionStorage.device,
            userFollowed: userName
        };

        $http.post(Constants.urlBE + 'FollowUser', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully followed user");
                    console.log(response.data);
                    refresh();
                }
                else
                {
                    console.log("Couldn't followed user");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    $scope.block = function (userName) {
        console.log(userName);
        var data = {
            token: $window.sessionStorage.device,
            userBlocked: userName
        };

        $http.post(Constants.urlBE + 'BlockUser', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully blocked user");
                    console.log(response.data);
                    refresh();
                }
                else
                {
                    console.log("Couldn't block user");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };
});