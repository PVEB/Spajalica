/**
 * Created by djnenadovic on 31.1.2017..
 */

angular.module("SpajalicaFrontEnd").directive('fdInput', function (SharedData) {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;

                var reader = new FileReader();

                reader.readAsDataURL(files[0]);

                reader.onload = function () {
                    SharedData.userPicture = reader.result;
                };

                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            });
        }
    }
});