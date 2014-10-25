var agendaIndex = function($scope, $sailsSocket, $stateParams){
  if($stateParams.page)
    $scope.currentPage = $stateParams.page;
  else
    $scope.currentPage = 1;

  countAgendas = function(){
    $sailsSocket.get("/agenda/count/").success(function(res){
      $scope.totalItems = res.count;
    });
  };
  getAgendas = function(page){
    $sailsSocket.get("/agenda/index/"+page).success(function(agendas){
      $scope.agendas = agendas;
    }).error(function(err){
      console.log(err);
    });
  };

  countAgendas();
  getAgendas($scope.currentPage);

  $scope.pageChanged = function() {
    getAgendas($scope.currentPage);
  };
  $scope.delete = function(id){
    $sailsSocket.delete("/agenda/delete/"+id).success(function(agenda){
      getAgendas($scope.currentPage);
      countAgendas();
    }).error(function(err){
      console.log(err);
    });
  };
};

var agendaShow = function($scope, $sailsSocket, $stateParams){
  $sailsSocket.get("/agenda/show/"+$stateParams.id).success(function(agenda){
    $scope.agenda = agenda;
    MapInitializeShow(agenda);
  }).error(function(err){
    console.log(err);
  });
};

var agendaEdit = function($scope, $sailsSocket, $state, $stateParams){
  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };
  $scope.open = function($event){
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $sailsSocket.get("/agenda/show/"+$stateParams.id).success(function(agenda){
    $scope.agenda = agenda;
    MapInitializeNew(agenda);
  }).error(function(err){
    console.log(err);
  });
  $scope.edit = function(id){
    $sailsSocket.put("/agenda/edit/"+id,$scope.agenda).success(function(agenda){
      $state.go('agenda.index');
    }).error(function(err){
      console.log(err);
    });
  };
};

var agendaNew = function($scope, $sailsSocket, $state){
  $scope.agenda = {
    title       : '',
    description : '',
    day         : new Date(),
    hour        : new Date(0),
    long        : 7.762094,
    lat         : 48.5691135
  };
  $scope.placeholder = {
    title: "Titre de l'évènement",
    description: "Description de l'évènement"
  };

  MapInitializeNew($scope.agenda);
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.open = function($event){
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  $scope.create = function(){
    $sailsSocket.post("/agenda/create",$scope.agenda).success(function(agenda){
      $state.go('agenda.index');
    }).error(function(err){
      console.log(err);
    });
  };
};

