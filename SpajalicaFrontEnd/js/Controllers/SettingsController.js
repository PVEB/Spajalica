/**
 * Created by djnenadovic on 15.1.2017..
 */

angular.module('SpajalicaFrontEnd').controller('SettingsController', function ($scope, $window, $http) {

    $scope.SettingsPageUrl = 'pages/SettingsPage.html';

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
                    console.log("Successfully get userTags");
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
                    console.log("Successfully get userTags");
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
});