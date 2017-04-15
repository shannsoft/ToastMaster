app.controller("MemberController",function($scope,$rootScope,$localStorage,AdminService,Util,$uibModal,$stateParams){

  $scope.loadMeetingList = function(){
    $rootScope.showPreloader = true;
    var id = $localStorage.loggedInUser.clubId;
    AdminService.memberMeetingList(id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingList = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.approveTopic = function(meetingId,type){
    $scope.obj = {
      "actType": type,
      "id": meetingId,
      "topicApproveUserCode": $localStorage.loggedInUser.userId
    }
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'src/views/modals/confirmModal.html',
     controller: 'ConfirmModalCtrl',
     size: 'sm',
     resolve: {
       topicApproval:function () {
         return $scope.topicApproval;
       }
     }
   });
  }
  $scope.topicApproval = function(){
    $rootScope.showPreloader = true;
    AdminService.topicApproval($scope.obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.loadMeetingList();
      }
    },function(err){
      $rootScope.showPreloader = false;
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
  $scope.grabRole = function(rollId){
    var obj = {
      "actType" : "I",
      "meetingId" : $stateParams.meetingid,
      "roleId" : rollId,
      "usercode" : $localStorage.loggedInUser.userId
    }
    AdminService.grabRole(obj).then(function(response){
      if(response.data.StatusCode == 200){
        Util.alertMessage('success',response.data.Message);
        $scope.loadMeetingDetails();
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.cancelRole = function(rollId){
    var obj = {
      "actType" : "D",
      "roleId" : rollId,
      "usercode" : $localStorage.loggedInUser.userId
    }
    AdminService.grabRole(obj).then(function(response){
      if(response.data.StatusCode == 200){
        Util.alertMessage('success',response.data.Message);
        $scope.loadMeetingDetails();
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
})
app.controller('ConfirmModalCtrl',function($scope,$rootScope,$uibModalInstance,topicApproval){
  $scope.ok = function () {
    topicApproval();
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
