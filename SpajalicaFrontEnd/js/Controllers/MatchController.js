/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("MatchController", function ($scope, $window, $http) {
    $scope.refresh = function () {
        var data = {
            userName: $window.sessionStorage.device
        };

        $http.post('http://localhost:8000/GetListOfPeople', data).then(
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
            userName: $window.sessionStorage.device,
            userFollowed: userName
        };

        $http.post('http://localhost:8000/FollowUser', data).then(
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
            userName: $window.sessionStorage.device,
            userBlocked: userName
        };

        $http.post('http://localhost:8000/BlockUser', data).then(
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