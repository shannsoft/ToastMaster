app.factory('UserService',function(CONFIG, $http, $q,$localStorage){
  return{
    login : function(userData){
      userDetails = {
        "userId" : userData.username,
        "password": userData.password
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/Login',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    logout : function (){
      userDetails = {
        "userId" : $localStorage.loggedInUser.userId,
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_Logout',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getCountryList : function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_country',
          headers: {'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    clubRegistration : function(userDetails){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data : userDetails,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    forgotPassword : function(user){
      var obj = {
        "email": user.email
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_ForgotPassword',
          data : obj,
          headers: {'Content-Type':'application/json','Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    changePassword : function(user){
      var obj = {
        "userId" : $localStorage.loggedInUser.userId,
        "newPwd" : user.newPwd,
        "oldPwd" : user.oldPwd
      }
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_ChangePassword',
          data: obj,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    }
  }

})
