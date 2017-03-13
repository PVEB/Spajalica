/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module("SpajalicaFrontEnd").controller("NewsController", function ($scope, $window, $http, Constants) {

    $scope.NewsPageUrl = Constants.NewsPageUrl;

    var refresh = function () {
        var data = {
            token: $window.sessionStorage.device
        };

        $http.post(Constants.urlBE + 'GetStatusUpdates', data).then(
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

    $scope.sendStatus = function (status) {
        var data = {
            token: $window.sessionStorage.device,
            statusMessage: status
        };

        $http.post(Constants.urlBE + 'WriteStatus', data).then(
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
    };

    // setInterval(function(){
    //     refresh();
    // }, 10000);
});
