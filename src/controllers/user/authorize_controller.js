app.controller('AuthorizeController',function($scope,$rootScope,$localStorage,$window,UserService,$state,CommonService,$timeout,Util,AdminService,$stateParams){
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
  /***********************************************************/
  /********************To login the user*********************/
  /***********************************************************/
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
  /***********************************************************/
  /********************For club Registration******************/
  /***********************************************************/
  $scope.getCountryList = function(){
    $scope.club = {};
    $scope.club.clubCode = $stateParams.clubid;
    UserService.getCountryList().then(function(response){
      $scope.countryList = response.data.Data;
    })
  }
  /***********************************************************/
  /**********************Load club List***********************/
  /***********************************************************/
  $scope.loadClubList  = function(){
    $rootScope.showPreloader = true;
    AdminService.getClubList().then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.clubList = response.data.Data;
    })
  }
  /***********************************************************/
  /********************Load Map for geopint*******************/
  /***********************************************************/
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
        // $scope.club.address = $scope.obj.street_code+', '+$scope.obj.street;
      }, 1000);

  }
  /***********************************************************/
  /********************For club Registration******************/
  /***********************************************************/
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
  /***********************************************************/
  /********************Check password match*******************/
  /***********************************************************/
  $scope.validatePassword = function(password,confirmPassword){
    if(password !== confirmPassword){
      $scope.showPasswordMisMatch = true;
    }
    if(password === confirmPassword){
      $scope.showPasswordMisMatch = false;
    }
  };
  /***********************************************************/
  /********************Check password match*******************/
  /***********************************************************/
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
  /***********************************************************/
  /********************use for forgot password****************/
  /***********************************************************/
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
});
