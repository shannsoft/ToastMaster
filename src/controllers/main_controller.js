app.controller('MainController',function($scope,$rootScope,$localStorage,UserService,$state){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });
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
      if(response.data.StatusCode == 200){
        $scope.signedView = false;
        delete $localStorage.loggedInUser;
        $state.go('home');
      }
    })
  }
});
