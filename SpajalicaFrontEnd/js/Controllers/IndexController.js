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
                }

                userInfo.push({label: "Име: ", value: response.data.firstName, name: "firstName"});
                userInfo.push({label: "Презиме: ", value: response.data.lastName, name: "lastName"});
                userInfo.push({label: "Датум рођења: ", value: response.data.birthDate, name: "birthDate"});
                userInfo.push({label: "Пол: ", value: response.data.sex, name: "sex"});
                userInfo.push({label: "Место: ", value: response.data.location, name: "location"});
                userInfo.push({label: "Статус везе: ", value: response.data.relationshipStatus, name: "relationshipStatus"});

                $scope.responseObject = userInfo;

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
                    }
                }, function (response) {
                    console.log("Service not Exists: " +
                        response.status + "|" +
                        response.statusText + "|");
                });
        };
    });
