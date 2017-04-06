var app = angular.module('toast-master',['ui.router','ui.bootstrap','ngAnimate','ngStorage','ui.bootstrap.datetimepicker']);
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    checkLoggedin.$inject = ["$q", "$timeout", "$http", "$location", "$rootScope", "$state", "$localStorage"];
    checkLoggedout.$inject = ["$q", "$timeout", "$http", "$location", "$rootScope", "$state", "$localStorage"];
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
  }]);
  app.constant('CONFIG', {
    "HOST_API":"http://api.ssmaktak.com/api",
    "SERVER_PATH":1
  })

  app.run(["$http", "$rootScope", "$localStorage", "$timeout", function($http,$rootScope,$localStorage,$timeout){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.stateName = toState.name;
      var state = toState.name.split('.');
      var frmstate = fromState.name.split('.');
      console.log('from state',frmstate[0]);
      if((state[0] == 'admin' && frmstate[0] != 'admin') || (state[0] != 'admin' && frmstate[0] == 'admin')){
        $rootScope.showPreloader1 = true;
        $timeout(function(){
          $rootScope.showPreloader1 = false;
        },300)
      }
      $rootScope.is_admin = (state[0] == 'admin') ? true : false;
    })
  }]);
;app.controller("ClubController",["$scope", "$rootScope", "AdminService", "Util", "$localStorage", "$stateParams", function($scope,$rootScope,AdminService,Util,$localStorage,$stateParams){
  $scope.meeting = {};
  var obj = {};
  $scope.onTimeSet = function (newDate, oldDate) {
    $scope.meeting.dateTime = moment(newDate).format("DD-MM-YYYY hh:mm A");
    obj.scheduleDate = moment(newDate).format("DD-MMM-YYYY");
    obj.scheduleTime = moment(newDate).format("hh:mm A");
  }
  $scope.createMeeting = function(){
    $rootScope.showPreloader = true;
    obj.actType = "I";
    obj.topic = $scope.meeting.title;
    obj.description = $scope.meeting.desc;
    AdminService.createMeeting(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meeting = {};
        Util.alertMessage('success','Meeting created succesfully waiting for VP Education Approval');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.loadMeetingList = function(){
    $rootScope.showPreloader = true;
    var id = $localStorage.loggedInUser.userId;
    AdminService.meetingList(id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingList = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.loadMeetingDetails = function(){
    $rootScope.showPreloader = true;
    AdminService.meetingDetails($stateParams.meetingid).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingDetails = response.data.Data[0];
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.getMeetingRoleTypeInit = function(){
    $rootScope.showPreloader = true;
    AdminService.getMeetingRoleType().then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingDetails = response.data.Data[0];
        $scope.meetingRoleTypes = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.roleAction = function(action,role){
    return;// return without calling api
    $rootScope.showPreloader = true;

    AdminService.roleAction(action,role).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingDetails = response.data.Data[0];
        $scope.meetingRoleTypes = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
}])
;app.controller('AdminController',["$scope", "$rootScope", function($scope,$rootScope){
  $scope.navigateMenu = function(){
    var body = $('body');
    var bodypos = body.css('position');
    if(bodypos != 'relative') {
         if(!body.hasClass('leftpanel-collapsed')) {
            body.addClass('leftpanel-collapsed');
            jQuery('.nav-bracket ul').attr('style','');

            jQuery(this).addClass('menu-collapsed');

         } else {
            body.removeClass('leftpanel-collapsed chat-view');
            jQuery('.nav-bracket li.active ul').css({display: 'block'});

            jQuery(this).removeClass('menu-collapsed');

         }
      } else {

         if(body.hasClass('leftpanel-show'))
            body.removeClass('leftpanel-show');
         else
            body.addClass('leftpanel-show');

         adjustmainpanelheight();
      }
  }
}]);
;app.controller('UserDetailsController',["$scope", "$rootScope", "$localStorage", "$sce", "$timeout", "AdminService", "$stateParams", "$uibModal", function($scope,$rootScope,$localStorage,$sce,$timeout,AdminService,$stateParams,$uibModal){
  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  $scope.map = {};
  $scope.type = '';
  $scope.locationOnMap = function(){
    if(google == "" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.locationOnMap , 3000);
    else {
      clearTimeout(googleTime);
      if(document.getElementById('map')){
        var myLatLng = {lat: parseFloat($scope.map.lattitude), lng: parseFloat($scope.map.longitude)};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: myLatLng
        });

        var location = new google.maps.Marker({
          position: myLatLng,
          draggable:false,
          map: map
        });
      }
    }

  }
  $scope.loadProfileDetails = function () {
    var details = $localStorage.loggedInUser;
    $scope.map.lattitude = details.lattitude;
    $scope.map.longitude = details.longitude;
    $scope.locationOnMap();
  }
  $scope.loadUserList  = function(type,isClubid){
    $scope.type = (isClubid) ? type+"&id="+$localStorage.loggedInUser.userId : type;
    $rootScope.showPreloader = true;
    AdminService.getUserList($scope.type).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.userList = response.data.Data;
    })
  }
  $scope.clubApproval  = function(option,id){
    $rootScope.showPreloader = true;
    var obj = {
      "actType"  : option,
      "userCode" : id
    }
    AdminService.clubApproval(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.loadUserList($scope.type);
    })
  }
  $scope.loadUserDetails = function () {
    $rootScope.showPreloader = true;
    var user_id = $stateParams.profileid;
    AdminService.getUserDetails(user_id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.userDetails = response.data.Data[0];
        $scope.map.lattitude = $scope.userDetails.lattitude;
        $scope.map.longitude = $scope.userDetails.longitude;
        $scope.locationOnMap();
    })
  }
  $scope.loadDesignationList = function(){
    AdminService.getDegList().then(function(response){
      if(response.data.StatusCode == 200){
        $scope.designationList = response.data.Data;
      }
    })
  }
  $scope.designationPopUp = function(size,userCode){
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'admin/assignRollModal.html',
        size: size,
        controller: "AssignRollModal",
        resolve: {
            designationList : function () {
                return $scope.designationList;
            },
            userCode : function(){
              return userCode;
            }
        }
    });
  }
}]);
app.controller('AssignRollModal', ["$scope", "$rootScope", "$uibModalInstance", "designationList", "AdminService", "$localStorage", "userCode", "Util", "$timeout", function ($scope,$rootScope, $uibModalInstance,designationList,AdminService,$localStorage,userCode,Util,$timeout) {
    $scope.designationList = designationList;
    $scope.user = {};
    $scope.ok = function () {
      if($scope.user.desigId && $scope.user.desigId != ''){
        $rootScope.showPreloader = true;
        var obj = {
          "actType" : "U",
          "designationId" : $scope.user.desigId,
          "userCode" : userCode
        }
        AdminService.assignDes(obj).then(function(response){
          $rootScope.showPreloader = false;
          if(response.data.StatusCode == 200){
            Util.alertMessage('success',"Successfully Updated");
            $timeout(function(){
              $uibModalInstance.close();
            },5000);
          }
          else{
            Util.alertMessage('danger',"Something is wrong please try again");
          }
        })
      }
      else{
          Util.alertMessage('danger',"Please select a designation");
      }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
;app.controller("HomeController",["$scope", function($scope){
  
}])
;app.controller('MainController',["$scope", "$rootScope", "$localStorage", "UserService", "$state", function($scope,$rootScope,$localStorage,UserService,$state){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });
  $rootScope.$on('login-success', function(event) {
      $scope.signedView = false;
      $scope.checkLoginUser();
  });
  $scope.checkLoginUser = function(){
    if($localStorage.loggedInUser) {
      $scope.signedView = true;
      $rootScope.loggedIn_user = $localStorage.loggedInUser;
    }
  }
  $scope.logout = function(){
    $rootScope.showPreloader = true;
    UserService.logout().then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.signedView = false;
        delete $localStorage.loggedInUser;
        $state.go('home');
      }
    })
  }
}]);
;app.controller('AuthorizeController',["$scope", "$rootScope", "$localStorage", "$window", "UserService", "$state", "CommonService", "$timeout", "Util", "AdminService", function($scope,$rootScope,$localStorage,$window,UserService,$state,CommonService,$timeout,Util,AdminService){
  $scope.user = {};
  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  var geocoder;
  var map;
  $scope.initLogin = function(){
    if($localStorage.user){
      $scope.user.username = $localStorage.user.uname;
      $scope.user.password = CommonService.decode($localStorage.user.password);
    }
  }
  $scope.login = function(){
    $rootScope.showPreloader = true;
    UserService.login($scope.user).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $localStorage.loggedInUser = response.data.Data;
        if($scope.user.is_remember){
          $localStorage.user = {
            "uname" : $scope.user.username,
            "password" : CommonService.encode($scope.user.password)
          }
        }
        $rootScope.$emit('login-success');
        $state.go('admin.dashboard');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.getCountryList = function(){
    $scope.club = {};
    UserService.getCountryList().then(function(response){
      $scope.countryList = response.data.Data;
    })
  }
  $scope.loadClubList  = function(){
    $rootScope.showPreloader = true;
    AdminService.getClubList().then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.clubList = response.data.Data;
    })
  }
  $scope.loadMap = function(){
    if(google == "" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.loadMap , 3000);
    else {
      clearTimeout(googleTime);
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(pos.lat, pos.lng);
            $scope.getLocationDetails(latLng);
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: pos
            });
            var marker = new google.maps.Marker({
              position: pos,
              draggable:true,
              map: map
            });
            google.maps.event.addListener(marker, 'dragend', function() {
              $scope.getLocationDetails(marker.getPosition());
            });
          });
        }
    }
  }
  $scope.getLocationDetails = function(latLng){
      $scope.obj = {};
      $scope.club.lattitude = latLng.lat();
      $scope.club.longitude = latLng.lng();
      $scope.obj.latlng = $scope.club.lattitude+', '+$scope.club.longitude;
      if (geocoder) {
        geocoder.geocode({ 'latLng': latLng}, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
             if (results[1]) {
    					for (var i = 0; i < results.length; i++) {
    						if (results[i].types[0] == "locality") {
    							$scope.obj.city = results[i].address_components[0].long_name;
    							$scope.obj.state = results[i].address_components[2].long_name;
    						}
    						else if (results[i].types[0] == "political") {
    							$scope.obj.street = results[i].address_components[0].long_name;
    						}
    						else if (results[i].types[0] == "postal_code") {
    							$scope.obj.postal_code = results[i].address_components[0].long_name;
    							$scope.club.pin = results[i].address_components[0].long_name;
    						}
    						else if (results[i].types[0] == "street_address") {
    							$scope.obj.street_code = results[i].address_components[0].long_name;
    						}
    					}
    				}
           }
           else {
            console.log("Geocoding failed: " + status);
           }
        });
      }
      $timeout(function () {
        $scope.club.pin = $scope.obj.postal_code;
        $scope.club.state = $scope.obj.state;
        $scope.club.cityName = $scope.obj.city;
      }, 1000);

  }
  $scope.clubRegister = function(type){
    $rootScope.showPreloader = true;
    $scope.club.isHaveSponsorOrg = ($scope.club.isHaveSponsorOrg == 'True');
    $scope.club.actType = "I";
    $scope.club.userid = $scope.club.email;
    $scope.club.joinType = parseInt(type);
    $scope.club.pin = parseInt($scope.club.pin);
    UserService.clubRegistration($scope.club).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $state.go('club-success');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.validatePassword = function(password,confirmPassword){
    if(password !== confirmPassword){
      $scope.showPasswordMisMatch = true;
    }
    if(password === confirmPassword){
      $scope.showPasswordMisMatch = false;
    }
  };
  $scope.changePassword = function(){
    $rootScope.showPreloader = true;
    UserService.changePassword($scope.user).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        Util.alertMessage('success','You have successfully changed your password');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  };
  $scope.forgotPassword = function(){
    $rootScope.showPreloader = true;
    UserService.forgotPassword($scope.user).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        Util.alertMessage('success','Please check your mail we have sent a password');
        $timeout(function(){
          $state.go('login');
        },5000)
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
}]);
;app.filter('dateformat', function(){
  return function(date){
    if(date){
      return moment(date).format("MMM DD, YYYY");
    }
  }
})
app.filter('startsWith', function () {
  return function (items,letter) {
    if(items){
      var filtered = [];
      var letterMatch = new RegExp(letter, 'i');
      angular.forEach(items,function(item){
        if(item)
          if (letterMatch.test(item.fName.substring(0, 1))) {
            filtered.push(item);
          }
      })
      return filtered;
    }
  };
});
;app.factory("AdminService", ["$http", "$q", "$localStorage", "CONFIG", function ($http, $q, $localStorage,CONFIG) {
  return{
    getUserList : function(type){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_user?type='+type,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    getUserDetails : function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_user?type=GET_USER&id='+id,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    clubApproval : function(option){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data: option,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    getDegList : function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_designation',
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    assignDes : function(userDetails){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data : userDetails,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    createMeeting : function(meeting){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_Meeting',
          data : meeting,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    meetingList : function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_ALL_MEETING&id='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    meetingDetails: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_MEETING_ID&id='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getMeetingRoleType: function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meetingroletype',
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    roleAction: function(action,role){
      var data = {};
      action ? data.actType = 'APPROVE' : data.actType = 'REJECT';
      data.id = role.roleId;
      data.approveByUserCode = role.roleId;
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_meetingrole ',
          data : meeting,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
    }
  }
}])
;app.factory('UserService',["CONFIG", "$http", "$q", "$localStorage", function(CONFIG, $http, $q,$localStorage){
  return{
    login : function(userData){
      userDetails = {
        "userId" : userData.username,
        "password": userData.password
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/Login',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    logout : function (){
      userDetails = {
        "userId" : $localStorage.loggedInUser.userId,
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_Logout',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getCountryList : function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_country',
          headers: {'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    clubRegistration : function(userDetails){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    forgotPassword : function(user){
      var obj = {
        "email": user.email
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_ForgotPassword',
          data : obj,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    changePassword : function(user){
      var obj = {
        "userId" : $localStorage.loggedInUser.userId,
        "newPwd" : user.newPwd,
        "oldPwd" : user.oldPwd
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_ChangePassword',
          data: obj,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    }
  }

}])
;app.factory("CommonService", ["$http", "$q", function ($http,$q) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var encode = function (input){
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;
      do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }
          output = output +
              keyStr.charAt(enc1) +
              keyStr.charAt(enc2) +
              keyStr.charAt(enc3) +
              keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);
      return output;
  };
  var decode = function ( input ){
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);
      return output;
  };
  return {
      encode                : encode,
      decode                : decode
  };
}]);
app.factory('Util', ["$rootScope", "$timeout", function( $rootScope, $timeout){
    var Util = {};
    $rootScope.alerts = [];
    Util.alertMessage = function(msgType, message){
        var alert = { type:msgType , msg: message };
        $rootScope.alerts.push( alert );
        $timeout(function(){
            $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
        }, 5000);
    };
    return Util;
}]);
