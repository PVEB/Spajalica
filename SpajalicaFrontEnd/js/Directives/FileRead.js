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
                    if(files[0].size < 1000000)
                        SharedData.userPicture = reader.result;
                    else
                        SharedData.pictureErrorCode = true;
                };

                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            });
        }
    }
});