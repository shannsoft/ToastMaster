app.factory("AdminService", function ($http, $q, $localStorage,CONFIG) {
  return{
    getUserList : function(type){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_user?type='+type,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    getUserDetails : function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_user?type=GET_USER&id='+id,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    clubApproval : function(option){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data: option,
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    }
  }
})
