app.controller('MainController',function($scope,$rootScope){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });
  $rootScope.cssfile = 'style';
});
app.controller('LoginController',function($scope,$rootScope){

});
app.controller('SignupController',function($scope,$rootScope){

});
app.controller('FindClubController',function($scope,$rootScope){

});
app.controller('MyToastmastersController',function($scope,$rootScope){

});
app.controller('NeedHelpController',function($scope,$rootScope){

});