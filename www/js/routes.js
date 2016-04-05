angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.generalInfo', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/generalInfo.html',
        controller: 'generalInfoCtrl'
      }
    }
  })

  .state('menu.riskLevel', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/riskLevel.html',
        controller: 'riskLevelCtrl'
      }
    }
  })

  .state('menu.weight', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/weight.html',
        controller: 'weightCtrl'
      }
    }
  })

  .state('menu.bloodPressure', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bloodPressure.html',
        controller: 'bloodPressureCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/p',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true,
    cache:false,
    controller:'menuCtrl'
  })

  .state('logout', {
    url: '/logout',
    templateUrl: 'templates/menu.html',
   controller:'logoutCtrl'
  })


  .state('signup', {
    url: '/signup',
    
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.home', {
    url: '/page17',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.firstTimePregnancy', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/firstTimePregnancy.html',
        controller: 'firstTimePregnancyCtrl'
      }
    }
  })

  .state('menu.subsequentPregnancy', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/subsequentPregnancy.html',
        controller: 'subsequentPregnancyCtrl'
      }
    }
  })

  .state('menu.calculateEDD', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/edd.html',
        controller: 'calculateEDDCtrl'
      }
    }
  })

  .state('menu.result', {
    url: '/sresult',
    cache:false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/result.html',
        controller: 'resultCtrl'
      }
    }
  })
   .state('menu.results', {
    url: '/page12/:age/:hyper',
    views: {
      'side-menu21': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      }
    }
  })

  .state('menu.weightChart', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/weightChart.html',
        controller: 'weightChartCtrl'
      }
    }
  })

  .state('settings', {
    url: '/page14',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

  .state('menu.bPChart', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bPChart.html',
        controller: 'bPChartCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});