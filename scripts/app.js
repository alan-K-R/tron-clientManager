(function () {
    'use strict';
    var _templateBase = './scripts';

    var app = angular.module('tronManager', [
        'services',
        'controllers',
        'directives',
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
