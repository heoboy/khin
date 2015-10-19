requirejs.config({
  baseUrl: '.',
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.4.min',
    semantic: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.4/semantic.min',
    angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min',
    router: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min',
    text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
  },
  shim: {
    semantic: {
      deps: ['jquery']
    },
    angular: {
      deps: ['semantic'],
      exports: 'angular'
    },
    router: {
      deps: ['angular']
    }
  }
});

requirejs([
  'angular',
  'router',
  'text!./monday.html',
  'text!./tuesday.html',
  'text!./wed.html'
], function(angular) {
  angular
    .module('khin', ['ui.router'])
    .config(config);

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['khin']);
  });

  function config($locationProvider, $urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise(function($injector) {
      $injector.get('$state').go('monday');
    });

    $stateProvider
      .state('monday', {
        url: '/monday',
        template: require('text!./monday.html')
      })
      .state('tuesday', {
        url: '/tuesday',
        template: require('text!./tuesday.html')
      })
      .state('wed', {
        url: '/wed',
        template: require('text!./wed.html')
      });
  }
});

