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
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require gmaps/google
//= require_tree .


$(document).on('page:change', function () {
    if( $('#sidebar_builder').length >0) {
         mapLoading();
    }

    if($('#one_marker').length >0){
        mapOneMarker();
    }

    $('body').on('click', '.delete', function(e){
        if (!confirm("Êtes vous sûr de voulir supprimer ce magasin?")) {
            return false
        }
    })

    $("#geocomplete").geocomplete();

    $('.formBtn').on('click', function(){
        $('#the_form').toggleClass('active');
    });
});

