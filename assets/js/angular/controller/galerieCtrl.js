var galerieIndex = function($scope, $sailsSocket, $stateParams){
  if($stateParams.page)
    $scope.currentPage = $stateParams.page;
  else
    $scope.currentPage = 1;
  countGaleries = function(){
    $sailsSocket.get("/galerie/count/").success(function(res){
      $scope.totalItems = res.count;
    });
  };
  getGaleries = function(page){
    $sailsSocket.get("/galerie/index/"+page).success(function(res){
      $scope.galeries = res.galeries;
    }).error(function(err){
      console.log(err);
    });
  };
  $scope.delete = function(id){
    $sailsSocket.delete("/galerie/delete/"+id).success(function(galerie){
      getGaleries($scope.currentPage);
      countGaleries();
    }).error(function(err){
      console.log(err);
    });
  };
  countGaleries();
  getGaleries($scope.currentPage);
  $scope.pageChanged = function() {
    getGaleries($scope.currentPage);
  };
}

var galerieShow = function($scope, $sailsSocket, $stateParams){
  $sailsSocket.get("/galerie/show/"+$stateParams.id).success(function(res){
    $scope.galerie = res.galerie;
    $scope.photos = res.photos;
  }).error(function(err){
    console.log(err);
  });
}

var galerieEdit = function($scope, $sailsSocket, $state, $stateParams){
  $sailsSocket.get("/galerie/show/"+$stateParams.id).success(function(res){
    $scope.galerie = res.galerie;
    $scope.photos = res.photos;
  }).error(function(err){
    console.log(err);
  });

  $scope.delete = function(id){
    $sailsSocket.get("/file/delete/"+id).error(function(err){
      console.log(err);
    });
  }

  $scope.edit = function(id){
    $sailsSocket.put("/galerie/edit/"+id,$scope.galerie).success(function(galerie){
      $state.go('galerie.index');
    });
  }

}

var galerieNew = function($scope, $sailsSocket, $state, FileUploader){
  $scope.addPhoto = false;
  $scope.uploader = new FileUploader({
    url: 'file/upload',
    method: 'POST'
  });
  $scope.galerie = {
    title       : '',
    description : '',
    id_cover    : 0
  };
  $scope.placeholder = {
    title: "Titre de la galerie",
    description: "Description de la galerie"
  };
  $scope.create = function(){
    $sailsSocket.post("/galerie/create",$scope.galerie).success(function(galerie){
      $scope.addPhoto = true;
      $scope.uploader.onBeforeUploadItem = function(item){
        item.formData = [{
          id: galerie.id
        }];
      };

    }).error(function(err){
      console.log(err);
    });
  };
  $scope.upload = function(item){
    item.upload();
    $state.go('galerie.index');
  };
  $scope.uploadAll = function(){
    $scope.uploader.uploadAll();
    $state.go('galerie.index');
  };
}

