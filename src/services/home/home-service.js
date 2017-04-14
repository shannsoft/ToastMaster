app.factory("MainService", function ($http, $q, $localStorage,CONFIG) {
	return{
	    searchClub : function(obj){
	      var response = $http({
	          method: 'POST',
	          url: CONFIG.HOST_API+'/_PublicClubRegistration',
	          data:obj,
	          headers: {'Server': CONFIG.SERVER_PATH}
	      })
	      return response;
	    }
	}
 })