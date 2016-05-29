/**
 * Created by Natalie on 5/7/2016.
 */
var myApp = angular.module ('myApp', ['ngRoute', 'firebase']);
    myApp.config(['$routeProvider', function($routeProvider) {
      $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        controllerAs: 'loginCtrl'
      }).
      when('/admin', {
        templateUrl: 'views/admin/admin.html',
        controller: 'userController',
        controllerAs: 'userCtrl'
      }).
      when('/manager', {
        templateUrl: 'views/manager/manager.html',
        controller: 'taskController',
        controllerAs: 'taskCtrl'
      }).
      when('/developer', {
        templateUrl: 'views/developer/developer.html',
        controller: 'taskController',
        controllerAs: 'taskCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
    }]);