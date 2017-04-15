app.controller("ClubController",function($scope,$rootScope,AdminService,Util,$localStorage,$stateParams,$uibModal){
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
  $scope.rollApprove = function(rollId,type){
    $rootScope.showPreloader = true;
    var obj = {
        "actType": type,
        "id": rollId,
        "approveByUserCode": $localStorage.loggedInUser.userId
      }
    AdminService.grabRole(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        Util.alertMessage('success',response.data.Message);
        $scope.loadMeetingDetails();
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.roleAction = function(action,role){
    return;// return without calling api
    $rootScope.showPreloader = true;

    AdminService.roleAction(action,role).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.meetingDetails = response.data.Data[0];
        $scope.meetingRoleTypes = response.data.Data;
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  /***********************************************************/
  /**********************Load club List***********************/
  /***********************************************************/
  $scope.loadUserList  = function(type,isClubid){
    $scope.type = (isClubid) ? type+"&id="+$localStorage.loggedInUser.userId : type;
    AdminService.getUserList($scope.type).then(function(response){
      if(response.data.StatusCode == 200)
        $scope.userList = response.data.Data;
    })
  }
  $scope.openPaymentModal = function(id){
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'src/views/modals/paymentModal.html',
     controller: 'paymentModalCtrl',
     size: 'sm',
     resolve: {
       meetingid:function () {
         return id;
       },
       memberList:function () {
         return $scope.userList;
       }
     }
   });
  }
  $scope.videoModal = function(){
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'src/views/modals/videoModal.html',
     controller: 'ModalCtrl',
     size: 'lg',
     resolve: {
       meetingid:function () {
         return $stateParams.meetingid;
       }
     }
   });
  }
  $scope.imageModal = function(){
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'src/views/modals/imageModal.html',
     controller: 'ModalCtrl',
     size: 'lg',
     resolve: {
       meetingid:function () {
         return $stateParams.meetingid;
       }
     }
   });
  }
  $scope.loadPaymentCollection = function(){
      $rootScope.showPreloader = true;
      AdminService.loadClubPayment($stateParams.meetingid).then(function(res){
        $rootScope.showPreloader = false;
        console.log(res);
        if(res.data.StatusCode == 200){
          $scope.paymentList = res.data.Data;
        }
      })
  }
  $scope.addBlog = function(){
    var obj  = {
      "actType": "I",
      "userCode": $localStorage.loggedInUser.userId,
      "title": $scope.blog.title,
      "fileData":{
        "fileName": $scope.blog.imageName,
        "inputStream": $scope.blog.image.split(";base64,")[1]
      },
      "description": $scope.blog.description
    }
    $rootScope.showPreloader = true;
    AdminService.uploadBolg(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        Util.alertMessage('success',"Blog Added Successfully");
      }
      else {
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
  $scope.getBlogList = function(){
    $rootScope.showPreloader = true;
    AdminService.getBolgList($localStorage.loggedInUser.userId).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.bolgList = response.data.Data;
      }
    })
  }
  $scope.getBlogDetails = function(){
    $rootScope.showPreloader = true;
    AdminService.getBolgDetails($stateParams.bolgid).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.bolgDetails = response.data.Data[0];
      }
    })
  }
  $scope.getExpenses = function(){
    $rootScope.showPreloader = true;
    AdminService.getExpenses($localStorage.loggedInUser.userId).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.expenseList = response.data.Data;
      }
    })
  }
  $scope.expenseModal = function(){
    var modalInstance = $uibModal.open({
     animation: true,
     templateUrl: 'src/views/modals/expenseModal.html',
     controller: 'ExpenseModalCtrl',
     size: 'lg',
     resolve: {
       addExpense:function () {
         return $scope.addExpense;
       }
     }
   });
  }
  $scope.addExpense= function(obj){
    var obj1 = {
      "actType": "I",
      "userCode": $localStorage.loggedInUser.userId,
      "amount": obj.ammount,
      "description": obj.description
    }
    $rootScope.showPreloader = true;
    AdminService.addExpenses(obj1).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200){
        $scope.getExpenses();
        Util.alertMessage('success',"Expenses added successfully");
      }
      else{
        Util.alertMessage('danger',response.data.Message);
      }
    })
  }
})




app.controller('paymentModalCtrl', function ($scope, $rootScope,$uibModalInstance,meetingid,$localStorage,memberList,Util,AdminService,$timeout) {
  $scope.memberList = memberList;
  $scope.ok = function () {
    var obj= {
      "actType": "I",
      "userCode": $scope.payment.user,
      "meetingCode": meetingid,
      "paymentType": "CASH",
      "adminUserCode": $localStorage.loggedInUser.userId,
      "amount": $scope.payment.ammount
    }
    $rootScope.showPreloader = true;
    AdminService.addPayment(obj).then(function(res){
      $rootScope.showPreloader = false;
      if(res.data.StatusCode == 200){
        Util.alertMessage('success',"Payment Added Successfully");
      }
      else {
        Util.alertMessage('danger',res.data.Message);
      }
      $timeout(function(){
        $uibModalInstance.close();
      },3000)
    })
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('ExpenseModalCtrl', function ($scope, $rootScope,$uibModalInstance,addExpense) {
  $scope.ok = function () {
    addExpense($scope.expense);
    $uibModalInstance.close();
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
app.controller('ModalCtrl', function ($scope, $rootScope,$uibModalInstance,meetingid,$localStorage,Util,AdminService,$timeout,$sce) {
  $scope.addVideo  = function () {
    var obj = {
      "actType": "I",
      "meetingCode": meetingid,
      "userCode": $localStorage.loggedInUser.userId,
      "title": $scope.video.title,
      "url": $scope.video.linkURL,
      "description": $scope.video.description
    }
    $rootScope.showPreloader = true;
    AdminService.addVideo(obj).then(function(res){
      $rootScope.showPreloader = false;
      if(res.data.StatusCode == 200){
        Util.alertMessage('success',"Video Added Successfully");
      }
      else {
        Util.alertMessage('danger',res.data.Message);
      }
      $timeout(function(){
        $uibModalInstance.close();
      },3000)
    })
  };
  $scope.addImage  = function () {
    var obj = {
      "actType": "I",
      "meetingCode": meetingid,
      "userCode": $localStorage.loggedInUser.userId,
      "title": $scope.photo.title,
      "description": $scope.photo.description,
      "fileData":{
        "fileName": $scope.photo.imageName,
        "inputStream": $scope.photo.image.split(";base64,")[1]
      }
    }
    console.log(obj);
    $rootScope.showPreloader = true;
    AdminService.addImage(obj).then(function(res){
      $rootScope.showPreloader = false;
      if(res.data.StatusCode == 200){
        Util.alertMessage('success',"Image Added Successfully");
      }
      else {
        Util.alertMessage('danger',res.data.Message);
      }
      $timeout(function(){
        $uibModalInstance.close();
      },3000)
    })
  };

  $scope.convertVideo = function(){
    $scope.youtubeURL = '';
    youtube_url = transformYoutubeURL($scope.video.linkURL);
    $scope.youtubeURL = $sce.trustAsResourceUrl(youtube_url);
  }
  function transformYoutubeURL(youtube_url) {
    var coll = youtube_url.split("=",2);
    if(coll != null) {
        var videoId = coll[1];
        return_url = 'https://www.youtube.com/embed/' + videoId;
    } else {
        return youtube_url;
    }
    return return_url;
  }
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
