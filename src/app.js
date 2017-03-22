var app = angular.module('toast-master',['ui.router','ngAnimate','ngStorage']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      templateUrl: 'src/views/home/home.html',
      controller: "HomeController",
      url: '/home'
    })
    .state('login', {
      templateUrl: 'src/views/header/login.html',
      controller: "LoginController",
      url: '/login',
      resolve: {
          loggedin: checkLoggedin
      },
    })
    .state('club-registration', {
      templateUrl: 'src/views/header/club-registration.html',
      controller: "SignupController",
      url: '/club-registration'
    })
    .state('admin', {
        url: '/admin',
        abstract: true,
        templateUrl: 'src/views/header/admin.html',
        controller: 'AdminController'
    })
    .state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: 'admin/dashboard.html',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.myProfile', {
      url: '/myProfile',
      templateUrl: 'admin/user/profile-page.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('find-club', {
      templateUrl: 'src/views/header/find-club.html',
      controller: "FindClubController",
      url: '/find-club',
    })
  	.state('need-help', {
      templateUrl: 'src/views/header/need-help.html',
      controller: "NeedHelpController",
      url: '/need-help'
    })
  	.state('my-toastmasters', {
      templateUrl: 'src/views/header/my-toastmasters.html',
      controller: "MyToastmastersController",
      url: '/my-toastmasters'
    })


    function checkLoggedout($q, $timeout, $http, $location, $rootScope, $state, $localStorage) {
        var deferred = $q.defer();
        $timeout(function(){
          console.log($localStorage.loggedInUser);
          if($localStorage.loggedInUser){
            deferred.resolve();
          }
          else{
            deferred.resolve();
            $state.go('login');
          }
        },100)
    }
    function checkLoggedin($q, $timeout, $http, $location, $rootScope, $state, $localStorage) {
        var deferred = $q.defer();
        $timeout(function(){
          if($localStorage.loggedInUser){
            deferred.resolve();
            $state.go('admin.dashboard');
          }
          else{
            deferred.resolve();
          }
        },100)
    }
  });
  app.constant('CONFIG', {
    "HOST_API":"http://api.ssmaktak.com/api",
    "SERVER_PATH":1
  })

  app.run(function($http,$rootScope,$localStorage){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.stateName = toState.name;
      var state = toState.name.split('.');
      $rootScope.is_admin = (state[0] == 'admin') ? true : false;
    })
  });
