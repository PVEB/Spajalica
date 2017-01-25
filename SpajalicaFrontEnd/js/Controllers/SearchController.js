/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("SearchController", function ($scope, $window, $http) {
    var refresh = function () {
        var data = {
            userName: $window.sessionStorage.device
        };

        $http.post('http://localhost:8000/GetFollowListUsers', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully get the list of users to follow or block");
                    $scope.userNames = angular.copy(response.data);
                }
                else
                {
                    console.log("Couldn't get the list of users to follow or block");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    refresh();

    $scope.search = function (criteria) {
        console.log(criteria);

        var data = {
            userName: $window.sessionStorage.device,
            criteria: criteria
        };

        $http.post('http://localhost:8000/SearchUserCriteria', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully get the list of searched users");
                    console.log(response.data);
                    $scope.searchedUsers = angular.copy(response.data);
                }
                else
                {
                    console.log("Couldn't get the list of users to follow or block");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

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
                    $scope.search($scope.criteria);
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
                    $scope.search($scope.criteria);
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
