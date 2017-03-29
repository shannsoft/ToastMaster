app.controller('UserDetailsController',function($scope,$rootScope,$localStorage,$sce,$timeout,AdminService,$stateParams){
  // google = undefined;
  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  /***********************************************************/
  /*****************show the location on map******************/
  /***********************************************************/
  $scope.locationOnMap = function(lattitude,longitude){
    clearTimeout(googleTime);
    if(document.getElementById('map')){
      var myLatLng = {lat: parseFloat(lattitude), lng: parseFloat(longitude)};
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

  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.loadProfileDetails = function () {
    var details = $localStorage.loggedInUser;
    if(google == "" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.loadUserDetails , 3000);
    else {
      $scope.locationOnMap(details.lattitude, details.longitude);
    }
  }
  /***********************************************************/
  /**********************Load club List***********************/
  /***********************************************************/
  $scope.loadUserList  = function(){
    $rootScope.showPreloader = true;
    AdminService.getClubList().then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.clubList = response.data.Data;
    })
  }
  /***********************************************************/
  /********************Approve club Request*******************/
  /***********************************************************/
  $scope.clubApproval  = function(option,id){
    $rootScope.showPreloader = true;
    var obj = {
      "actType"  : option,
      "userCode" : id
    }
    AdminService.clubApproval(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.loadUserList();
    })
  }
  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.loadUserDetails = function () {
    $rootScope.showPreloader = true;
    var user_id = $stateParams.profileid;
    AdminService.getUserDetails(user_id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.userDetails = response.data.Data[0];
        if(google == "" || !google.maps || !google.maps.places)
            googleTime = $timeout($scope.loadUserDetails , 3000);
        else {
          $scope.locationOnMap($scope.userDetails.lattitude, $scope.userDetails.longitude);
        }
    })

  }
});
