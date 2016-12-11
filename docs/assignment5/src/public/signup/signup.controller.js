(function () {
    "use strict";

    angular
        .module('public')
        .controller('SignUpController', SignUpController)
        .directive('validateShortNameDish', ShortNameDishValidator)
    ;

    SignUpController.$inject = ['myInfo', 'menuItems', 'RegisterService'];

    function SignUpController(myInfo, menuItems, RegisterService) {
        var $ctrl = this;

        $ctrl.myinfo = myInfo;

        $ctrl.menuItems = menuItems.reduce(function(res, item) {
            res[item.short_name] = item.id;
            return res;
        }, {});

        $ctrl.signUp = function() {
            RegisterService.createMyInfo({
                firstName: $ctrl.firstName,
                lastName: $ctrl.lastName,
                email: $ctrl.email,
                phone: $ctrl.phone,
                favoriteDish: $ctrl.menuItems[$ctrl.favoriteDish.toUpperCase()]
            });
            $ctrl.completed = true;
        };

        $ctrl.signOff = function() {
            RegisterService.removeMyInfo();
            $ctrl.myinfo = RegisterService.getMyInfo();
        };
    }

    ShortNameDishValidator.$inject = [];

    function ShortNameDishValidator() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function(value) {
                    var valid = value && value.toUpperCase() in scope.$parent.signUpCtrl.menuItems;
                    ctrl.$setValidity('invalidShortNameDish', valid);
                    return valid ? value : undefined;
                });
            }
        }
    }
})();
