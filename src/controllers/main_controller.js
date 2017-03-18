app.controller('MainController',function($scope,$rootScope,$localStorage){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });
});
app.controller('LoginController',function($scope,$rootScope,$localStorage,$window,UserService,$state){
  $scope.login = function(){
    UserService.login($scope.user).then(function(response){
      if(response.data.StatusCode == 200){
        $state.go('admin.dashboard');
      }
    })
  }
});
app.controller('SignupController',function($scope,$rootScope){

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
