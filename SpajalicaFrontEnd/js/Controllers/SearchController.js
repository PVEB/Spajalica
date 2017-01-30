/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("SearchController", function ($scope, $window, $http) {

    $scope.SearchPageUrl = 'pages/SearchPage.html';
    $scope.category = {
        model: null
    };
    var savedCriteria = "";

    var refresh = function () {
        var data = {
            userName: $window.sessionStorage.device
        };

        $http.post('http://localhost:8000/GetAvailableUsers', data).then(
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

    $scope.search = function (criteria) {

        if(criteria != null || criteria != undefined)
            savedCriteria = criteria;

        $scope.criteriaStyle = {};

        var data = {
            userName: $window.sessionStorage.device,
            criteria: savedCriteria
        };

        if($scope.category.model == 'Нови корисници' && savedCriteria != "")
        {
            $http.post('http://localhost:8000/SearchUserCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.followedUsers = null;
                        $scope.blockedUsers = null;
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
        }
        else
        if($scope.category.model == 'Запраћени')
        {
            $http.post('http://localhost:8000/SearchFollowCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.searchedUsers = null;
                        $scope.blockedUsers = null;
                        $scope.followedUsers = angular.copy(response.data);
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
        }
        else
        if($scope.category.model == 'Блокирани')
        {
            $http.post('http://localhost:8000/SearchBlockedCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.followedUsers = null;
                        $scope.searchedUsers = null;
                        $scope.blockedUsers = angular.copy(response.data);
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
        }
        else
        {
            $scope.criteriaStyle = {'border': '1px solid red'};
        }
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

    $scope.unblock = function (userName) {
        var data = {
            userName: $window.sessionStorage.device,
            userBlocked: userName
        };

        $http.post('http://localhost:8000/Unblock', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully unblocked user");
                    console.log(response.data);
                    refresh();
                    $scope.search($scope.criteria);
                }
                else
                {
                    console.log("Couldn't unblock user");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    $scope.unfollow = function (userName) {
        var data = {
            userName: $window.sessionStorage.device,
            userFollowed: userName
        };

        $http.post('http://localhost:8000/Unfollow', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully unfollowed user");
                    console.log(response.data);
                    refresh();
                    $scope.search($scope.criteria);
                }
                else
                {
                    console.log("Couldn't unfollow user");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    refresh();
});
