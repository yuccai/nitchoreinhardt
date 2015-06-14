var adminLogin = function($scope, $sailsSocket, $stateParams, $rootScope){
  $scope.admin = {
    email: '',
    password: ''
  };
  $scope.placeholder = {
    email: 'email',
    password: 'mot de passe'
  };

  $scope.login = function(){
    $sailsSocket.post("/admin/login",$scope.admin).success(function(admin){
      $rootScope.logged = true;
    }).error(function(err){
      console.log(err);
    });
  };
};

var adminNew = function($scope, $sailsSocket, $stateParams){
  $scope.admin = {
    email     : '',
    password1 : '',
    passwordr2: ''
  };

  $scope.placeholder = {
    email     : 'email',
    password1 : 'mot de passe',
    password2 : 'confirmation du mot de passe'
  };

  var matchPassword = function(){
    if($scope.admin.password1 != '')
      return $scope.admin.password1 == $scope.admin.password2;
    else
      return false;
  };

  $scope.create = function(){
    $sailsSocket.post('/admin/create', $scope.admin).success(function(admin){
    }).error(function(err){
      console.log(err);
    });
  };
};
