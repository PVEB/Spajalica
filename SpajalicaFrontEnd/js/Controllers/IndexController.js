/**
 * Created by djnenadovic on 5.1.2017..
 */

angular.module("SpajalicaFrontEnd", [])
    .service('SharedData', function SharedData(){

        var userData;

        return userData;
    })
    .controller("ProfileController", function ($scope, $http, $window) {

        var data = {
            "userName": $window.sessionStorage.device
        };

        var userInfo = [];

        console.log("Ucitano: " + data.userName)

        $http.post('http://localhost:8000/ShowProfile', data).then(
            function (response) {
                if (response.data)
                {
                    $scope.msg = "Post Data Submitted Successfully!";
                    console.log(response.data);
                }

                $scope.firstName = response.data.firstName == null ? "Унесите име. " : response.data.firstName;
                $scope.lastName = response.data.lastName == null ? "Унесите презиме. " : response.data.lastName;

                userInfo.push(response.data.firstName == null ? null : "Име: " + response.data.firstName);
                userInfo.push(response.data.lastName == null ? null : "Презиме: " + response.data.lastName);
                userInfo.push(response.data.birthDate == null ? null : "Датум рођења: " + response.data.birthDate);
                userInfo.push(response.data.joinedDate == null ? null : "Датум приступа: " + response.data.joinedDate);
                userInfo.push(response.data.sex == null ? null : "Пол: " + response.data.sex);
                userInfo.push(response.data.location == null ? null : "Место: " + response.data.location);
                userInfo.push(response.data.relationshipStatus == null ? null : "Статус везе: " + response.data.relationshipStatus);

                $scope.responseObject = userInfo;

            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });

        $scope.nickname = $window.sessionStorage.device;
    })
    .controller("TitleController", function ($scope, $window) {
        $scope.nickname = $window.sessionStorage.device;
    })
    .controller("SettingsController", function ($scope, $window, $http) {

        var data = {
            "userName": $window.sessionStorage.device
        };

        var userInfo = [];

        $scope.savedData = {
            selected:{},
            userName: $window.sessionStorage.device
        };

        $http.post('http://localhost:8000/ShowProfile', data).then(
            function (response) {
                if (response.data)
                {
                    $scope.msg = "Post Data Submitted Successfully!";
                    console.log(response.data);

                    userInfo.push({label: "Име: ", value: response.data.firstName,
                        name: "firstName", hoverMessage: "До 45 карактера"});
                    userInfo.push({label: "Презиме: ", value: response.data.lastName,
                        name: "lastName", hoverMessage: "До 45 карактера"});
                    userInfo.push({label: "Датум рођења: ", value: response.data.birthDate,
                        name: "birthDate", hoverMessage: "ГГГГ-ММ-ДД"});
                    userInfo.push({label: "Пол: ", value: response.data.sex,
                        name: "sex", hoverMessage: "Један карактер: М, Z"});
                    userInfo.push({label: "Место: ", value: response.data.location,
                        name: "location", hoverMessage: "До 45 карактера"});
                    userInfo.push({label: "Статус везе: ", value: response.data.relationshipStatus,
                        name: "relationshipStatus", hoverMessage: "До 45 карактера"});

                    $scope.responseObject = userInfo;
                }
                else
                {
                    console.log("No valid response returned");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });

        $scope.saveData = function () {
            console.log($scope.savedData);

            $http.post('http://localhost:8000/UpdateProfile', $scope.savedData).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully sent data");
                        console.log(response.data);
                        $window.location.reload();
                    }
                    else
                    {
                        console.log("User not found");
                        $scope.settingsInputStyle = {'border': '3px solid red'};
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");

                    $scope.settingsInputStyle = {'border': '3px solid red'};
                });
        };

        var refresh = function () {
            var data = {
                userName: $window.sessionStorage.device
            };

            $http.post('http://localhost:8000/GetUserTags', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get useTags");
                        console.log(response.data);
                        $scope.userTags = angular.copy(response.data);
                    }
                    else
                    {
                        console.log("Not found userTags");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };

        refresh();

        $scope.saveTag = function (tag) {
            var data = {
                userName: $window.sessionStorage.device,
                userTag: tag
            };

            $http.post('http://localhost:8000/InsertUserTag', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully inserted userTags");
                        console.log(response.data);
                        refresh();
                    }
                    else
                    {
                        console.log("Couldn't insert userTags");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };

        $scope.savePrefTag = function (prefTag, value) {
            var data = {
                userName: $window.sessionStorage.device,
                userTag: prefTag,
                value: value
            };

            $http.post('http://localhost:8000/InsertPrefTag', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully inserted userTags");
                        console.log(response.data);
                        refreshPref();
                    }
                    else
                    {
                        console.log("Couldn't insert userTags");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });

            $scope.delPrefTag = function (name, value) {
                console.log("reaguje");
                console.log(name+'|'+value);
            };
        };

        var refreshPref = function () {
            var data = {
                userName: $window.sessionStorage.device
            };

            $http.post('http://localhost:8000/GetPrefTags', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get useTags");
                        console.log(response.data);
                        $scope.userPrefTags = angular.copy(response.data);
                    }
                    else
                    {
                        console.log("Not found userTags");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };

        refreshPref();
    })
    .controller("LogoutController", function ($scope, $window) {
        $scope.LogOut = function () {
            $window.sessionStorage.device = null;
            $window.location.href = './Login.html';
        };
    })
    .controller("MessagesController", function ($scope, $window, $http) {

        $http.post('http://localhost:8000/GetUsers',
                    {userName: $window.sessionStorage.device}).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully retrieved users");
                    console.log(response.data);
                    $scope.userNames = angular.copy(response.data);
                }
                else
                {
                    console.log("Users not retrieved");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
        
        $scope.submitOnEnter = function (receiver, message) {
            var getMessagesData = {
                sender: $window.sessionStorage.device,
                receiver: receiver
            };

            console.log(getMessagesData.receiver+"|"+getMessagesData.sender);

            $http.post('http://localhost:8000/GetMessages', getMessagesData).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully retrieved messages");
                        console.log(response.data);
                        $scope.messageArray = angular.copy(response.data);
                        $scope.message = "";
                    }
                    else
                    {
                        console.log("Message not retrieved");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };

        $scope.sendMessage = function (receiver, message) {

            if(angular.isUndefined(receiver) || angular.isUndefined(message))
                return;

            var data = {
                sender: $window.sessionStorage.device,
                receiver: receiver,
                message: message
            };

            $http.post('http://localhost:8000/SendMessage', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully sent message");
                        $scope.message = "";
                    }
                    else
                    {
                        console.log("Message not sent");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        }
    })
    .controller("SearchController", function ($scope, $window, $http) {
        var refresh = function () {
            var data = {
                userName: $window.sessionStorage.device
            };

            $http.post('http://localhost:8000/GetFollowListUsers', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the list of users to follow or block");
                        $scope.userNames = response.data;
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
    })
    .controller("NewsController", function ($scope, $window, $http) {
        var refresh = function () {
            var data = {
                userName: $window.sessionStorage.device
            };

            $http.post('http://localhost:8000/GetStatusUpdates', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully get the status updates");
                        console.log(response.data);
                        $scope.userNews = angular.copy(response.data);
                    }
                    else
                    {
                        console.log("Couldn't get the status updates");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };

        $scope.refresh = refresh;
        refresh();
        
        $scope.sendStatus = function (status) {
            var data = {
                userName: $window.sessionStorage.device,
                statusMessage: status
            };

            $http.post('http://localhost:8000/WriteStatus', data).then(
                function (response) {
                    if (response.data)
                    {
                        console.log("Successfully set status update");
                        console.log(response.data);
                        refresh();
                        $scope.status = "";
                    }
                    else
                    {
                        console.log("Couldn't set status update");
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        }
    });
