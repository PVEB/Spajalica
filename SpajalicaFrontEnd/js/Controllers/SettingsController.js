/**
 * Created by djnenadovic on 15.1.2017..
 */

angular.module("SpajalicaFrontEnd", [])
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
    });