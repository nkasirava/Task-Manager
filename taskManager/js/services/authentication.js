// * Created by Natalie on 5/10/2016.
myApp.factory('authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location',
  function ($rootScope, $firebaseAuth, $firebaseObject, $location) {

    var auth = {};
    /**
     * check status of authorized user and change url path
     */
    auth.getAuth = function () {

      var ref = new Firebase('https://taskstodolist.firebaseio.com/');
      var auth = $firebaseAuth(ref);

      auth.$onAuth(function (authUser) {
        if (authUser) {
          var userRef = new Firebase('https://taskstodolist.firebaseio.com/users/' + authUser.uid);
          $rootScope.currentUser = $firebaseObject(userRef);
          $rootScope.currentUser.$loaded().then(function () {
            switch ($rootScope.currentUser.status) {
              case 'admin':
                $location.path('/admin');
                break;
              case 'manager':
                $location.path('/manager');
                break;
              case 'developer':
                $location.path('/developer');
                break;
              default:
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