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
    // domain-friendly formatted data

    this.flatTax = 5

    this.check = function() {
        console.log("flat tax: " + this.flatTax)
        console.log("yearly budget - month 1: " + this.yearlyBudget.monthsData[0])
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
                if( newViewValue !== viewValue ) {
                    ngModelCtrl.$setViewValue(
                        newViewValue
                    )
                    ngModelCtrl.$render()
                }

                return bareNum
            })

        }
    }
})

app.directive("yearProcessor", function() {
    return {
        restrict: "A",
        require: "ngModel",
        priority: 1,

        // compile and pre-link functions are called in priority order

        // called in reverse priority order..
        link: function($scope, elem, attrs, ngModelCtrl) {

            ngModelCtrl.$formatters.push(function(modelValue) {
                return modelValue.total
            })

            ngModelCtrl.$render = function() {
                elem.val(ngModelCtrl.$viewValue)
            }

            ngModelCtrl.$parsers.push(function(viewValue) {

                var newMonthsData = []
                var monthlyAmount = viewValue / 12
                for(var i=0; i < 12; ++i) {
                    newMonthsData.push(monthlyAmount)
                }

                return {
                    total: viewValue,
                    monthsData: newMonthsData
                }
            })

        }
    }
})
