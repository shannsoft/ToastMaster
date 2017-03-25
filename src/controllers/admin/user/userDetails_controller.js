app.controller('UserDetailsController',function($scope,$rootScope,$localStorage,$sce,$timeout,AdminService){
  // google = undefined;
  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.loadUserDetails = function () {
    var details = $localStorage.loggedInUser;
    // $scope.trustedURL = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyAyPOEsucm0X1kbw1HVmE-fEOa2ArhupZg&q="+details.longitude+","+details.lattitude);
    // $scope.mapLocation = "https://maps.google.com/maps?q="+details.longitude+","+details.lattitude+"&hl=es;z=9&amp;output=embed";
    if(google == "" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.loadUserDetails , 3000);
    else {
      clearTimeout(googleTime);
      if(document.getElementById('map')){
        var myLatLng = {lat: parseFloat(details.lattitude), lng: parseFloat(details.longitude)};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
      }
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
});
