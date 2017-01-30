/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("MessagesController", function ($scope, $window, $http) {

    $scope.MessagesPageUrl = 'pages/MessagesPage.html';
    var getMessagesData = null;

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

    $scope.getMessages = function (receiver) {
        getMessagesData = {
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
    };

    var refresh = function () {
        if(getMessagesData != null)
            $scope.getMessages(getMessagesData.receiver);
    };

    setInterval(function(){
        refresh();
    }, 5000);
});