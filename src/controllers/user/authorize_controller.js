app.controller('AuthorizeController',function($scope,$rootScope,$localStorage,$window,UserService,$state,CommonService){
  $scope.user = {};
  $scope.club = {};
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
    })
  }
  /***********************************************************/
  /********************For club Registration******************/
  /***********************************************************/
  $scope.getCountryList = function(){
    UserService.getCountryList().then(function(response){
      $scope.countryList = response.data.Data;
    })
  }
  /***********************************************************/
  /********************For club Registration******************/
  /***********************************************************/
  $scope.clubRegister = function(){
    $rootScope.showPreloader = true;
    $scope.club.isHaveSponsorOrg = ($scope.club.isHaveSponsorOrg == 'True');
    $scope.club.actType = "I";
    $scope.club.userid = $scope.club.email;
    $scope.club.joinType = 2;
    $scope.club.lattitude = 18.1561;
    $scope.club.longitude = -18.1561;
    $scope.club.pin = parseInt($scope.club.pin);
    UserService.clubRegistration($scope.club).then(function(response){
      $rootScope.showPreloader = false;
      console.log(response);
    })
  }
});
