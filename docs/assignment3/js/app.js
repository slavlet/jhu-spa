(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .service('MenuSearchService', MenuSearchService)
        .controller('NarrowItDownController', NarrowItDownController)
        .directive('foundItems', FoundItemsDirective)
        .filter("asHtml",  AsHtmlFilter);


    AsHtmlFilter.$inject = ['$sce'];

    function AsHtmlFilter($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.searchTerm = "";

        ctrl.search = function() {
            ctrl.found = undefined;
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (foundItems) {
                    ctrl.found = markSearchTerm(foundItems, ctrl.searchTerm)
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        ctrl.removeItem = function(itemIndex) {
            ctrl.found.splice(itemIndex, 1);
        };

        function markSearchTerm(items, searchTerm) {
            var searchValue = new RegExp(searchTerm, 'gi');
            var replacement = '<mark>' + searchTerm.toLowerCase() + '</mark>';
            return items.map(function(item) {
                item.description = item.description.replace(searchValue, replacement);
                return item;
            });
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({url: (ApiBasePath + "/menu_items.json")}).then(function (response) {
                var foundItems = [];
                var data = response.data;
                if (searchTerm && data && typeof(data.menu_items) === typeof([])) {
                    var term = searchTerm.toLowerCase();
                    foundItems = data.menu_items.filter(function(item) {
                        return typeof(item.description) === typeof("")
                            && item.description.toLowerCase().indexOf(term) >= 0;
                    });
                }
                return foundItems;
            });
        }
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'templates/foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var ctrl = this;

        ctrl.nothingFound = function() {
            return ctrl.items && ctrl.items.length == 0;
        }
    }

})();