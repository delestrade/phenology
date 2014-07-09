// Phenology App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'phenology' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'phenology.controllers' is found in controllers.js
angular.module('phenology', [
  'ionic',
  'home.controllers',
  'survey.controllers'
  ])

.controller('MainCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/main.html",
      controller: 'MainCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'mainContent' :{
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    })

    .state('app.areas', {
      url: "/areas",
      views: {
        'mainContent' :{
          templateUrl: "templates/areas.html",
          controller: "AreasCtrl"
        }
      }
    })

    .state('app.species', {
      url: "/species/:areaId",
      views: {
        'mainContent' :{
          templateUrl: "templates/species.html",
          controller: 'SpeciesCtrl'
        }
      }
    })

    .state('app.survey', {
      url: "/survey/:areaId/:specId/:indId",
      views: {
        'mainContent' :{
          templateUrl: "templates/survey.html",
          controller: 'SurveyCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
