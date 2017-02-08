(function () {
    'use strict';

    var app = angular.module('controllers', ['ngAnimate', 'ngMaterial']);
    app.controller('clientCtrl', function ($scope, clientService, $mdDialog,
       $mdToast) {
        $scope.datas = [];
        $scope.button = 'Save';
        $scope.selected = [];
        $scope.client = {};
        showData();
        $('#btnEn').addClass('active');

        //language translation
        var aLangKeys=new Array();
      	aLangKeys['btnEn']=new Array();
      	aLangKeys['btnPt']=new Array();
      	aLangKeys['btnEn']['actions']='Actions';
      	aLangKeys['btnEn']['create_client']='Create Client';
      	aLangKeys['btnEn']['update_client']='Update Client';
        aLangKeys['btnEn']['name']='Name';
        aLangKeys['btnEn']['address']='Address';
        aLangKeys['btnEn']['telephone']='Telephone';

        aLangKeys['btnPt']['actions']='Acoes';
      	aLangKeys['btnPt']['create_client']='Criar cliente';
      	aLangKeys['btnPt']['update_client']='Atualizar';
        aLangKeys['btnPt']['name']='Nome';
        aLangKeys['btnPt']['address']='Endereço';
        aLangKeys['btnPt']['telephone']='telefone';

        function showData() {
            clientService.select().then(function (response) {
                $scope.datas = [].concat(response);
            });
        }

        // $scope.toggleActive = function(){
        //    $('#btnEn').toggleClass('active');
        //    $('#btnPt').toggleClass('active');
        //
        //   //  var lang = $(this).attr('id');
        //   //  // translate all translatable elements
        // 	// $('.tr').each(function(i){
        // 	// $(this).text(aLangKeys[lang][ $(this).attr('key') ]);
        // 	// });
        // };

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

        $scope.refresh = function(){
          showData();
        }

        $scope.query = {
          order: 'name',
          limit: 5,
          page: 1
        };

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
                email += selection[i].email;
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
      }

})();
