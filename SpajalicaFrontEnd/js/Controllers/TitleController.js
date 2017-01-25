/**
 * Created by djnenadovic on 15.1.2017..
 */

angular.module('SpajalicaFrontEnd').controller('TitleController', function ($scope, $window) {
    $scope.nickname = $window.sessionStorage.device;
});