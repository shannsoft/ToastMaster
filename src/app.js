var app = angular.module('toast-master',['ui.router','ui.bootstrap','ngAnimate','ngStorage','ui.bootstrap.datetimepicker']);
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
      controller: "AuthorizeController",
      url: '/login',
      resolve: {
          loggedin: checkLoggedin
      },
    })
    .state('club-registration', {
      templateUrl: 'src/views/header/club-registration.html',
      controller: "AuthorizeController",
      url: '/club-registration'
    })
    .state('member-registration', {
      templateUrl: 'src/views/header/member-registration.html',
      controller: "AuthorizeController",
      url: '/member-registration'
    })
    .state('club-success', {
      templateUrl: 'src/views/header/club-success.html',
      url: '/club-success'
    })
    .state('find-club', {
      templateUrl: 'src/views/header/find-club.html',
      url: '/find-club',
      controller: "HomeController"
    })
  	.state('need-help', {
      templateUrl: 'src/views/header/need-help.html',
      url: '/need-help'
    })
  	.state('my-toastmasters', {
      templateUrl: 'src/views/header/my-toastmasters.html',
      url: '/my-toastmasters'
    })
	.state('contact-us', {
      templateUrl: 'src/views/footer/contact.html',
      url: '/contact-us'
    })
	.state('copyrights', {
      templateUrl: 'src/views/footer/copyrights.html',
      url: '/copyrights'
    })
	.state('faq', {
      templateUrl: 'src/views/footer/faq.html',
      url: '/faq'
    })
	.state('privacy-policy', {
      templateUrl: 'src/views/footer/privacy-policy.html',
      url: '/privacy-policy'
    })
	.state('tnc', {
      templateUrl: 'src/views/footer/terms-conditions.html',
      url: '/tnc'
    })

  	.state('forgot-password', {
      templateUrl: 'src/views/header/forgot-password.html',
      url: '/forgot-password',
      controller: "AuthorizeController",
      resolve: {
          loggedin: checkLoggedin
      }
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
    .state('admin.approval-request', {
      url: '/approval-request',
      templateUrl: 'admin/superAdmin/approval-request.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.member-approval', {
      url: '/member-approval',
      templateUrl: 'admin/club/member-approval.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.club-list', {
      url: '/club-list',
      templateUrl: 'admin/superAdmin/club-list.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.member-list', {
      url: '/member-list',
      templateUrl: 'admin/club/member-list.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.club', {
      url: '/club/:profileid',
      templateUrl: 'admin/superAdmin/clubDetails.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.member', {
      url: '/member/:profileid',
      templateUrl: 'admin/club/memberDetails.html',
      controller : 'UserDetailsController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.reset-password', {
      url: '/reset-password',
      templateUrl: 'admin/user/reset-password.html',
      controller : 'AuthorizeController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.meeting-list', {
      url: '/meeting-list',
      templateUrl: 'admin/club/meeting-list.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.meeting-details', {
      url: '/meeting-details/:meetingid',
      templateUrl: 'admin/club/meeting-details.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.create-meeting', {
      url: '/create-meeting',
      templateUrl: 'admin/club/create-meeting.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.club-pay-collection', {
      url: '/club-pay-collection/:meetingid',
      templateUrl: 'admin/club/payment-collection.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.blog-list', {
      url: '/blog-list',
      templateUrl: 'admin/club/blogList.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.blog-details', {
      url: '/blog-details/:bolgid',
      templateUrl: 'admin/club/blog-details.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.new-blog', {
      url: '/new-blog',
      templateUrl: 'admin/club/new-blog.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })
    .state('admin.expense', {
      url: '/expense',
      templateUrl: 'admin/club/expense-list.html',
      controller : 'ClubController',
      resolve: {
          loggedout: checkLoggedout
      }
    })

    function checkLoggedout($q, $timeout, $http, $location, $rootScope, $state, $localStorage) {
        var deferred = $q.defer();
        $timeout(function(){
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

  app.run(function($http,$rootScope,$localStorage,$timeout){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.stateName = toState.name;
      var state = toState.name.split('.');
      var frmstate = fromState.name.split('.');
      if((state[0] == 'admin' && frmstate[0] != 'admin') || (state[0] != 'admin' && frmstate[0] == 'admin')){
        $rootScope.showPreloader1 = true;
        $timeout(function(){
          $rootScope.showPreloader1 = false;
        },300)
      }
      $rootScope.is_admin = (state[0] == 'admin') ? true : false;
    })
  });
