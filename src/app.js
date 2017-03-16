var app = angular.module('toast-master',['ui.router','ngAnimate']);
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
      url: '/register'
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