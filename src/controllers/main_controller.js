app.controller('MainController',function($scope,$rootScope){
  $scope.$on('$viewContentLoaded',
    function(event) {
      $(document).trigger("TemplateLoaded");
  });
});
app.controller('LoginController',function($scope,$rootScope){

});
app.controller('SignupController',function($scope,$rootScope){

});
