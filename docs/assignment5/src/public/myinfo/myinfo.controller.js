(function () {
    "use strict";

    angular
        .module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['myInfo', 'favoriteDish'];

    function MyInfoController(myInfo, favoriteDish) {
        var $ctrl = this;
        $ctrl.myinfo = myInfo;
        $ctrl.favoriteDish = favoriteDish;
        if ($ctrl.favoriteDish) {
            $ctrl.category = $ctrl.favoriteDish.short_name.replace(/[0-9]/g, '');
        }
    }

})();
