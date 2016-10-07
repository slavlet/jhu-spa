(function() {
    "use strict";

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.markAsBought = function(itemIndex) {
            ShoppingListCheckOffService.markAsBought(itemIndex);
        };
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }


    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {name: "Chocolate Cookies", quantity: 10},
            {name: "Peanut Butter Cookies", quantity: 5},
            {name: "Snickerdoodles", quantity: 10},
            {name: "Sugar Cookies", quantity: 2},
            {name: "Ginger Cookies", quantity: 3},
            {name: "Macaroons", quantity: 5}
        ];

        var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems
        };

        service.getAlreadyBoughtItems = function() {
            return boughtItems
        };

        service.markAsBought = function(itemIndex) {
            boughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);
        };
    }

})();