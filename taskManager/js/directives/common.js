/**
 * Created by Natalie on 5/7/2016.
 */
/**
 * change label background color depending on the task (or user) status
 */
myApp.directive('labelColor', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      attrs.$observe('labelColor', function () {
        if (attrs.labelColor === 'new' || attrs.labelColor === 'manager') {
          elem.css("background-color", '#5bc0de');
        }
        else if (attrs.labelColor === 'in progress' || attrs.labelColor === 'developer') {
          elem.css("background-color", '#f0ad4e');
        }
        else if (attrs.labelColor === 'resolved' || attrs.labelColor === 'admin') {
          elem.css("background-color", '#5cb85c');
        }
        else if (attrs.labelColor === 'closed') {
          elem.css("background-color", '#777777');
        }
      })
    }
  }
});
/**
 * change icon color depending on the task status
 */
myApp.directive('iconColor', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      attrs.$observe('iconColor', function () {
        if (attrs.iconColor === 'new') {
          elem.css("color", '#5bc0de');
        }
        else if (attrs.iconColor === 'in progress') {
          elem.css("color", '#f0ad4e');
        }
        else if (attrs.iconColor === 'resolved') {
          elem.css("color", '#5cb85c');
        }
        else if (attrs.iconColor === 'closed') {
          elem.css("color", '#777777');
        }
      })
    }
  }
});