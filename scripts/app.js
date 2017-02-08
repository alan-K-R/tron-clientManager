(function () {
    'use strict';
    var _templateBase = './scripts';

    var app = angular.module('tron-clientManager', [
        'angularUtils.directives.dirPagination',
        'services',
        'controllers',
        'ngRoute',
        'md.data.table',
        'ngMdIcons'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/views/client.html' ,
                controller: 'clientCtrl'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
})();
