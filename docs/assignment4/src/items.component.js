(function () {
    'use strict';

    angular.module('MenuApp')
        .component('menuItemsList', {
            templateUrl: 'src/templates/menu-items-list.html',
            bindings: {
                items: '<'
            }
        });

})();