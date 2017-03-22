app.controller('MainController',function($scope,$rootScope,$localStorage){
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
});
app.controller('LoginController',function($scope,$rootScope,$localStorage,$window,UserService,$state,CommonService){
  $scope.user = {};
  $scope.initLogin = function(){
    if($localStorage.user){
      $scope.user.username = $localStorage.user.uname;
      $scope.user.password = CommonService.decode($localStorage.user.password);
    }
  }
  $scope.login = function(){
    UserService.login($scope.user).then(function(response){
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
});
app.controller('SignupController',function($scope,$rootScope){

});
app.controller('UserDetailsController',function($scope,$rootScope,$localStorage,$sce,$timeout){
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
});
app.controller('FindClubController',function($scope,$rootScope){

});
app.controller('MyToastmastersController',function($scope,$rootScope){

});
app.controller('NeedHelpController',function($scope,$rootScope){

});
app.controller('AdminController',function($scope,$rootScope){
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
});
