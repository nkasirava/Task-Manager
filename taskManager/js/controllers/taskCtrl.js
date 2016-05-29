/**
 * Created by Natalie on 5/10/2016.
 */
myApp.controller('taskController', ['$rootScope', '$firebaseObject',
                 '$firebaseArray', 'authentication',
  function($rootScope, $firebaseObject, $firebaseArray, authentication) {

    var self = this;

    self.currentView = 'Все задачи';
    self.tab = 'all';

    authentication.getAuth();

    var usersRef = new Firebase('https://taskstodolist.firebaseio.com/users/');
    self.users = $firebaseArray(usersRef);

    var taskRef = new Firebase ('https://taskstodolist.firebaseio.com/tasks');
    self.tasks = $firebaseArray(taskRef);

    self.createTask = function() {
      var timestamp = new Date().valueOf();
      taskRef.child(timestamp).set({
          name: self.task.name,
          description: self.task.description,
          author: $rootScope.currentUser.$id,
          authorName: $rootScope.currentUser.lastname + ' ' + $rootScope.currentUser.firstname,
          executor: self.task.executor,
          executorName: getExecutorName(self.task.executor),
          date: timestamp,
          status: 'new'
        });
      self.task = {}
    };

    self.removeTask = function(task) {
      self.tasks.$remove(task);
    };
    self.changeTaskData = function(task) {
      self.tasks.$save(task);
    };
    self.closeTask = function(task){
      task.status = 'closed';
      self.tasks.$save(task);
    };
    self.beginTask = function(task){
      var timestamp = new Date().valueOf();
      task.status = 'in progress';
      task.startDate = timestamp;
      self.tasks.$save(task);
    };
    self.endTask = function(task){
      var timestamp = new Date().valueOf();
      task.status = 'resolved';
      task.endDate = timestamp;
      self.tasks.$save(task);
    };
    self.getSpentTime = function(task) {
      var endDate = moment(task.endDate);
      var startDate = moment(task.startDate);
      var duration;
      var timeUnits = ['month','weeks', 'days', 'hours', 'minutes', 'seconds'];
      for (var increment = 0; increment < timeUnits.length; increment++) {
        duration = endDate.diff(startDate, timeUnits[increment]);
        if (duration !== 0) {
          task.spentTime = duration + ' ' + timeUnits[increment];
          self.tasks.$save(task);
          return;
        }
      }
    };
    function getExecutorName (executorId) {
      var executor;
      angular.forEach(self.users, function(value) {
        if (value.$id === executorId) {
          executor = value;
          console.log (executor);
        }
      });
      return executor.lastname + ' ' + executor.firstname
    }
  }]);