/**
 * Created by djnenadovic on 15.1.2017..
 */

angular.module('SpajalicaFrontEnd').controller('SettingsController', function ($scope, $window, $http, Constants) {

    $scope.SettingsPageUrl = Constants.SettingsPageUrl;

    var data = {
        "userName": $window.sessionStorage.device
    };

    // var userInfo = [];
    //
    // $scope.savedData = {
    //     selected:{},
    //     userName: $window.sessionStorage.device
    // };

    $scope.sendData = {
        selected:{},
        userName: $window.sessionStorage.device
    };

    var getTags = function () {
        $http.get('http://localhost:8000/GetTags').then(
            function (response) {
                if (response.data)
                {
                    console.log("All tags fetched");
                    $scope.userTagNames = angular.copy(response.data);
                }
                else
                {
                    console.log("All tags not fetched");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    $http.post('http://localhost:8000/ShowProfile', data).then(
        function (response) {
            if (response.data)
            {
                $scope.msg = "Post Data Submitted Successfully!";
                console.log(response.data);

                // userInfo.push({label: "Име: ", value: response.data.firstName,
                //     name: "firstName", hoverMessage: "До 45 карактера"});
                // userInfo.push({label: "Презиме: ", value: response.data.lastName,
                //     name: "lastName", hoverMessage: "До 45 карактера"});
                // userInfo.push({label: "Датум рођења: ", value: response.data.birthDate,
                //     name: "birthDate", hoverMessage: "ГГГГ-ММ-ДД"});
                // userInfo.push({label: "Пол: ", value: response.data.sex,
                //     name: "sex", hoverMessage: "Један карактер: М, Z"});
                // userInfo.push({label: "Место: ", value: response.data.location,
                //     name: "location", hoverMessage: "До 45 карактера"});
                // userInfo.push({label: "Статус везе: ", value: response.data.relationshipStatus,
                //     name: "relationshipStatus", hoverMessage: "До 45 карактера"});
                //
                // $scope.responseObject = userInfo;
                $scope.settingsData = angular.copy(response.data);
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
        $scope.sendData.selected.birthDate = Constants.formatDate($scope.sendData.selected.birthDate);

        $http.post(Constants.urlBE + 'UpdateProfile', $scope.sendData).then(
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

    var refreshUserTags = function () {
        var data = {
            userName: $window.sessionStorage.device
        };

        $http.post(Constants.urlBE + 'GetUserTags', data).then(
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

    $scope.saveUserTag = function (tag) {
        var data = {
            userName: $window.sessionStorage.device,
            userTag: tag
        };

        $http.post(Constants.urlBE + 'InsertUserTag', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully inserted userTags");
                    console.log(response.data);
                    refreshUserTags();
                    getTags();
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

        $http.post(Constants.urlBE + 'InsertPrefTag', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully inserted userTags");
                    console.log(response.data);
                    refreshPrefTags();
                    getTags();
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

    var refreshPrefTags = function () {
        var data = {
            userName: $window.sessionStorage.device
        };

        $http.post(Constants.urlBE + 'GetPrefTags', data).then(
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

    $scope.delPrefTag = function (name, value) {
        console.log("reaguje");
        console.log(name+'|'+value);

        var data = {
            userName: $window.sessionStorage.device,
            userPrefTagName: name,
            userPrefTagValue: value
        };

        $http.post(Constants.urlBE + 'DelPrefTag', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully deleted prefTag");
                    console.log(response.data);
                    refreshPrefTags();
                }
                else
                {
                    console.log("Couldn't delete prefTag");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    $scope.delUserTag = function (name) {
        console.log("reaguje");
        console.log(name);

        var data = {
            userName: $window.sessionStorage.device,
            userTagName: name
        };

        $http.post(Constants.urlBE + 'DelUserTag', data).then(
            function (response) {
                if (response.data)
                {
                    console.log("Successfully deleted userTag");
                    console.log(response.data);
                    refreshUserTags();
                }
                else
                {
                    console.log("Couldn't delete userTag");
                }
            }, function (response) {
                console.log("Service not Exists: " +
                    response.status + "|" +
                    response.statusText + "|");
            });
    };

    refreshUserTags();
    refreshPrefTags();
    getTags();
});