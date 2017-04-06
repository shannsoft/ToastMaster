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
    },
    getDegList : function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_designation',
          headers: {'Server': CONFIG.SERVER_PATH,'tokenId':$localStorage.loggedInUser.tokenId}
      })
      return response;
    },
    assignDes : function(userDetails){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_User',
          data : userDetails,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    createMeeting : function(meeting){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_Meeting',
          data : meeting,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    meetingList : function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_ALL_MEETING&id='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    meetingDetails: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_MEETING_ID&id='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getMeetingRoleType: function(){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meetingroletype',
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    roleAction: function(action,role){
      var data = {};
      action ? data.actType = 'APPROVE' : data.actType = 'REJECT';
      data.id = role.roleId;
      data.approveByUserCode = role.roleId;
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_meetingrole ',
          data : meeting,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
    }
  }
})
