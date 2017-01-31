/**
 * Created by djnenadovic on 31.1.2017..
 */

angular.module("SpajalicaFrontEnd").directive('fdInput', [function () {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;

                var reader = new FileReader();
                // reader.onload = function(e) {
                //     // handle onload
                // };

                var reader = new FileReader();
                reader.readAsDataURL(files[0]);

                console.log(files[0].name);
                console.log(files[0].size);
                console.log(evt);
                console.log(reader.result);
            });
        }
    }
}]);