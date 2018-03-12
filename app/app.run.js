(function(){
  angular.module('app').run(run);

  angular.$inject=['authService'];
  function run(authService){
      authService.handleAuthentication();
  }

})();
