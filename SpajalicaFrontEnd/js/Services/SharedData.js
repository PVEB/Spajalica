/**
 * Created by djnenadovic on 9.1.2017..
 */

angular.module("SpajalicaFrontEnd").service('SharedData', function SharedData($window, Constants){
    this.userPicture = null;
    this.pictureErrorCode = false;
    this.tokenValid = true;

    this.tokenCheck = function () {
        if(($window.sessionStorage.device == null) ||
            angular.isUndefined($window.sessionStorage.device) ||
            $window.sessionStorage.device == 'null')
        {
            if(this.tokenValid)
            {
                this.tokenValid = false;
                $window.alert('You do not have valid token. Forgot to log in?');
                $window.location.href = Constants.LoginPage;
            }
        }
    };
});
