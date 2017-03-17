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
      url: '/login'
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
      templateUrl: 'admin/dashboard.html'
    })
    .state('find-club', {
      templateUrl: 'src/views/header/find-club.html',
      controller: "FindClubController",
      url: '/find-club'
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
  });
  app.constant('CONFIG', {
    "HOST_API":"http://api.ssmaktak.com/api",
    "SERVER_PATH":1
  })

  app.run(function($http,$rootScope,$localStorage){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      var state = toState.name.split('.');
      $rootScope.is_admin = (state[0] == 'admin') ? true : false;
    })
  });
