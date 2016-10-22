(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return doGet(ApiBasePath + "/categories.json");
        };

        service.getItemsForCategory = function (categoryShortName) {
            return doGet(ApiBasePath + "/menu_items.json?category=" + categoryShortName.toUpperCase());
        };

        function doGet(url) {
            return $http({url: url})
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

})();