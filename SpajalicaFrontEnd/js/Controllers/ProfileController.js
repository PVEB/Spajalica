/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("ProfileController", function ($scope, $http, $window) {
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
});