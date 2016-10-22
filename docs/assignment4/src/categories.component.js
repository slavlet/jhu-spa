(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categoriesList', {
            templateUrl: 'src/templates/categories-list.html',
            bindings: {
                items: '<'
            }
        });

})();
