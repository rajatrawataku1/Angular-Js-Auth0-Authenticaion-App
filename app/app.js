(function(){

  angular
      .module('app',['auth0.auth0','ui.router'])
      .config(config);

      config.$inject=[
        '$stateProvider', '$locationProvider', '$urlRouterProvider','angularAuth0Provider'
      ];

      function config ($stateProvider, $locationProvider, $urlRouterProvider,angularAuth0Provider){
        $stateProvider.state('home',{
          url:'/',
          controller:'HomeController',
          templateUrl:'app/home/home.html',
          controllerAs: 'vm'
        })
        .state('callback',{
          url:'/callback',
          controller:'callbackController',
          templateUrl:'app/callback/callback.html',
          controllerAs:'vm'
        });

        angularAuth0Provider.init({
          clientID:'oUaL8T607Jy5QGTC1fyRU3WvURR0zew2',
          domain:'rajatrawataku.auth0.com',
          responseType:'token id_token',
          redirectUri:'http://localhost:3000/callback',
          scope:'openid'
        })

        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);

      }
})();
