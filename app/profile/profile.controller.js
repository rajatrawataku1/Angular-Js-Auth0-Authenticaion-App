(function(){
  angular.module('app').controller('ProfileController',ProfileController)

  function ProfileController(){

    var vm=this;
    vm.profile=JSON.parse(localStorage.getItem('profile'))
  }
})();
