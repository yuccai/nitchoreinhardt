// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function(){
  //####### DISPLAY ARROWS #########
  var displayArrow = function(){
    var container_height = parseFloat($('.container').css('height'));
    var arrow_height = parseFloat($('.right-arrow').css('height'));
    $('.left-arrow').css('top', container_height/2 - arrow_height/2 + 'px');
    $('.right-arrow').css('top', container_height/2 - arrow_height/2 + 'px');
  };

  $('.right-arrow').on('mouseover', function(){
    $('.right-arrow').clearQueue();
    $('.right-arrow').fadeTo(500,1);
  });
  $('.right-arrow').on('mouseout', function(){
    $('.right-arrow').clearQueue();
    $('.right-arrow').fadeTo(500,0);
  });
  $('.left-arrow').on('mouseover', function(){
    $('.left-arrow').clearQueue();
    $('.left-arrow').fadeTo(500,1);
  });
  $('.left-arrow').on('mouseout', function(){
    $('.left-arrow').clearQueue();
    $('.left-arrow').fadeTo(500,0);
  });



  //######## INIT #########
  var nav = $('nav a');
  var i,j;
  var tab_number = 6;
  var current_tab;
  var tabName = ['presentation','agenda','albums','galerie','contacts','livredor'];

  var init = function(){
    displayArrow();
    nav = $('nav a');
    var url = location.href;
    for(i=0;i<tab_number;i++)
      if(url.search(tabName[i]) != -1)
        current_tab = i;
    $(nav[current_tab]).css('text-decoration','underline');
    Number.prototype.mod = function(n) {
      return ((this%n)+n)%n;
    };
  }

  init();

  //###### SWITCH TAB #######
  var match_tab = function(i){
    var res;
    switch(i){
      case 0: res = 'presentation';
        break;
      case 1: res = 'agenda';
        break;
      case 2: res = 'albums';
        break;
      case 3: res = 'galerie';
        break;
      case 4: res = 'contacts';
        break;
      case 5: res = 'livredor/';
        break;
      default: res = '/';
    }
    location.href = '#/'+res;
    displayArrow();
  };

  nav.each(function(i){
    $(this).on('click', function(){
      $(nav[current_tab]).css('text-decoration','none');
      current_tab = i;
      $(nav[current_tab]).css('text-decoration','underline');
      match_tab(current_tab);
    });
  });
  var switchTab_right = function(){
    $(nav[current_tab]).css('text-decoration','none');
    current_tab++;
    current_tab = (current_tab).mod(tab_number);
    $(nav[current_tab]).css('text-decoration','underline');
    match_tab(current_tab);
  };
  var switchTab_left = function(){
    $(nav[current_tab]).css('text-decoration','none');
    current_tab-=1;
    current_tab = (current_tab).mod(tab_number);
    $(nav[current_tab]).css('text-decoration','underline');
    match_tab(current_tab);
  };

  //###### SWITCH TAB ON ARROWS #######
  $('.right-arrow').on('click', switchTab_right);
  $('.left-arrow').on('click', switchTab_left);

  //###### SWITCH TAB ON KEYBOARD #######
  $(window).keydown(function(e){
    if(e.which == '37')
      switchTab_left();
    if(e.which == '39')
      switchTab_right();
  });

  //####### MUSIC PLAYER #########
  var music = document.getElementById('music');
  $('.glyphicon-play').on('click', function(){
    music.play();
    $('.glyphicon-play').css('display', 'none');
    $('.glyphicon-pause').fadeTo(400,1);
  });
  $('.glyphicon-pause').on('click', function(){
    music.pause();
    $('.glyphicon-play').fadeTo(400,1);
    $('.glyphicon-pause').css('display', 'none');
  });
});


