(function () {
    'use strict';

    var app = angular.module('controllers', ['ngAnimate', 'ngAria', 'ngMaterial']);
    app.controller('clientCtrl', function ($scope, clientService, $mdDialog) {

        $scope.datas = [];
        $scope.button = 'Save';
        showData();
        function showData() {
            clientService.select().then(function (response) {
                $scope.datas = [].concat(response);
            });
        }
        function clear() {
            showData();
            $scope.button = 'Save';
            $scope.client = '';
            $scope.search = '';
        };
        // $scope.refresh = function () {
        //     clear();
        // };
        $scope.create = function (ev){
          $mdDialog.show({
            controller : DialogController,
             templateUrl : 'scripts/views/clientFrm.html',
             parent: angular.element(document.body),
             clickOutsideToClose :true,
             // You can specify either sting with query selector
             // or an element
         });
       };

        $scope.save = function () {
            if ($scope.button === 'Save') {
                clientService.insert($scope.client).then(function (response) {
                    $scope.client = response.data;
                    alert('Saving client Success...');
                    clear();
                }, function (error) {
                    console.log('Error' + error);
                });
            } else {
                clientService.update($scope.client).then(function (response) {
                    $scope.client = response.data;
                    alert('Update client Success...');
                    clear();
                }, function (error) {
                    console.log('Error' + error);
                });
            }
        };

        $scope.remove = function (id) {
            var r = confirm("Are you sure delete this client ? ");
            if (r === true) {
                clientService.delete(id);
                clear();
            } else {
                clear();
            }

        };
        $scope.click = function (data) {
            $scope.client = data;
            $scope.button = 'Update';
            $scope.search = '';
        };

    });

      function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
})();
