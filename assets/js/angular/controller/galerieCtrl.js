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

var galerieEdit = function($scope, $sailsSocket, $state, $stateParams, PictureUploader){
  $scope.uploader = new PictureUploader({
    url: 'picture/upload',
    method: 'POST'
  });
  get = function(id){
    $sailsSocket.get("/galerie/show/"+id).success(function(res){
      $scope.galerie = res.galerie;
      $scope.photos = res.photos;
    }).error(function(err){
      if(err)
        console.log(err);
    });
  }
  get($stateParams.id);

  $scope.delete = function(id){
    $sailsSocket.get("/picture/delete/"+id).success(function(galerie){
        get($stateParams.id);
    }).error(function(err){
        console.log(err);
    });
  }

  $scope.edit = function(id){
    $sailsSocket.put("/galerie/edit/"+id,$scope.galerie).success(function(galerie){
      $state.go('galerie.index');
    });
  }

  $scope.uploader.onBeforeUploadItem = function(item){
    item.formData = [{
      id: $stateParams.id
    }];
  }

  $scope.uploader.onSuccessItem = function(){
    get($stateParams.id);
  };
  $scope.upload = function(item){
    item.upload();
  };
  $scope.uploadAll = function(){
    $scope.uploader.uploadAll();
  };
}

var galerieNew = function($scope, $sailsSocket, $state, PictureUploader){
  $scope.addPhoto = false;
  $scope.uploader = new PictureUploader({
    url: 'picture/upload',
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

