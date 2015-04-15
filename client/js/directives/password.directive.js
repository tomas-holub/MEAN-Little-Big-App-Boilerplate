define(['./_module'], function(directives){
    directives.directive('passwordConfirmation',  function() {
        return {
            require: "ngModel",
            scope: {
                password_repeat: "=passwordConfirmation"
            },
            link: function(scope, element, attributes, controller) {
                controller.$validators.compare = function(modelValue) {
                    if (!modelValue && !scope.password_repeat) {
                        return true;
                    }
                    return modelValue == scope.password_repeat;
                };

                scope.$watch("otherModelValue", function() {
                    controller.$validate();
                });
            }
        };
    });
});