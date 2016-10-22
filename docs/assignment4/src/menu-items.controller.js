(function () {
    'use strict';

    angular.module('MenuApp').controller('MenuItemsController', MenuItemsController);

    MenuItemsController.$inject = ['itemsForCategory'];

    function MenuItemsController(itemsForCategory) {
        var ctrl = this;
        if (itemsForCategory) {
            if (itemsForCategory.category) ctrl.category = itemsForCategory.category;
            if (itemsForCategory.menu_items) ctrl.items = itemsForCategory.menu_items;
        }
    }

})();