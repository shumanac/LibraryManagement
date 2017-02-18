
       angular.module('appRoutes', [ngRoute]).controller('HelloWorldCtrl', function($routeProvider){
      $routeProvider.when('/',{
          templateUrl: 'app/views/pages/'
      });
           
           console.log("testing routes");
      });
    