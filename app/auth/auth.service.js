(function(){
  angular.module('app').service('authService',authService);
  authService.$inject=['$state','angularAuth0','$timeout'];

  function authService($state,angularAuth0,$timeout){

      function login(){
        angularAuth0.authorize();
      }

      function handleAuthentication(){
        angularAuth0.parseHash(function(err,authResult){
          if(authResult && authResult.accessToken && authResult.idToken){
            console.log(authResult);
            setSession(authResult);
          }
        });
      }

      function setSession(authResult){
        var expiresAt=JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem('accessToken',authResult.accessToken);
        localStorage.setItem('id_token',authResult.idToken);
        localStorage.setItem('expires_at',expiresAt);
      }

      return {
        login : login,
        handleAuthentication: handleAuthentication
      }
  }

})();
