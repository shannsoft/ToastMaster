app.controller("ClubController",function($scope,$rootScope,AdminService,Util){
  $scope.meeting = {};
  var obj = {};
  $scope.onTimeSet = function (newDate, oldDate) {
    $scope.meeting.dateTime = moment(newDate).format("DD-MM-YYYY hh:mm A");
    obj.scheduleDate = moment(newDate).format("DD-MMM-YYYY");
    obj.scheduleTime = moment(newDate).format("hh:mm A");
  }
  $scope.createMeeting = function(){
    obj.actType = "I";
    obj.topic = $scope.meeting.title;
    obj.description = $scope.meeting.desc;
    console.log(obj);
    AdminService.createMeeting(obj).then(function(response){
      if(response.data.StatusCode == 200){
        $scope.meeting = {};
        Util.alertMessage('success','Meeting created succesfully waiting for VP Education Approval');
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
})
