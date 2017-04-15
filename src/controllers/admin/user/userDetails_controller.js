app.controller('UserDetailsController',function($scope,$rootScope,$localStorage,$sce,$timeout,AdminService,$stateParams,$uibModal){
  // google = undefined;
  google = typeof google === 'undefined' ? "" : google;
  var googleTime;
  $scope.map = {};
  $scope.type = '';
  /***********************************************************/
  /*****************show the location on map******************/
  /***********************************************************/
  $scope.locationOnMap = function(){
    if(google == "" || !google.maps || !google.maps.places)
        googleTime = $timeout($scope.locationOnMap , 3000);
    else {
      clearTimeout(googleTime);
      if(document.getElementById('map')){
        var myLatLng = {lat: parseFloat($scope.map.lattitude), lng: parseFloat($scope.map.longitude)};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: myLatLng
        });

        var location = new google.maps.Marker({
          position: myLatLng,
          draggable:false,
          map: map
        });
      }
    }

  }

  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.loadProfileDetails = function () {
    var details = $localStorage.loggedInUser;
    $scope.map.lattitude = details.lattitude;
    $scope.map.longitude = details.longitude;
    $scope.locationOnMap();
  }
  /***********************************************************/
  /**********************Load club List***********************/
  /***********************************************************/
  $scope.loadUserList  = function(type,isClubid){
    $scope.type = (isClubid) ? type+"&id="+$localStorage.loggedInUser.userId : type;
    $rootScope.showPreloader = true;
    AdminService.getUserList($scope.type).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.userList = response.data.Data;
    })
  }
  /***********************************************************/
  /********************Approve club Request*******************/
  /***********************************************************/
  $scope.clubApproval  = function(option,id){
    $rootScope.showPreloader = true;
    var obj = {
      "actType"  : option,
      "userCode" : id
    }
    AdminService.clubApproval(obj).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.loadUserList($scope.type);
    })
  }
  /***********************************************************/
  /*****************To Check the login user*******************/
  /***********************************************************/
  $scope.loadUserDetails = function () {
    $rootScope.showPreloader = true;
    var user_id = $stateParams.profileid;
    AdminService.getUserDetails(user_id).then(function(response){
      $rootScope.showPreloader = false;
      if(response.data.StatusCode == 200)
        $scope.userDetails = response.data.Data[0];
        $scope.map.lattitude = $scope.userDetails.lattitude;
        $scope.map.longitude = $scope.userDetails.longitude;
        $scope.locationOnMap();
    })
  }
  $scope.loadDesignationList = function(){
    AdminService.getDegList().then(function(response){
      if(response.data.StatusCode == 200){
        $scope.designationList = response.data.Data;
      }
    })
  }
  $scope.designationPopUp = function(size,userCode){
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'admin/assignRollModal.html',
        size: size,
        controller: "AssignRollModal",
        resolve: {
            designationList : function () {
                return $scope.designationList;
            },
            userCode : function(){
              return userCode;
            }
        }
    });
  }
});
app.controller('AssignRollModal', function ($scope,$rootScope, $uibModalInstance,designationList,AdminService,$localStorage,userCode,Util,$timeout) {
    $scope.designationList = designationList;
    $scope.user = {};
    $scope.ok = function () {
      if($scope.user.desigId && $scope.user.desigId != ''){
        $rootScope.showPreloader = true;
        var obj = {
          "actType" : "U",
          "designationId" : $scope.user.desigId,
          "userCode" : userCode
        }
        AdminService.assignDes(obj).then(function(response){
          $rootScope.showPreloader = false;
          if(response.data.StatusCode == 200){
            Util.alertMessage('success',"Successfully Updated");
            $uibModalInstance.close();
          }
          else{
            Util.alertMessage('danger',"Something is wrong please try again");
          }
        })
      }
      else{
          Util.alertMessage('danger',"Please select a designation");
      }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
