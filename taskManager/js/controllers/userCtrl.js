/**
 * Created by Natalie on 5/10/2016.
 */
myApp.controller('userController', ['$firebaseAuth', '$firebaseObject',
                 '$firebaseArray', 'authentication',
  function ($firebaseAuth, $firebaseObject, $firebaseArray, authentication) {

    var self = this;
    self.tab = 'all';
    self.currentView = 'Все пользователи';

    var ref = new Firebase('https://taskstodolist.firebaseio.com/');
    var auth = $firebaseAuth(ref);

    var usersRef = new Firebase('https://taskstodolist.firebaseio.com/users/');
    self.users = $firebaseArray(usersRef);

    authentication.getAuth();

    self.createUser = function () {
      auth.$createUser({
        email: self.user.email,
        password: self.user.pass
      }).then(function (newUser) {
        var regRef = new Firebase('https://taskstodolist.firebaseio.com/users')
          .child(newUser.uid).set({
            email: self.user.email,
            lastname: self.user.lastname,
            firstname: self.user.firstname,
            patronimic: self.user.patronimic,
            contacts: self.user.contacts,
            status: self.user.status
          });
        self.user = {}
      }).catch(function (error) {
        self.errorMessage = error.message;
      })
    };

    self.removeUser = function (user) {
      self.users.$remove(user);
    };
    self.changeUserData = function (user) {
      self.users.$save(user);
    }
  }]);