(function() {
    "use strict";

    angular.module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);

    LunchCheckController.$inject = ["$scope"];

    function LunchCheckController($scope) {
        $scope.userInput = "";

        $scope.message = {
            text: "",
            color: ""
        };

        $scope.moreInfo = "hide";

        $scope.onInputChanged = function() {
            $scope.message.text = "";
            $scope.message.color = ""
        };

        function notEmptyString(str) {
            return str && str.trim()
        }

        function toArrayOfDishes(csv) {
            return csv ? csv.split(/\s*,\s*/).filter(notEmptyString) : [];
        }

        $scope.checkIfTooMuch = function() {
            var dishes = toArrayOfDishes($scope.userInput);
            if (dishes.length > 3) {
                $scope.message.text = "Too much!";
            } else if (dishes.length > 0) {
                $scope.message.text = "Enjoy!";
            } else {
                $scope.message.text = "Please enter data first";
            }
            $scope.message.color = dishes.length < 1 ? "red" : "green";
        };

        $scope.toggleMoreInfo = function() {
            $scope.moreInfo = $scope.moreInfo == "hide" ? "show": "hide"
        }
    }
})();