(function () {
    "use strict";

    angular
        .module('common')
        .constant('MY_INFO', 'myinfo')
        .service('RegisterService', RegisterService);


    RegisterService.$inject = ['MY_INFO'];

    function RegisterService(MY_INFO) {
        var service = this;

        service.getMyInfo = function() {
            var myInfo;
            try {
                myInfo = JSON.parse(localStorage.getItem(MY_INFO));
            } catch (e) {
            }
            return myInfo;
        };

        service.createMyInfo = function(myInfo) {
            localStorage.setItem(MY_INFO, JSON.stringify(myInfo));
        };

        service.removeMyInfo = function() {
            localStorage.removeItem(MY_INFO);
        };
    }

})();
