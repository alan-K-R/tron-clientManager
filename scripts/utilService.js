(function() {
  'use strict';

  var app = angular.module('services', []);

  app.service('utilService', function(){
    utilService.$inject = ['clientService'];
    $scope.datas = [];
    function showData() {
        clientService.select().then(function (response) {
            $scope.datas = [].concat(response);
        });
        return $scope.datas;
    }

  })
})
