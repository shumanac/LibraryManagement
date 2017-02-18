
       angular.module('appRoutes', [ngRoute]).controller('HelloWorldCtrl', function($routeProvider){
     
           $routeProvider.when('/',{
          templateUrl: 'app/views/pages/home.html'
      });
           
           console.log("testing routes");
      });
    