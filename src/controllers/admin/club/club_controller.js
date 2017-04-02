app.controller("ClubController",function($scope,$rootScope,AdminService,Util,$localStorage,$stateParams){
  $scope.meeting = {};
  var obj = {};
  $scope.onTimeSet = function (newDate, oldDate) {
    $scope.meeting.dateTime = moment(newDate).format("DD-MM-YYYY hh:mm A");
    obj.scheduleDate = moment(newDate).format("DD-MMM-YYYY");
    obj.scheduleTime = moment(newDate).format("hh:mm A");
  }
  $scope.createMeeting = function(){
    $rootScope.showPreloader = true;
    obj.actType = "I";
    obj.topic = $scope.meeting.title;
    obj.description = $scope.meeting.desc;
    AdminService.createMeeting(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meeting = {};
        Util.alertMessage('success','Meeting created succesfully waiting for VP Education Approval');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.loadMeetingList = function(){
    $rootScope.showPreloader = true;
    var id = $localStorage.loggedInUser.userId;
    AdminService.meetingList(id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingList = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.loadMeetingDetails = function(){
    $rootScope.showPreloader = true;
    AdminService.meetingDetails($stateParams.meetingid).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingDetails = response.data.Data[0];
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
})
