/**
 * Created by Natalie on 5/7/2016.
 */
myApp.controller('loginController', ['$firebaseAuth',
                 '$firebaseObject', '$location', 'authentication',
  function($firebaseAuth, $firebaseObject, $location, authentication) {

    var self = this;

    authentication.getAuth();

    var ref = new Firebase ('https://taskstodolist.firebaseio.com/');
    var auth = $firebaseAuth(ref);

      self.login = function() {
        auth.$authWithPassword ({
          email: self.user.email,
          password: self.user.pass
        }).catch(function(error){
          self.errorMessage = error.message;
        });
      };
      self.logout = function() {
        return auth.$unauth();
      };
}]);