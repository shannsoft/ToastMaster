app.controller("HomeController",function($scope,$rootScope,MainService,$localStorage,$state){
  /****************************************************************************/
  /****************fUNCTION USE FOR FIRE A EVENT TO JAVASCRIPT*****************/
  /****************************************************************************/
  $scope.home.distance = "3";
  $scope.home.clubname = "";
  $rootScope.$on("GOOGLE_LOLADED",function(){
  	$scope.searchClub();
  })

  $scope.searchClub = function(){
  	$rootScope.showPreloader = true;
  	var latLng = $scope.latLong.split(',');
  	var obj = {
	  "latitude": latLng[0],
	  "longitude": latLng[1],
	  "distance": $scope.home.distance,
	  "distanceType": "km",
	  "clubName": $scope.home.clubname
	}
  	MainService.searchClub(obj).then(function(response){
  		$rootScope.showPreloader = false;
  		if(response.data.StatusCode == 200){
  			$scope.clubList = response.data.Data;
  			$scope.loadMap();
  		}
  	})
  }
  /*******************************************************************************************/
  /*************** Info - Load google map of listing page*************************************/
  /*******************************************************************************************/
  $scope.loadMap = function() {
    $scope.markers = [];
    map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 10
    });
    $scope.setMarkers();
  }
  /*******************************************************************************************/
  /*************** Info - setMarkers() is called for mark the lawer on map********************/
  /*******************************************************************************************/
  $scope.setMarkers = function() {
    var bound = new google.maps.LatLngBounds();
    angular.forEach($scope.clubList, function(item) {
      var loc = new google.maps.LatLng(parseFloat(item.lattitude), parseFloat(item.longitude));
      var icon = {
	    url: "images/map-icon.png", // url
	    scaledSize: new google.maps.Size(50, 50), // scaled size
	    origin: new google.maps.Point(0,0), // origin
	    anchor: new google.maps.Point(0, 0) // anchor
	  };
      var marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: icon,
        animation: google.maps.Animation.DROP
      });
      marker.addListener('click', function() {
	  	$localStorage.club = item;
  		$state.go('club-details');
	  });
      bound.extend(loc);
      $scope.markers.push(marker);
    });
    map.setCenter(bound.getCenter());
  }
  $scope.gotoDetails = function(club){
  	$localStorage.club = club;
  	$state.go('club-details');
  }
  $scope.clubDetails = function(){
  	$scope.clubDetails = $localStorage.club;
  	console.log($scope.clubDetails);
  }
})
