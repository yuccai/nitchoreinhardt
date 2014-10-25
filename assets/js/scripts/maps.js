/*
var initialize = function(){
  var latLng = new google.maps.LatLng(
  var myOptions = {
    zoom      : 13,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    maxZoom   : 20
  };

  var map    = new google.maps.Map(document.getElementById('map'), myOptions);
  var geocoder = new google.maps.Geocoder();
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      if($('#meeting_city').val() == '')
      latLng = new google.maps.LatLng(position.coords.latitude,
                                      position.coords.longitude);
      else
      latLng = new google.maps.LatLng($('#meeting_lat').val(),$('#meeting_long').val());
    map.setCenter(latLng);
    $('#meeting_lat').val(latLng.lat());
    $('#meeting_long').val(latLng.lng());
    geocoder.geocode({'latLng': latLng}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          document.getElementById('meeting_city').value = results[0].address_components[2].long_name;
        }
        else {
          alert('No results found');
        }
      }
      else {
        alert('Geocoder failed due to: ' + status);
      }
    });

    var marker = new google.maps.Marker({
      position: latLng,
        map: map,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
      geocoder.geocode({'latLng': event.latLng}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            document.getElementById('meeting_lat').value = results[0].geometry.location.lat();
            document.getElementById('meeting_long').value = results[0].geometry.location.lng();
            document.getElementById('meeting_city').value = results[0].address_components[2].long_name;
          }
          else {
            alert('No results found');
          }
        }
        else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    });
    function codeAdress(){
      var address = $('#meeting_city').val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          document.getElementById('meeting_lat').value = results[0].geometry.location.lat();
          document.getElementById('meeting_long').value = results[0].geometry.location.lng();
          document.getElementById('meeting_city').value = results[0].address_components[0].short_name;
          map.setCenter(results[0].geometry.location);

          marker.setPosition(results[0].geometry.location);
        } else {
          alert("Le geocodage n\'a pu etre effectue pour la raison suivante: " + status);
        }
      });
    };
    $('#search').on("click",codeAdress);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
};

google.maps.event.addDomListener(window, 'load', initialize);
*/

function MapInitializeNew(agenda) {
  var latLng = new google.maps.LatLng(agenda.lat, agenda.long);
  var mapOptions = {
    zoom      : 13,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    maxZoom   : 20
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var geocoder = new google.maps.Geocoder();

  var marker = new google.maps.Marker({
    position: latLng,
      map: map,
      draggable: true
  });

  google.maps.event.addListener(marker, 'dragend', function(event) {
    geocoder.geocode({'latLng': event.latLng}, function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          agenda.lat = results[0].geometry.location.lat();
          agenda.long = results[0].geometry.location.lng();
        }
        else {
          alert('No results found');
        }
      }
      else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  });

  function codeAdress(){
    var address = $('#adress').val();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        agenda.lat = results[0].geometry.location.lat();
        agenda.long = results[0].geometry.location.lng();
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
      } else {
        alert("Le geocodage n\'a pu etre effectue pour la raison suivante: " + status);
      }
    });
  };
  $('#search').on("click",codeAdress);
};

function MapInitializeShow(agenda) {
  var latLng = new google.maps.LatLng(agenda.lat, agenda.long);
  var mapOptions = {
    zoom      : 13,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    maxZoom   : 20
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var geocoder = new google.maps.Geocoder();

  var marker = new google.maps.Marker({
    position: latLng,
      map: map,
      draggable: true
  });
};
