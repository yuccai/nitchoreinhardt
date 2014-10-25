var livredorIndex = function($scope, $sailsSocket, $stateParams){
  if($stateParams.page)
    $scope.currentPage = $stateParams.page;
  else
    $scope.currentPage = 1;

  $scope.livredor = {
    pseudo : '',
    comment: ''
  };
  $scope.placeholder = {
    pseudo : 'Indiquez votre pseudo',
    comment: 'Ajouter un commentaire'
  };

  getLivredors = function(page){
    $sailsSocket.get("/livredor/index/"+page).success(function(livredors){
      $scope.livredors = livredors;
    });
  };
  countLivredors = function(){
    $sailsSocket.get("/livredor/count/").success(function(res){
      $scope.totalItems = res.count;
    });
  };

  $scope.pageChanged = function() {
    getLivredors($scope.currentPage);
  };

  $scope.create = function(){
    $sailsSocket.post("/livredor/create",$scope.livredor).success(function(livredor){
      $scope.totalItems +=1;
      getLivredors($scope.currentPage);
    });
  };

  $scope.delete = function(id){
    $sailsSocket.delete("/livredor/delete/"+id).success(function(){
      $scope.totalItems -=1;
      getLivredors($scope.currentPage);
    });
  };

  getLivredors($scope.currentPage);
  countLivredors();

};
