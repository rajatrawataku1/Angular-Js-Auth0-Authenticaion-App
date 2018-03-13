(function(){

  angular
      .module('app',['auth0.auth0','ui.router','angular-jwt'])
      .config(config);

      config.$inject=[
        '$stateProvider', '$locationProvider', '$urlRouterProvider','angularAuth0Provider',
        'jwtOptionsProvider','$httpProvider'
      ];

      function config ($stateProvider, $locationProvider, $urlRouterProvider,angularAuth0Provider,jwtOptionsProvider,$httpProvider){
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
        })
        .state('profile',{
          url:'/profile',
          controller:'ProfileController',
          templateUrl:'app/profile/profile.html',
          controllerAs:'vm'
        });

        angularAuth0Provider.init({
          clientID:'oUaL8T607Jy5QGTC1fyRU3WvURR0zew2',
          domain:'rajatrawataku.auth0.com',
          responseType:'token id_token',
          redirectUri:'http://localhost:3000/callback',
          scope:'openid profile',
          audience: 'https://rajat-rawat.com/api'
        })

        jwtOptionsProvider.config({
          tokenGetter: function(){
            return localStorage.getItem('accessToken');
          },
          whiteListedDomains:['localhost']
        });

        $httpProvider.interceptors.push('jwtInterceptor');

        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);

      }
})();
