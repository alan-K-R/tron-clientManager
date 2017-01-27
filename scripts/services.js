(function () {
  //didnt add notes on how to create database yet but do need one..
    'use strict';
    var req = require('mysql');
    var connection = req.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "<yourPassword>",
        database: "clients"
    });
    var app = angular.module('services', []);

    app.service('clientService', function ($q) {
        var mysql = {};
        mysql.select = function () {
            return result(null, 'select * from client');
        };
        mysql.insert = function (data) {
            return result([data.name, data.email, data.telephone], 'insert into client(name,email,telephone) values(?,?,?)');
        };
        mysql.update = function (data) {
            return result([data.name, data.position, data.gol, data.id], 'update client set name=?,address=?,telephone=?, email=? where id=?');
        };
        mysql.delete = function (id) {
            var def = $q.defer();
            connection.query('delete from client where id=?', [id], function (err, res) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(res.affectedRows);
                }
            });
            return def.promise;
        };
        function result(param, query) {
            var def = $q.defer();
            connection.query(query, param, function (err, rows) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(rows);
                }
            });
            return def.promise;
        };
        return mysql;

    });

})();
