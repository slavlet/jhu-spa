(function () {
    'use strict';

    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('menuItems', {
                url: '/menu-items/{shortName}',
                templateUrl: 'src/templates/menu-items.html',
                controller: 'MenuItemsController as menuItems',
                resolve: {
                    itemsForCategory: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.shortName);
                    }]
                }
            });
    }

})();