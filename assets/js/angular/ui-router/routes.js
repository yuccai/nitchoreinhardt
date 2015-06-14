app.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.logged = false;
    $rootScope.logout = function(){
      $rootScope.logged = false;
    };
    }
  ]);
app.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,  $urlRouterProvider) {
  $urlRouterProvider.otherwise('/presentation');
  $stateProvider
  .state('presentation', {
    url: '/presentation',
    views: {
      '': {
        templateUrl: 'views/presentation/presentation.html'
      }
    }
  })
  .state('agenda', {
    url: '/agenda',
    views: {
      '': {
        templateUrl: 'views/agenda/agenda.html'
      }
    }
  })
    .state('agenda.index', {
      url: '/index/:page',
      views: {
        'agenda': {
          templateUrl: 'views/agenda/agenda.index.html',
          controller: agendaIndex
        }
      }
    })
    .state('agenda.show', {
      url: '/show/:id',
      views: {
        'agenda': {
          templateUrl: 'views/agenda/agenda.show.html',
          controller: agendaShow
        }
      }
    })
    .state('agenda.new', {
      url: '/new',
      views: {
        'agenda': {
          templateUrl: 'views/agenda/agenda.new.html',
          controller: agendaNew
        }
      }
    })
    .state('agenda.edit', {
      url: '/edit/:id',
      views: {
        'agenda': {
          templateUrl: 'views/agenda/agenda.edit.html',
          controller: agendaEdit
        }
      }
    })
  .state('albums', {
    url: '/albums',
    views: {
      '': {
        templateUrl: 'views/albums/albums.html'
      }
    }
  })
  .state('galerie', {
    url: '/galerie',
    views: {
      '': {
        templateUrl: 'views/galerie/galerie.html'
      }
    }
  })
    .state('galerie.index', {
      url: '/index/:page',
      views: {
        'galerie': {
          templateUrl: 'views/galerie/galerie.index.html',
          controller: galerieIndex
        }
      }
    })
    .state('galerie.show', {
      url: '/show/:id',
      views: {
        'galerie': {
          templateUrl: 'views/galerie/galerie.show.html',
          controller: galerieShow
        }
      }
    })
    .state('galerie.new', {
      url: '/new',
      views: {
        'galerie': {
          templateUrl: 'views/galerie/galerie.new.html',
          controller: galerieNew
        }
      }
    })
    .state('galerie.edit', {
      url: '/edit/:id',
      views: {
        'galerie': {
          templateUrl: 'views/galerie/galerie.edit.html',
          controller: galerieEdit
        }
      }
    })
  .state('contacts', {
    url: '/contacts',
    views: {
      '': {
        templateUrl: 'views/contacts/contacts.html',
        controller: contactsIndex
      }
    }
  })
  .state('livredor', {
    url: '/livredor/:page',
    views: {
      '': {
        templateUrl: 'views/livredor/livredor.html',
        controller: livredorIndex
      }
    }
  })
  .state('admin', {
    url: '/admin',
    views: {
      '': {
        templateUrl: 'views/admin/admin.html'
      }
    }
  })
    .state('admin.login', {
      url: '/login',
      views: {
        'admin': {
          templateUrl: 'views/admin/admin.login.html',
          controller: adminLogin
        }
      }
    })
    .state('admin.new', {
      url: '/new',
      views: {
        'admin': {
          templateUrl: 'views/admin/admin.new.html',
          controller: adminNew
        }
      }
    })
}]);
