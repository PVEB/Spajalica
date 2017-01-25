/**
 * Created by djnenadovic on 24.1.2017..
 */

angular.module('SpajalicaFrontEnd').controller('LogoutController', function ($scope, $window) {
    $scope.LogOut = function () {
        $window.sessionStorage.device = null;
        $window.location.href = './Login.html';
    };
});