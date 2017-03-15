/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("SearchController", function ($scope, $window, $http, Constants, SharedData) {

    $scope.SearchPageUrl = Constants.SearchPageUrl;
    $scope.category = {
        model: null
    };
    var savedCriteria = "";

    var refresh = function () {
        var data = {
            token: $window.sessionStorage.device
        };

        $http.post(Constants.urlBE + 'GetAvailableUsers', data).then(
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
            token: $window.sessionStorage.device,
            criteria: savedCriteria
        };

        if($scope.category.model == 'Нови корисници' && savedCriteria != "")
        {
            $http.post(Constants.urlBE + 'SearchUserCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.followedUsers = null;
                        $scope.blockedUsers = null;

                        $scope.searchedUsers = angular.copy(response.data);

                        for(var i = 0; i < $scope.searchedUsers.length; i++)
                        {
                            delete $scope.searchedUsers[i].profilePicture;

                            //check if there is pic in base
                            if(response.data[i].profilePicture != "" &&
                                response.data[i].profilePicture != null)
                            {
                                $scope.searchedUsers[i].convertString = 'data:image/*;base64,';
                                $scope.searchedUsers[i].profilePicture =
                                    response.data[i].profilePicture
                                        .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                            }
                            else
                            {
                                $scope.searchedUsers[i].convertString = '';
                                $scope.searchedUsers[i].profilePicture = Constants.defaultProfilePicture;
                            }
                        }
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
            $http.post(Constants.urlBE + 'SearchFollowCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.searchedUsers = null;
                        $scope.blockedUsers = null;

                        $scope.followedUsers = angular.copy(response.data);

                        for(var i = 0; i < $scope.followedUsers.length; i++)
                        {
                            delete $scope.followedUsers[i].profilePicture;

                            //check if there is pic in base
                            if(response.data[i].profilePicture != "" &&
                                response.data[i].profilePicture != null)
                            {
                                $scope.followedUsers[i].convertString = 'data:image/*;base64,';
                                $scope.followedUsers[i].profilePicture =
                                    response.data[i].profilePicture
                                        .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                            }
                            else
                            {
                                $scope.followedUsers[i].convertString = '';
                                $scope.followedUsers[i].profilePicture = Constants.defaultProfilePicture;
                            }
                        }

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
            $http.post(Constants.urlBE + 'SearchBlockedCriteria', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of searched users");
                        console.log(response.data);
                        $scope.followedUsers = null;
                        $scope.searchedUsers = null;

                        $scope.blockedUsers = angular.copy(response.data);

                        for(var i = 0; i < $scope.blockedUsers.length; i++)
                        {
                            delete $scope.blockedUsers[i].profilePicture;

                            //check if there is pic in base
                            if(response.data[i].profilePicture != "" &&
                                response.data[i].profilePicture != null)
                            {
                                $scope.blockedUsers[i].convertString = 'data:image/*;base64,';
                                $scope.blockedUsers[i].profilePicture =
                                    response.data[i].profilePicture
                                        .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                            }
                            else
                            {
                                $scope.blockedUsers[i].convertString = '';
                                $scope.blockedUsers[i].profilePicture = Constants.defaultProfilePicture;
                            }
                        }
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
            token: $window.sessionStorage.device,
            userBlocked: userName
        };

        $http.post(Constants.urlBE + 'Unblock', data).then(
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
            token: $window.sessionStorage.device,
            userFollowed: userName
        };

        $http.post(Constants.urlBE + 'Unfollow', data).then(
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
