/**
 * Created by djnenadovic on 5.1.2017..
 */

angular.module("SpajalicaFrontEnd", [])
    .controller("ProfileController", function($scope, $http) {
        // $scope.prva_prom = 32;
        // $scope.druga_prom = 64;

        $scope.postdata = function (prviBroj, drugiBroj) {
            var data = {
                drugi: drugiBroj,
                prvi: prviBroj
            };
            $http.post('http://localhost:8000/Profile',
                        JSON.stringify(data)).then(
               function (response) {
                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
            }, function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
            });
        };
});
