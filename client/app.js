var angular = require('angular')

var app = angular.module('app', [])

app.controller("cityGovCtrl", function() {

    this.yearlyBudget = {
        total: 120,
        monthsData: (function() {
            var arr = []
            for(var i=0; i < 12; ++i) {
                arr.push(10)
            }
            return arr
        }())
    }

    this.flatTax = 5

    this.check = function() {
        console.log("flat tax: " + this.flatTax)
        // console.log("yearly budget: " + this.yearlyBudget+)
    }

})

app.directive("cashFormat", function() {
    return {
        restrict: "A",
        require: "ngModel",
        // priority 0 (default)
        link: function($scope, elem, attrs, ngModelCtrl) {

            ngModelCtrl.$formatters.push(function(modelValue) {
                return "$" + modelValue
            })

            ngModelCtrl.$render = function() {
                elem.val(ngModelCtrl.$viewValue)
            }

            ngModelCtrl.$parsers.push(function(viewValue) {

                var bareNum = parseInt(viewValue.replace(/[^0-9]/g, ""))

                var newViewValue = "$" + bareNum
                elem.val(newViewValue)

                return bareNum
            })

        }
    }
})

app.directive("yearProcessor", function() {
    return {
        restrict: "A",
        require: "ngModel",
        // priority 0 (default)
        link: function($scope, elem, attrs, ngModelCtrl) {

            ngModelCtrl.$formatters.push(function(modelValue) {
                return "$" + modelValue.total
            })

            ngModelCtrl.$render = function() {
                elem.val(ngModelCtrl.$viewValue)
            }

            ngModelCtrl.$parsers.push(function(viewValue) {

                var bareNum = parseInt(viewValue.replace(/[^0-9]/g, ""))

                var newViewValue = "$" + bareNum
                elem.val(newViewValue)

                var newMonthsData = []
                var monthlyAmount = bareNum / 12
                for(var i=0; i < 12; ++i) {
                    newMonthsData.push(monthlyAmount)
                }

                return {
                    total: bareNum,
                    monthsData: newMonthsData
                }
            })

        }
    }
})
