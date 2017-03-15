/**
 * Created by djnenadovic on 9.1.2017..
 */

angular.module("SpajalicaFrontEnd").service('SharedData', function SharedData(){
    this.userPicture = null;
    this.pictureErrorCode = false;
});

//check token before loading index.html - just for functionality reasons
angular.module("SpajalicaFrontEnd").run(function($rootScope, $window, $http, Constants)
{
    var data = {
        token: $window.sessionStorage.device
    };

    console.log("Checking is running!");

    $http.post(Constants.urlBE + 'verify/validateToken', data).then(
        function (response) {
            if (response.data)
            {
                console.log("Successfully validated token");
                console.log(response.data);

                if(($window.sessionStorage.device == null) ||
                    angular.isUndefined($window.sessionStorage.device) ||
                    $window.sessionStorage.device == 'null' ||
                    $window.sessionStorage.device == '' ||
                    response.status != 200)
                {
                    $window.alert('You do not have valid token. Forgot to log in?');
                    $window.location.href = Constants.LoginPage;
                }
            }
            else
            {
                console.log("Token not validated");
                $window.alert('You do not have valid token. Forgot to log in?');
                $window.location.href = Constants.LoginPage;
            }
        }, function (response) {
            console.log("Token not validated: " +
                response.status + "|" +
                response.statusText + "|");

            $window.alert('You do not have valid token. Forgot to log in?');
            $window.location.href = Constants.LoginPage;
        });
});
