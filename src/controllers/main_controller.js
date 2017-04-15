app.controller('MainController',function($scope,$rootScope,$localStorage,UserService,$state,$timeout,CommonService,Config){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });

  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  $scope.home = {};
  /*******************************************************/
  /*************This is use for check user login**********/
  /*******************************************************/
  $rootScope.$on('login-success', function(event) {
      $scope.signedView = false;
      $scope.checkLoginUser();
  });
  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.checkLoginUser = function(){
    if($localStorage.loggedInUser) {
      $scope.signedView = true;
      $rootScope.loggedIn_user = $localStorage.loggedInUser;
    }
  }
  /***********************************************************/
  /********************To logout the user*********************/
  /***********************************************************/
  $scope.logout = function(){
    $rootScope.showPreloader = true;
    UserService.logout().then(function(response){
      $rootScope.showPreloader = false;
      $scope.signedView = false;
      delete $localStorage.loggedInUser;
      $state.go('home');
    },function(error){
      $scope.signedView = false;
      delete $localStorage.loggedInUser;
      $state.go('home');
    })
  }
  $scope.homeInit = function(reload) {
    if(google=="" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.homeInit , 3000);
    else {
      clearTimeout(googleTime);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var latLng = pos.lat + "," + pos.lng;
          var urlStr = Config.getLocationUrl(latLng);
          CommonService.fetchLocation(urlStr).then(function(response) {
            $scope.place = response.data.results[3];
            $scope.home.location = $scope.place.formatted_address;
            $scope.latLong =  $scope.place.geometry.location.lat + "," +  $scope.place.geometry.location.lng;
            $scope.initLocation();
          },function(err) {
          });
        });
      }
    }
  };
  $scope.initLocation = function() {
    var input = /** @type {!HTMLInputElement} */(
    document.getElementById('main_loc'));
    autocomplete = new google.maps.places.Autocomplete(
      input, {
          types: ['geocode']
    });
    autocomplete.addListener('place_changed', onPlaceChanged);
    $rootScope.isGoogleLoaded = true;
    $scope.$emit("GOOGLE_LOLADED");
  };
  var onPlaceChanged = function() {
    var place = $scope.place = autocomplete.getPlace();
    if (place.geometry) {
      $scope.latLong = place.geometry.location.lat() + "," + place.geometry.location.lng();
    } else {
      document.getElementById('main_loc').placeholder = 'Enter a city';
    }
  };
  $scope.clearInputs = function(type){
    if(type == 'loc'){
      $scope.home.location = '';
    }
    else if(type == 'club'){
      $scope.home.clubname = '';
    }
  }
});
