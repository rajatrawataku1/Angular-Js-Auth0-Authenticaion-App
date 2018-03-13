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

        var profile={
          name:authResult.idTokenPayload.name,
          nickname:authResult.idTokenPayload.nickname,
          picture:authResult.idTokenPayload.nickname
        }

        localStorage.setItem('accessToken',authResult.accessToken);
        localStorage.setItem('id_token',authResult.idToken);
        localStorage.setItem('expires_at',expiresAt);
        localStorage.setItem('profile',JSON.stringify(profile));

      }

      function logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
      }

      function isAuthenticated(){
        var expiresAt=JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
      }

      return {
        login : login,
        handleAuthentication: handleAuthentication,
        logout: logout,
        isAuthenticated: isAuthenticated
      }
  }

})();
