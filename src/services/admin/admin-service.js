app.factory("AdminService", function ($http, $q, $localStorage,CONFIG) {
  return{
    getClubList : function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_user?type=GET_ALL_CLUB',
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    }
  }
})
