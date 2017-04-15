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
    memberMeetingList : function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_ALL_CLUB_MEETING&clubId='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    meetingDetails: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_meeting?type=GET_MEETING_ID&meetingid='+id,
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
      return response;
    },
    addPayment: function(obj){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_MeetingPayment',
          data : obj,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    addVideo: function(obj){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_MeetingVideo',
          data : obj,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    addImage: function(obj){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_MeetingPhoto',
          data : obj,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    uploadBolg: function(obj){
      var response = $http({
          method: 'POST',
          url: CONFIG.HOST_API+'/_MeetingBlog',
          data : obj,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    loadClubPayment: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_MeetingPayment?type=GET_MEETING_ID&meetingid='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getBolgList: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_MeetingBlog?type=GET_BLOG_USER&userCode='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getBolgDetails: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_MeetingBlog?type=GET_BLOG_DETAILS&blogCode='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    getExpenses: function(id){
      var response = $http({
          method: 'GET',
          url: CONFIG.HOST_API+'/_MeetingExpenses?type=GET_EXPENSE_USERID&userCode='+id,
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    addExpenses: function(obj){
      var response = $http({
          method: 'POST',
          data:obj,
          url: CONFIG.HOST_API+'/_MeetingExpenses',
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    topicApproval: function(obj){
      var response = $http({
          method: 'POST',
          data:obj,
          url: CONFIG.HOST_API+'/_Meeting',
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    },
    grabRole: function(obj){
      var response = $http({
          method: 'POST',
          data:obj,
          url: CONFIG.HOST_API+'/_MeetingRole',
          headers: {'tokenId':$localStorage.loggedInUser.tokenId,'Server': CONFIG.SERVER_PATH}
      })
      return response;
    }
  }
})
