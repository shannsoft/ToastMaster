app.factory('UserService',function(CONFIG, $http, $q){
  return{
    login : function(userData){
      userDetails = {
        "userId" : userData.username,
        "password": userData.password
      }
      // var deferred = $q.defer();
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/Login',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      // $http({
      //     method: 'POST',
      //     url: CONFIG.HOST_API+'/Login',
      //     data : userDetails,
      //     headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      // }).then(function successCallback(response) {
      //     deferred.resolve(response);
      // }, function errorCallback(errorResponse) {
      //     deferred.reject(errorResponse);
      // });
      return response;
    }
  }
})
