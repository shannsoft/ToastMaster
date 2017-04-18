app.factory("Config", function($rootScope) {
  var gApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  var gApiKey = "AIzaSyDXNf0gBHsSBF-tRQoDbVM9TJBso4wD9_o";
  return{
  	getLocationUrl : function(param){
  		var url = gApi+param+"&key="+gApiKey;
    	return url;
  	}
  }
});
