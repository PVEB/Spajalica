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
                        name: "firstName", hoverMessage: "Ниска до 45 карактера"});
                    userInfo.push({label: "Презиме: ", value: response.data.lastName,
                        name: "lastName", hoverMessage: "Ниска до 45 карактера"});
                    userInfo.push({label: "Датум рођења: ", value: response.data.birthDate,
                        name: "birthDate", hoverMessage: "Само уноси у датом формату су исправни"});
                    userInfo.push({label: "Пол: ", value: response.data.sex,
                        name: "sex", hoverMessage: "Један карактер: М, Z"});
                    userInfo.push({label: "Место: ", value: response.data.location,
                        name: "location", hoverMessage: "Ниска до 45 карактера"});
                    userInfo.push({label: "Статус везе: ", value: response.data.relationshipStatus,
                        name: "relationshipStatus", hoverMessage: "Ниска до 45 карактера"});

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
    .controller("MessagesController", function ($scope, $window, $http) {

    });
