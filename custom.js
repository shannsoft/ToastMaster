var app=angular.module("toast-master",["ui.router","ui.bootstrap","ngAnimate","ngStorage","ui.bootstrap.datetimepicker"]);app.config(["$stateProvider","$urlRouterProvider",function(a,b){function c(a,b,c,d,e,f,g){var h=a.defer();b(function(){g.loggedInUser?h.resolve():(h.resolve(),f.go("login"))},100)}function d(a,b,c,d,e,f,g){var h=a.defer();b(function(){g.loggedInUser?(h.resolve(),f.go("admin.dashboard")):h.resolve()},100)}d.$inject=["$q","$timeout","$http","$location","$rootScope","$state","$localStorage"],c.$inject=["$q","$timeout","$http","$location","$rootScope","$state","$localStorage"],b.otherwise("/home"),a.state("home",{templateUrl:"src/views/home/home.html",controller:"HomeController",url:"/home"}).state("login",{templateUrl:"src/views/header/login.html",controller:"AuthorizeController",url:"/login",resolve:{loggedin:d}}).state("club-registration",{templateUrl:"src/views/header/club-registration.html",controller:"AuthorizeController",url:"/club-registration"}).state("member-registration",{templateUrl:"src/views/header/member-registration.html",controller:"AuthorizeController",url:"/member-registration/:clubid"}).state("club-success",{templateUrl:"src/views/header/club-success.html",url:"/club-success"}).state("find-club",{templateUrl:"src/views/header/find-club.html",url:"/find-club",controller:"HomeController"}).state("club-details",{templateUrl:"src/views/home/club-details.html",url:"/club-details",controller:"HomeController"}).state("need-help",{templateUrl:"src/views/header/need-help.html",url:"/need-help"}).state("my-toastmasters",{templateUrl:"src/views/header/my-toastmasters.html",url:"/my-toastmasters"}).state("contact-us",{templateUrl:"src/views/footer/contact.html",url:"/contact-us"}).state("copyrights",{templateUrl:"src/views/footer/copyrights.html",url:"/copyrights"}).state("faq",{templateUrl:"src/views/footer/faq.html",url:"/faq"}).state("privacy-policy",{templateUrl:"src/views/footer/privacy-policy.html",url:"/privacy-policy"}).state("tnc",{templateUrl:"src/views/footer/terms-conditions.html",url:"/tnc"}).state("forgot-password",{templateUrl:"src/views/header/forgot-password.html",url:"/forgot-password",controller:"AuthorizeController",resolve:{loggedin:d}}).state("admin",{url:"/admin","abstract":!0,templateUrl:"src/views/header/admin.html",controller:"AdminController"}).state("admin.dashboard",{url:"/dashboard",templateUrl:"admin/dashboard.html",resolve:{loggedout:c}}).state("admin.myProfile",{url:"/myProfile",templateUrl:"admin/user/profile-page.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.approval-request",{url:"/approval-request",templateUrl:"admin/superAdmin/approval-request.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.member-approval",{url:"/member-approval",templateUrl:"admin/club/member-approval.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.club-list",{url:"/club-list",templateUrl:"admin/superAdmin/club-list.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.member-list",{url:"/member-list",templateUrl:"admin/club/member-list.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.club",{url:"/club/:profileid",templateUrl:"admin/superAdmin/clubDetails.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.member",{url:"/member/:profileid",templateUrl:"admin/club/memberDetails.html",controller:"UserDetailsController",resolve:{loggedout:c}}).state("admin.reset-password",{url:"/reset-password",templateUrl:"admin/user/reset-password.html",controller:"AuthorizeController",resolve:{loggedout:c}}).state("admin.meeting-list",{url:"/meeting-list",templateUrl:"admin/club/meeting-list.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.meeting-details",{url:"/meeting-details/:meetingid",templateUrl:"admin/club/meeting-details.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.member-meeting-list",{url:"/member-meeting-list",templateUrl:"admin/member/meeting-list.html",controller:"MemberController",resolve:{loggedout:c}}).state("admin.member-meeting-details",{url:"/member-meeting-details/:meetingid",templateUrl:"admin/member/meeting-details.html",controller:"MemberController",resolve:{loggedout:c}}).state("admin.create-meeting",{url:"/create-meeting",templateUrl:"admin/club/create-meeting.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.club-pay-collection",{url:"/club-pay-collection/:meetingid",templateUrl:"admin/club/payment-collection.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.blog-list",{url:"/blog-list",templateUrl:"admin/club/blogList.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.blog-details",{url:"/blog-details/:bolgid",templateUrl:"admin/club/blog-details.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.new-blog",{url:"/new-blog",templateUrl:"admin/club/new-blog.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.expense",{url:"/expense",templateUrl:"admin/club/expense-list.html",controller:"ClubController",resolve:{loggedout:c}}).state("admin.topic-approval",{url:"/topic-approval",templateUrl:"admin/member/topic-approve.html",controller:"MemberController",resolve:{loggedout:c}})}]),app.constant("CONFIG",{HOST_API:"http://api.ssmaktak.com/api",SERVER_PATH:1}),app.run(["$http","$rootScope","$localStorage","$timeout",function(a,b,c,d){b.$on("$stateChangeStart",function(a,c,e,f,g){b.stateName=c.name;var h=c.name.split(".");b.is_admin="admin"==h[0],d(function(){var a=f.name.split(".");("admin"==h[0]&&"admin"!=a[0]||"admin"!=h[0]&&"admin"==a[0]||"admin"!=h[0]&&"admin"!=a[0])&&("admin"!=h[0]&&"admin"!=a[0]||(b.hidePreloader1=!1),d(function(){b.hidePreloader1=!0},5e3))})})}]),app.factory("Config",["$rootScope",function(a){var b="https://maps.googleapis.com/maps/api/geocode/json?latlng=",c="AIzaSyDXNf0gBHsSBF-tRQoDbVM9TJBso4wD9_o";return{getLocationUrl:function(a){var d=b+a+"&key="+c;return d}}}]),app.controller("ClubController",["$scope","$rootScope","AdminService","Util","$localStorage","$stateParams","$uibModal",function(a,b,c,d,e,f,g){a.meeting={};var h={};a.onTimeSet=function(b,c){a.meeting.dateTime=moment(b).format("DD-MM-YYYY hh:mm A"),h.scheduleDate=moment(b).format("DD-MMM-YYYY"),h.scheduleTime=moment(b).format("hh:mm A")},a.createMeeting=function(){b.showPreloader=!0,h.actType="I",h.topic=a.meeting.title,h.description=a.meeting.desc,c.createMeeting(h).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?(a.meeting={},d.alertMessage("success","Meeting created succesfully waiting for VP Education Approval")):d.alertMessage("danger",c.data.Message)})},a.loadMeetingList=function(){b.showPreloader=!0;var f=e.loggedInUser.userId;c.meetingList(f).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?a.meetingList=c.data.Data:d.alertMessage("danger",c.data.Message)})},a.loadMeetingDetails=function(){b.showPreloader=!0,c.meetingDetails(f.meetingid).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?a.meetingDetails=c.data.Data[0]:d.alertMessage("danger",c.data.Message)})},a.rollApprove=function(f,g){b.showPreloader=!0;var h={actType:g,id:f,approveByUserCode:e.loggedInUser.userId};c.grabRole(h).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?(d.alertMessage("success",c.data.Message),a.loadMeetingDetails()):d.alertMessage("danger",c.data.Message)})},a.roleAction=function(a,b){},a.loadUserList=function(b,d){a.type=d?b+"&id="+e.loggedInUser.userId:b,c.getUserList(a.type).then(function(b){200==b.data.StatusCode&&(a.userList=b.data.Data)})},a.openPaymentModal=function(b){g.open({animation:!0,templateUrl:"src/views/modals/paymentModal.html",controller:"paymentModalCtrl",size:"sm",resolve:{meetingid:function(){return b},memberList:function(){return a.userList}}})},a.videoModal=function(){g.open({animation:!0,templateUrl:"src/views/modals/videoModal.html",controller:"ModalCtrl",size:"lg",resolve:{meetingid:function(){return f.meetingid}}})},a.imageModal=function(){g.open({animation:!0,templateUrl:"src/views/modals/imageModal.html",controller:"ModalCtrl",size:"lg",resolve:{meetingid:function(){return f.meetingid}}})},a.loadPaymentCollection=function(){b.showPreloader=!0,c.loadClubPayment(f.meetingid).then(function(c){b.showPreloader=!1,console.log(c),200==c.data.StatusCode&&(a.paymentList=c.data.Data)})},a.addBlog=function(){var f={actType:"I",userCode:e.loggedInUser.userId,title:a.blog.title,fileData:{fileName:a.blog.imageName,inputStream:a.blog.image.split(";base64,")[1]},description:a.blog.description};b.showPreloader=!0,c.uploadBolg(f).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?d.alertMessage("success","Blog Added Successfully"):d.alertMessage("danger",a.data.Message)})},a.getBlogList=function(){b.showPreloader=!0,c.getBolgList(e.loggedInUser.userId).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.bolgList=c.data.Data)})},a.getBlogDetails=function(){b.showPreloader=!0,c.getBolgDetails(f.bolgid).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.bolgDetails=c.data.Data[0])})},a.getExpenses=function(){b.showPreloader=!0,c.getExpenses(e.loggedInUser.userId).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.expenseList=c.data.Data)})},a.expenseModal=function(){g.open({animation:!0,templateUrl:"src/views/modals/expenseModal.html",controller:"ExpenseModalCtrl",size:"lg",resolve:{addExpense:function(){return a.addExpense}}})},a.addExpense=function(f){var g={actType:"I",userCode:e.loggedInUser.userId,amount:f.ammount,description:f.description};b.showPreloader=!0,c.addExpenses(g).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?(a.getExpenses(),d.alertMessage("success","Expenses added successfully")):d.alertMessage("danger",c.data.Message)})}}]),app.controller("paymentModalCtrl",["$scope","$rootScope","$uibModalInstance","meetingid","$localStorage","memberList","Util","AdminService","$timeout",function(a,b,c,d,e,f,g,h,i){a.memberList=f,a.ok=function(){var f={actType:"I",userCode:a.payment.user,meetingCode:d,paymentType:"CASH",adminUserCode:e.loggedInUser.userId,amount:a.payment.ammount};b.showPreloader=!0,h.addPayment(f).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?g.alertMessage("success","Payment Added Successfully"):g.alertMessage("danger",a.data.Message),c.close()})},a.cancel=function(){c.dismiss("cancel")}}]),app.controller("ExpenseModalCtrl",["$scope","$rootScope","$uibModalInstance","addExpense",function(a,b,c,d){a.ok=function(){d(a.expense),c.close()},a.cancel=function(){c.dismiss("cancel")}}]),app.controller("ModalCtrl",["$scope","$rootScope","$uibModalInstance","meetingid","$localStorage","Util","AdminService","$timeout","$sce",function(a,b,c,d,e,f,g,h,i){function j(a){var b=a.split("=",2);if(null==b)return a;var c=b[1];return return_url="https://www.youtube.com/embed/"+c,return_url}a.addVideo=function(){var h={actType:"I",meetingCode:d,userCode:e.loggedInUser.userId,title:a.video.title,url:a.video.linkURL,description:a.video.description};b.showPreloader=!0,g.addVideo(h).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?f.alertMessage("success","Video Added Successfully"):f.alertMessage("danger",a.data.Message),c.close()})},a.addImage=function(){var h={actType:"I",meetingCode:d,userCode:e.loggedInUser.userId,title:a.photo.title,description:a.photo.description,fileData:{fileName:a.photo.imageName,inputStream:a.photo.image.split(";base64,")[1]}};b.showPreloader=!0,g.addImage(h).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?f.alertMessage("success","Image Added Successfully"):f.alertMessage("danger",a.data.Message),c.close()})},a.convertVideo=function(){a.youtubeURL="",youtube_url=j(a.video.linkURL),a.youtubeURL=i.trustAsResourceUrl(youtube_url)},a.cancel=function(){c.dismiss("cancel")}}]),app.controller("AdminController",["$scope","$rootScope",function(a,b){a.navigateMenu=function(){var a=$("body"),b=a.css("position");"relative"!=b?a.hasClass("leftpanel-collapsed")?(a.removeClass("leftpanel-collapsed chat-view"),jQuery(".nav-bracket li.active ul").css({display:"block"}),jQuery(this).removeClass("menu-collapsed")):(a.addClass("leftpanel-collapsed"),jQuery(".nav-bracket ul").attr("style",""),jQuery(this).addClass("menu-collapsed")):(a.hasClass("leftpanel-show")?a.removeClass("leftpanel-show"):a.addClass("leftpanel-show"),adjustmainpanelheight())}}]),app.controller("MemberController",["$scope","$rootScope","$localStorage","AdminService","Util","$uibModal","$stateParams",function(a,b,c,d,e,f,g){a.loadMeetingList=function(){b.showPreloader=!0;var f=c.loggedInUser.clubId;d.memberMeetingList(f).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?a.meetingList=c.data.Data:e.alertMessage("danger",c.data.Message)})},a.approveTopic=function(b,d){a.obj={actType:d,id:b,topicApproveUserCode:c.loggedInUser.userId};f.open({animation:!0,templateUrl:"src/views/modals/confirmModal.html",controller:"ConfirmModalCtrl",size:"sm",resolve:{topicApproval:function(){return a.topicApproval}}})},a.topicApproval=function(){b.showPreloader=!0,d.topicApproval(a.obj).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&a.loadMeetingList()},function(a){b.showPreloader=!1})},a.loadMeetingDetails=function(){b.showPreloader=!0,d.meetingDetails(g.meetingid).then(function(c){b.showPreloader=!1,200==c.data.StatusCode?a.meetingDetails=c.data.Data[0]:e.alertMessage("danger",c.data.Message)})},a.grabRole=function(b){var f={actType:"I",meetingId:g.meetingid,roleId:b,usercode:c.loggedInUser.userId};d.grabRole(f).then(function(b){200==b.data.StatusCode?(e.alertMessage("success",b.data.Message),a.loadMeetingDetails()):e.alertMessage("danger",b.data.Message)})},a.cancelRole=function(b){var f={actType:"D",roleId:b,usercode:c.loggedInUser.userId};d.grabRole(f).then(function(b){200==b.data.StatusCode?(e.alertMessage("success",b.data.Message),a.loadMeetingDetails()):e.alertMessage("danger",b.data.Message)})}}]),app.controller("ConfirmModalCtrl",["$scope","$rootScope","$uibModalInstance","topicApproval",function(a,b,c,d){a.ok=function(){d(),c.close()},a.cancel=function(){c.dismiss("cancel")}}]),app.controller("UserDetailsController",["$scope","$rootScope","$localStorage","$sce","$timeout","AdminService","$stateParams","$uibModal",function(a,b,c,d,e,f,g,h){google="undefined"==typeof google?"":google;var i;a.map={},a.type="",a.locationOnMap=function(){if(""!=google&&google.maps&&google.maps.places){if(clearTimeout(i),document.getElementById("map")){var b={lat:parseFloat(a.map.lattitude),lng:parseFloat(a.map.longitude)};map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:b});new google.maps.Marker({position:b,draggable:!1,map:map})}}else i=e(a.locationOnMap,3e3)},a.loadProfileDetails=function(){var b=c.loggedInUser;a.map.lattitude=b.lattitude,a.map.longitude=b.longitude,a.locationOnMap()},a.loadUserList=function(d,e){a.type=e?d+"&id="+c.loggedInUser.userId:d,b.showPreloader=!0,f.getUserList(a.type).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.userList=c.data.Data)})},a.clubApproval=function(c,d){b.showPreloader=!0;var e={actType:c,userCode:d};f.clubApproval(e).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&a.loadUserList(a.type)})},a.loadUserDetails=function(){b.showPreloader=!0;var c=g.profileid;f.getUserDetails(c).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.userDetails=c.data.Data[0]),a.map.lattitude=a.userDetails.lattitude,a.map.longitude=a.userDetails.longitude,a.locationOnMap()})},a.loadDesignationList=function(){f.getDegList().then(function(b){200==b.data.StatusCode&&(a.designationList=b.data.Data)})},a.designationPopUp=function(b,c){h.open({animation:!0,templateUrl:"admin/assignRollModal.html",size:b,controller:"AssignRollModal",resolve:{designationList:function(){return a.designationList},userCode:function(){return c}}})}}]),app.controller("AssignRollModal",["$scope","$rootScope","$uibModalInstance","designationList","AdminService","$localStorage","userCode","Util","$timeout",function(a,b,c,d,e,f,g,h,i){a.designationList=d,a.user={},a.ok=function(){if(a.user.desigId&&""!=a.user.desigId){b.showPreloader=!0;var d={actType:"U",designationId:a.user.desigId,userCode:g};e.assignDes(d).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?(h.alertMessage("success","Successfully Updated"),c.close()):h.alertMessage("danger","Something is wrong please try again")})}else h.alertMessage("danger","Please select a designation")},a.cancel=function(){c.dismiss("cancel")}}]),app.controller("HomeController",["$scope","$rootScope","MainService","$localStorage","$state",function(a,b,c,d,e){a.home.distance="3",a.home.clubname="",b.$on("GOOGLE_LOLADED",function(){a.searchClub()}),a.searchClub=function(){b.showPreloader=!0;var d=a.latLong.split(","),e={latitude:d[0],longitude:d[1],distance:a.home.distance,distanceType:"km",clubName:a.home.clubname};c.searchClub(e).then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.clubList=c.data.Data,a.loadMap())})},a.loadMap=function(){a.markers=[],map=new google.maps.Map(document.getElementById("googleMap"),{zoom:10}),a.setMarkers()},a.setMarkers=function(){var b=new google.maps.LatLngBounds;angular.forEach(a.clubList,function(c){var f=new google.maps.LatLng(parseFloat(c.lattitude),parseFloat(c.longitude)),g={url:"images/map-icon.png",scaledSize:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)},h=new google.maps.Marker({position:f,map:map,icon:g,animation:google.maps.Animation.DROP});h.addListener("click",function(){d.club=c,e.go("club-details")}),b.extend(f),a.markers.push(h)}),map.setCenter(b.getCenter())},a.gotoDetails=function(a){d.club=a,e.go("club-details")},a.clubDetails=function(){a.clubDetails=d.club,console.log(a.clubDetails)}}]),app.controller("MainController",["$scope","$rootScope","$localStorage","UserService","$state","$timeout","CommonService","Config",function(a,b,c,d,e,f,g,h){a.$on("$viewContentLoaded",function(a){$(document).trigger("TemplateLoaded")}),google="undefined"==typeof google?"":google;var i;a.home={},b.$on("login-success",function(b){a.signedView=!1,a.checkLoginUser()}),a.checkLoginUser=function(){c.loggedInUser&&(a.signedView=!0,b.loggedIn_user=c.loggedInUser)},a.logout=function(){b.showPreloader=!0,d.logout().then(function(d){b.showPreloader=!1,a.signedView=!1,delete c.loggedInUser,e.go("home")},function(b){a.signedView=!1,delete c.loggedInUser,e.go("home")})},a.homeInit=function(b){""!=google&&google.maps&&google.maps.places?(clearTimeout(i),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(b){var c={lat:b.coords.latitude,lng:b.coords.longitude},d=c.lat+","+c.lng,e=h.getLocationUrl(d);g.fetchLocation(e).then(function(b){a.place=b.data.results[3],a.home.location=a.place.formatted_address,a.latLong=a.place.geometry.location.lat+","+a.place.geometry.location.lng,a.initLocation()},function(a){})})):i=f(a.homeInit,3e3)},a.initLocation=function(){var c=document.getElementById("main_loc");autocomplete=new google.maps.places.Autocomplete(c,{types:["geocode"]}),autocomplete.addListener("place_changed",j),b.isGoogleLoaded=!0,a.$emit("GOOGLE_LOLADED")};var j=function(){var b=a.place=autocomplete.getPlace();b.geometry?a.latLong=b.geometry.location.lat()+","+b.geometry.location.lng():document.getElementById("main_loc").placeholder="Enter a city"};a.clearInputs=function(b){"loc"==b?a.home.location="":"club"==b&&(a.home.clubname="")}}]),app.controller("AuthorizeController",["$scope","$rootScope","$localStorage","$window","UserService","$state","CommonService","$timeout","Util","AdminService","$stateParams",function(a,b,c,d,e,f,g,h,i,j,k){a.user={},google="undefined"==typeof google?"":google;var l,m,n;a.initLogin=function(){c.user&&(a.user.username=c.user.uname,a.user.password=g.decode(c.user.password))},a.login=function(){b.showPreloader=!0,e.login(a.user).then(function(d){b.showPreloader=!1,200==d.data.StatusCode?(c.loggedInUser=d.data.Data,a.user.is_remember&&(c.user={uname:a.user.username,password:g.encode(a.user.password)}),b.$emit("login-success"),f.go("admin.dashboard")):i.alertMessage("danger",d.data.Message)})},a.getCountryList=function(){a.club={},a.club.clubCode=k.clubid,e.getCountryList().then(function(b){a.countryList=b.data.Data})},a.loadClubList=function(){b.showPreloader=!0,j.getClubList().then(function(c){b.showPreloader=!1,200==c.data.StatusCode&&(a.clubList=c.data.Data)})},a.loadMap=function(){""!=google&&google.maps&&google.maps.places?(clearTimeout(l),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(b){var c={lat:b.coords.latitude,lng:b.coords.longitude};m=new google.maps.Geocoder;var d=new google.maps.LatLng(c.lat,c.lng);a.getLocationDetails(d),n=new google.maps.Map(document.getElementById("map"),{zoom:12,center:c});var e=new google.maps.Marker({position:c,draggable:!0,map:n});google.maps.event.addListener(e,"dragend",function(){a.getLocationDetails(e.getPosition())})})):l=h(a.loadMap,3e3)},a.getLocationDetails=function(b){a.obj={},a.club.lattitude=b.lat(),a.club.longitude=b.lng(),a.obj.latlng=a.club.lattitude+", "+a.club.longitude,m&&m.geocode({latLng:b},function(b,c){if(c==google.maps.GeocoderStatus.OK){if(b[1])for(var d=0;d<b.length;d++)"locality"==b[d].types[0]?(a.obj.city=b[d].address_components[0].long_name,a.obj.state=b[d].address_components[2].long_name):"political"==b[d].types[0]?a.obj.street=b[d].address_components[0].long_name:"postal_code"==b[d].types[0]?(a.obj.postal_code=b[d].address_components[0].long_name,a.club.pin=b[d].address_components[0].long_name):"street_address"==b[d].types[0]&&(a.obj.street_code=b[d].address_components[0].long_name)}else console.log("Geocoding failed: "+c)}),h(function(){a.club.pin=a.obj.postal_code,a.club.state=a.obj.state,a.club.cityName=a.obj.city},1e3)},a.clubRegister=function(c){b.showPreloader=!0,a.club.isHaveSponsorOrg="True"==a.club.isHaveSponsorOrg,a.club.actType="I",a.club.userid=a.club.email,a.club.joinType=parseInt(c),a.club.pin=parseInt(a.club.pin),e.clubRegistration(a.club).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?f.go("club-success"):i.alertMessage("danger",a.data.Message)})},a.validatePassword=function(b,c){b!==c&&(a.showPasswordMisMatch=!0),b===c&&(a.showPasswordMisMatch=!1)},a.changePassword=function(){b.showPreloader=!0,e.changePassword(a.user).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?i.alertMessage("success","You have successfully changed your password"):i.alertMessage("danger",a.data.Message)})},a.forgotPassword=function(){b.showPreloader=!0,e.forgotPassword(a.user).then(function(a){b.showPreloader=!1,200==a.data.StatusCode?(i.alertMessage("success","Please check your mail we have sent a password"),h(function(){f.go("login")},5e3)):i.alertMessage("danger",a.data.Message)})}}]),app.directive("fileModel",["$parse",function(a){return{restrict:"A",scope:{fileread:"=",filename:"="},link:function(a,b,c){b.bind("change",function(){var c=new FileReader;c.onload=function(c){a.$apply(function(){a.fileread=c.target.result,a.filename=b[0].files[0].name})},c.readAsDataURL(b[0].files[0])})}}}]),app.filter("dateformat",function(){return function(a){if(a)return moment(a).format("MMM DD, YYYY")}}),app.filter("startsWith",function(){return function(a,b){if(a){var c=[],d=new RegExp(b,"i");return angular.forEach(a,function(a){a&&d.test(a.fName.substring(0,1))&&c.push(a)}),c}}}),app.factory("AdminService",["$http","$q","$localStorage","CONFIG",function(a,b,c,d){return{getUserList:function(b){var e=a({method:"GET",url:d.HOST_API+"/_user?type="+b,headers:{Server:d.SERVER_PATH,tokenId:c.loggedInUser.tokenId}});return e},getUserDetails:function(b){var e=a({method:"GET",url:d.HOST_API+"/_user?type=GET_USER&id="+b,headers:{Server:d.SERVER_PATH,tokenId:c.loggedInUser.tokenId}});return e},clubApproval:function(b){var e=a({method:"POST",url:d.HOST_API+"/_User",data:b,headers:{Server:d.SERVER_PATH,tokenId:c.loggedInUser.tokenId}});return e},getDegList:function(){var b=a({method:"GET",url:d.HOST_API+"/_designation",headers:{Server:d.SERVER_PATH,tokenId:c.loggedInUser.tokenId}});return b},assignDes:function(b){var e=a({method:"POST",url:d.HOST_API+"/_User",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},createMeeting:function(b){var e=a({method:"POST",url:d.HOST_API+"/_Meeting",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},meetingList:function(b){var e=a({method:"GET",url:d.HOST_API+"/_meeting?type=GET_ALL_MEETING&id="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},memberMeetingList:function(b){var e=a({method:"GET",url:d.HOST_API+"/_meeting?type=GET_ALL_CLUB_MEETING&clubId="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},meetingDetails:function(b){var e=a({method:"GET",url:d.HOST_API+"/_meeting?type=GET_MEETING_ID&meetingid="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},getMeetingRoleType:function(){var b=a({method:"GET",url:d.HOST_API+"/_meetingroletype",headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return b},roleAction:function(b,e){var f={};b?f.actType="APPROVE":f.actType="REJECT",f.id=e.roleId,f.approveByUserCode=e.roleId;var g=a({method:"POST",url:d.HOST_API+"/_meetingrole ",data:meeting,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return g},addPayment:function(b){var e=a({method:"POST",url:d.HOST_API+"/_MeetingPayment",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},addVideo:function(b){var e=a({method:"POST",url:d.HOST_API+"/_MeetingVideo",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},addImage:function(b){var e=a({method:"POST",url:d.HOST_API+"/_MeetingPhoto",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},uploadBolg:function(b){var e=a({method:"POST",url:d.HOST_API+"/_MeetingBlog",data:b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},loadClubPayment:function(b){var e=a({method:"GET",url:d.HOST_API+"/_MeetingPayment?type=GET_MEETING_ID&meetingid="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},getBolgList:function(b){var e=a({method:"GET",url:d.HOST_API+"/_MeetingBlog?type=GET_BLOG_USER&userCode="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},getBolgDetails:function(b){var e=a({method:"GET",url:d.HOST_API+"/_MeetingBlog?type=GET_BLOG_DETAILS&blogCode="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},getExpenses:function(b){var e=a({method:"GET",url:d.HOST_API+"/_MeetingExpenses?type=GET_EXPENSE_USERID&userCode="+b,headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},addExpenses:function(b){var e=a({method:"POST",data:b,url:d.HOST_API+"/_MeetingExpenses",headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},topicApproval:function(b){var e=a({method:"POST",data:b,url:d.HOST_API+"/_Meeting",headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e},grabRole:function(b){var e=a({method:"POST",data:b,url:d.HOST_API+"/_MeetingRole",headers:{tokenId:c.loggedInUser.tokenId,Server:d.SERVER_PATH}});return e}}}]),app.factory("UserService",["CONFIG","$http","$q","$localStorage",function(a,b,c,d){return{login:function(c){userDetails={userId:c.username,password:c.password};var d=b({method:"POST",url:a.HOST_API+"/Login",data:userDetails,headers:{"Content-Type":"application/json",Server:a.SERVER_PATH}});return d},logout:function(){userDetails={userId:d.loggedInUser.userId};var c=b({method:"POST",url:a.HOST_API+"/_Logout",data:userDetails,headers:{"Content-Type":"application/json",Server:a.SERVER_PATH}});return c},getCountryList:function(){var c=b({method:"GET",url:a.HOST_API+"/_country",headers:{Server:a.SERVER_PATH}});return c},clubRegistration:function(c){var d=b({method:"POST",url:a.HOST_API+"/_User",data:c,headers:{"Content-Type":"application/json",Server:a.SERVER_PATH}});return d},forgotPassword:function(c){var d={email:c.email},e=b({method:"POST",url:a.HOST_API+"/_ForgotPassword",data:d,headers:{"Content-Type":"application/json",Server:a.SERVER_PATH}});return e},changePassword:function(c){var e={userId:d.loggedInUser.userId,newPwd:c.newPwd,oldPwd:c.oldPwd},f=b({method:"POST",url:a.HOST_API+"/_ChangePassword",data:e,headers:{Server:a.SERVER_PATH,tokenId:d.loggedInUser.tokenId}});return f}}}]),app.factory("CommonService",["$http","$q",function(a,b){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",d=function(a){var b,d,e,f,g,h="",i="",j="",k=0;do b=a.charCodeAt(k++),d=a.charCodeAt(k++),i=a.charCodeAt(k++),e=b>>2,f=(3&b)<<4|d>>4,g=(15&d)<<2|i>>6,j=63&i,isNaN(d)?g=j=64:isNaN(i)&&(j=64),h=h+c.charAt(e)+c.charAt(f)+c.charAt(g)+c.charAt(j),b=d=i="",e=f=g=j="";while(k<a.length);return h},e=function(a){var b,d,e,f,g,h="",i="",j="",k=0,l=/[^A-Za-z0-9\+\/\=]/g;l.exec(a)&&window.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do e=c.indexOf(a.charAt(k++)),f=c.indexOf(a.charAt(k++)),g=c.indexOf(a.charAt(k++)),j=c.indexOf(a.charAt(k++)),b=e<<2|f>>4,d=(15&f)<<4|g>>2,i=(3&g)<<6|j,h+=String.fromCharCode(b),64!=g&&(h+=String.fromCharCode(d)),64!=j&&(h+=String.fromCharCode(i)),b=d=i="",e=f=g=j="";while(k<a.length);return h},f=function(b){var c=a.get(b);return c};return{encode:d,decode:e,fetchLocation:f}}]),app.factory("Util",["$rootScope","$timeout",function(a,b){var c={};return a.alerts=[],c.alertMessage=function(c,d){var e={type:c,msg:d};a.alerts.push(e),b(function(){a.alerts.splice(a.alerts.indexOf(e),1)},5e3)},c}]),app.factory("MainService",["$http","$q","$localStorage","CONFIG",function(a,b,c,d){return{searchClub:function(b){var c=a({method:"POST",url:d.HOST_API+"/_PublicClubRegistration",data:b,headers:{Server:d.SERVER_PATH}});return c}}}]);