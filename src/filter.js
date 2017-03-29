app.filter('dateformat', function(){
  return function(date){
    if(date){
      return moment(date).format("MMM DD, YYYY");
    }
  }
})
app.filter('startsWith', function () {
  return function (items,letter) {
    if(items){
      var filtered = [];
      var letterMatch = new RegExp(letter, 'i');
      angular.forEach(items,function(item){
        if(item)
          if (letterMatch.test(item.fName.substring(0, 1))) {
            filtered.push(item);
          }
      })
      return filtered;
    }
  };
});
