var contactsIndex = function($scope, $sailsSocket){
  $scope.mail = {
    from      : '',
    name      : '',
    firstname : '',
    subject   : '',
    body      : ''
  };
  $scope.placeholder = {
    from      : 'Email',
    name      : 'Nom',
    firstname : 'Prénom',
    subject   : 'Objet',
    body      : 'Message'
  };
  $scope.sendMail = function(){
    $sailsSocket.post("/contacts/sendMail",$scope.mail).error(function(err){
      console.log(err);
    }).success(function(res){
      console.log($scope.mail);
      $scope.resetForm();
    });
  }

  $scope.resetForm = function(){
    $scope.mail = {
      from      : '',
      name      : '',
      firstname : '',
      subject   : '',
      body      : ''
    };
  }
}
