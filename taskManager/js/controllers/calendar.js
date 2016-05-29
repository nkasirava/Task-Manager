/**
 * Created by Natalie on 5/14/2016.
 */
myApp.controller('calendarController', ['$firebaseArray',
  function($firebaseArray) {

    var self = this;

    var taskRef = new Firebase ('https://taskstodolist.firebaseio.com/tasks');
    self.tasks = $firebaseArray(taskRef);

    self.today = moment.utc();
    self.calendarStartDate = moment.utc(self.today.valueOf());
    self.calendarEndDate = moment.utc(self.today.valueOf());

    updateDate();

    self.getTaskInfo = function(task) {
      self.task = task;
    };
    self.addToCalendar = function() {
      self.task.calendar = {
        calendarStartDate: self.calendarStartDate.valueOf(),
        calendarEndDate: self.calendarEndDate.valueOf()
      };
      self.tasks.$save(self.task);
      self.selectedTask = "";
    };
    self.getNextStartDay = function() {
      self.calendarStartDate.add(1, 'days');
      updateDate();
    };
    self.getPrevStartDay = function() {
      if (self.calendarStartDate.valueOf() > self.today.valueOf()) {
        self.calendarStartDate.subtract(1, 'days');
        updateDate();
      }
    };
    self.getNextEndDay = function() {
      self.calendarEndDate.add(1, 'days');
      updateEndDate();
    };
    self.getPrevEndDay = function() {
      if (self.calendarEndDate.valueOf() > self.calendarStartDate.valueOf()) {
        self.calendarEndDate.subtract(1, 'days');
        updateEndDate();
      }
    };
    self.removeFromCalendar = function (task) {
      task.calendar = {};
      self.tasks.$save(task);
    };
    function updateDate() {
      self.calendarEndDate = moment.utc(self.calendarStartDate.valueOf());
      updateStartDate();
      updateEndDate();
    }
    function updateStartDate() {
      self.calendarStartDay = self.calendarStartDate.date();
      self.calendarStartMonth = self.calendarStartDate.month() + 1;
      self.calendarStartYear = self.calendarStartDate.year();
    }
    function updateEndDate() {
      self.calendarEndDay = self.calendarEndDate.date();
      self.calendarEndMonth = self.calendarEndDate.month() + 1;
      self.calendarEndYear = self.calendarEndDate.year();
    }
  }]);