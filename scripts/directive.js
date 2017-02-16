// Code goes here
angular.module('directives', ['ngMaterial'])
    .directive('openImageDialog', ['$mdDialog', function($mdDialog) {

        return {

            template: '<label ng-click="imageDialog()" client="client">Receipt Of Payment</label>',
            scope: {
              client: '='
            },
            link: function(scope) {
                scope.imageDialog = function() {

                    $mdDialog.show({
                        templateUrl: 'scripts/views/image.tmpl.html',
                        parent: angular.element(document.body),
                        scope: scope,
                        clickOutsideToClose :true,
                        preserveScope: true,
                        controller: function($scope, $mdDialog, scope) {

                            $scope.hide = function() {
                                $mdDialog.hide();
                            };

                            $scope.closeDialog = function(){
                                $mdDialog.hide();
                            }

                            $scope.cancel = function() {

                                $mdDialog.cancel();

                            };

                            $scope.answer = function(answer) {
                                console.log($mdDialog.hide('answer'));
                                $mdDialog.hide(answer);

                            };
                        }

                    })
                };

            }

        };
    }]);
