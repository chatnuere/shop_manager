
function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
function createSidebarLi(json) {
        return ('<li>' +
                    '<div>' +
                        '<ul>' +
                            '<li>' +
                                '<a href="/shops/'+ json.id +'">' +
                                    '<i class="icon-chain"></i>' +
                                    '<p>'+json.chain + ' ' +json.name+'</p>' +
                                '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a class="show" href="javascript:void(0);">' +
                                    '<i class="icon-location"></i>' +
                                    '<p>'+json.address +'</p>' +
                                '</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="tel:'+json.phone +'">' +
                                    '<i class="icon-phone"></i>' +
                                    '<p>'+json.phone +'</p>' +
                                '</a>' +
                            '</li>' +
                        '</ul>' +
                        '<ul>' +
                            '<li>' +
                            '<a href="/shops/'+ json.id +'/edit" class="icon-edit"></a>' +
                        '</li>' +
                            '<li>' +
                            '<a data-method="delete" href="/shops/'+json.id+'" rel="nofollow" class="icon-cancel-1 delete"></a>'+
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</li>'
        );
    };

    function bindLiToMarker($li, marker) {
        $li.on('click', '.show', function () {
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
function mapLoading() {
    var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}] ;
    handler = Gmaps.build('Google');
    handler.buildMap({
        internal: {id: 'sidebar_builder'},
        provider: {
            zoom: 15,
            center: new google.maps.LatLng(53.385873, -1.471471),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyle,
            mapTypeControl: false,
            scrollwheel: false
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
    });

    if (getUrlParameter('searchType') == 'range') {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': decodeURIComponent(getUrlParameter('search'))}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var circles = handler.addCircles(
                    [{
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                        radius: (parseInt(getUrlParameter('number')) * 1000)
                    }],
                    {strokeColor: '#fff', strokeOpacity: 0.2, strokeWeight: 1, fillColor: "#fff", fillOpacity: 0.1}
                );
                handler.bounds.extendWith(circles);
            } else {
                alert("Something got wrong " + status);
            }
        });
    }

    $('#sidebar_container').on('click', '.show', function () {
        $('html, body').animate({
            scrollTop: $('#sidebar_builder').offset().top - 75
        }, 300);
    });
};


