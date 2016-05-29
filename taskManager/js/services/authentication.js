// * Created by Natalie on 5/10/2016.
myApp.factory('authentication', ['$rootScope','$firebaseAuth', '$firebaseObject', '$location',
  function($rootScope, $firebaseAuth, $firebaseObject, $location){

    var auth = {};

    auth.getAuth = function () {

      var ref = new Firebase('https://taskstodolist.firebaseio.com/');
      var auth = $firebaseAuth(ref);

      auth.$onAuth(function (authUser) {
        if (authUser) {
          var userRef = new Firebase('https://taskstodolist.firebaseio.com/users/' + authUser.uid);
          $rootScope.currentUser = $firebaseObject(userRef);
          $rootScope.currentUser.$loaded().then(function () {
            if ($rootScope.currentUser.status === 'admin') {
              $location.path('/admin')
            }
            else if ($rootScope.currentUser.status === 'manager') {
              $location.path('/manager');
            }
            else if ($rootScope.currentUser.status === 'developer') {
              $location.path('/developer');
            }
            else {
              $location.path('/login');
            }
          });
        }
        else {
          $rootScope.currentUser = "";
          $location.path('/login');
        }
      });
    };
    return auth;
}]);