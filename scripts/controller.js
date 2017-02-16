(function () {
    'use strict';

    var app = angular.module('controllers', ['ngAnimate', 'ngMaterial']);
    app.controller('clientCtrl', function ($scope, clientService, $mdDialog,
       $mdToast, $rootScope) {
        $scope.datas = [];
        $scope.button = 'Save';
        $scope.selected = [];
        $scope.client = {};
        showData();
        $('#btnPt').addClass('active');

        //language translation
        var aLangKeys=new Array();
      	aLangKeys['btnEn']=new Array();
      	aLangKeys['btnPt']=new Array();
      	aLangKeys['btnEn']['actions']='Actions';
      	aLangKeys['btnEn']['create_client']='Create Client';
      	aLangKeys['btnEn']['update_client']='Update Client';
        aLangKeys['btnEn']['name']='Name';
        aLangKeys['btnEn']['telephone']='Telephone';
        aLangKeys['btnEn']['address']='Address';

        aLangKeys['btnPt']['actions']='Acoes';
      	aLangKeys['btnPt']['create_client']='Criar cliente';
      	aLangKeys['btnPt']['update_client']='Atualizar';
        aLangKeys['btnPt']['name']='Nome';
        aLangKeys['btnPt']['telephone']='Telefone';
        aLangKeys['btnPt']['address']='Endereco';

        function showData() {
            clientService.select().then(function (response) {
                $scope.datas = [].concat(response);
                $scope.datas.count = $scope.datas.length;
            });
        }

        $(document).ready(function() {
        	// onclick behavior
        	$('.lang').click( function() {
            $('#btnEn').toggleClass('active');
            $('#btnPt').toggleClass('active');
        	var lang = $(this).attr('id'); // obtain language id
        	// translate all translatable elements
        	$('.tr').each(function(i){
        	$(this).text(aLangKeys[lang][ $(this).attr('key') ]);
        	});
        	} );
        });

        $scope.fileNameChanged = function(file) {
            if(file){
              for(var i = 0; i < file.files.length; i++){
                $scope.client.image_location = file.files[i].path;
              }
            }
          }

        $scope.refresh = function(){
          showData();
        }

        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15];

        $scope.query = {
          order: 'name',
          limit: 5,
          page: 1
        };

        $scope.logPagination = function (page, limit) {
           console.log('page: ', page);
           console.log('limit: ', limit);
         }

      $scope.create = function (ev){
          $scope.selected = [];
          $scope.client = {};
          $mdDialog.show({
            controller : DialogController,
             templateUrl : 'scripts/views/clientFrm.html',
             parent: angular.element(document.body),
             clickOutsideToClose :true,
             scope: $scope,
             preserveScope: true
             // You can specify either string with query selector
             // or an element
         });
       };

       $scope.updateClient = function (){
         if($scope.selected != null && $scope.selected.length == 1){
           $scope.client = $scope.selected[0];

             $mdDialog.show({
               controller : UpdateDialogController,
                templateUrl : 'scripts/views/clientFrm.html',
                parent: angular.element(document.body),
                clickOutsideToClose :true,
                scope: $scope,
                preserveScope: true
                // You can specify either string with query selector
                // or an element
            })
         }else{
            $mdToast.show(
              $mdToast.simple()
                .textContent('Select only one row..')
                .position('bottom right..' )
                .hideDelay(3000)
            );
         }

         };

        $scope.remove = function (selection) {
            var r = confirm("Are you sure delete this client ? ");
            var email;
            if (r === true) {
              for (var i = 0; i < selection.length; i++){
                email += selection[i].email + ", ";
                clientService.delete(selection[i].id);
              }
                showData();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent(email + " is deleted..")
                    .position('bottom right..' )
                    .hideDelay(3000)
                );
            } else {
                showData();
            }

        };

    });

      function DialogController($scope, $mdDialog, clientService, scope, $mdToast) {
        if($scope.selected != null && $scope.selected.length == 1){
          $scope.client = $scope.selected[0];
        }

        $scope.save = function () {
          clientService.insert($scope.client).then(function (response) {
              scope.refresh();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('client saved..' + $scope.client.email)
                  .position('bottom right..' )
                  .hideDelay(3000)
              );
              $mdDialog.hide();
          }, function (error) {
              console.log('Error' + error);
          });
        };

        $scope.cancel = function(){
          $mdDialog.hide();
        }

      }


      function UpdateDialogController($scope, $mdDialog, clientService, scope, $mdToast) {

        $scope.updateClientDB = function(){
          if(scope.selected.length == 1){
            clientService.update($scope.client).then(function (response) {
                scope.refresh();
                 $mdToast.show(
                   $mdToast.simple()
                     .textContent('client updated..' + $scope.client.email)
                     .position('bottom right' )
                     .hideDelay(3000)
                 );

                $mdDialog.hide();
            }, function (error) {
                console.log('Error' + error);
            });
          }else{
            //TODO: show mdtoast here
          }
        }

        $scope.cancel = function(){
          $mdDialog.hide();
        }
      }

})();
