var mapLoading = function(){
    function createSidebarLi(json) {
        return ("<li><a>" + json.name + "</a></li>");
    };

    function bindLiToMarker($li, marker) {
        $li.on('click', function () {
            handler.getMap().setZoom(14);
            marker.setMap(handler.getMap()); //because clusterer removes map property from marker
            marker.panTo();
            google.maps.event.trigger(marker.getServiceObject(), 'click');
        })
    };

    function createSidebar(json_array) {
        _.each(json_array, function (json) {
            var $li = $(createSidebarLi(json));
            $li.appendTo('#sidebar_container');
            bindLiToMarker($li, json.marker);
        });
    };

    var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}] ;

    handler = Gmaps.build('Google');
    handler.buildMap({internal: {id: 'sidebar_builder'},
                provider: {
                    zoom:      15,
                    center:    new google.maps.LatLng(53.385873, -1.471471),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles:    mapStyle
                }
            }, function () {
                var json_array = gon.shops

                var markers = handler.addMarkers(json_array);


                _.each(json_array, function (json, index) {
                    json.marker = markers[index];
                });

                createSidebar(json_array);
                handler.bounds.extendWith(markers);
                handler.fitMapToBounds();
            }

    );
}

$(window).bind('page:change', function() {

    mapLoading();

});

