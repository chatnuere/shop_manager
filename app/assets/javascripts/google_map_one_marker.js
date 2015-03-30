function mapOneMarker() {
    if(gon.shop){
        jsonData = gon.shop;
        jsonData.zoom = 16;
    }else{
        jsonData =  {lat: 47.0810120, lng: 2.3987820};
        jsonData.zoom = 5;
    }

    var image = {
        url: "https://cldup.com/4CrHdVk17l-2000x2000.png",
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(34, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 32)
    };

    var mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}] ;
    handler = Gmaps.build('Google');
    handler.buildMap({internal: {id: 'one_marker'},
        provider: {
        zoom: jsonData.zoom,
            center: new google.maps.LatLng(jsonData.lat, jsonData.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyle,
            mapTypeControl: false,
            scrollwheel: false,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            }
    }}, function () {

        if(gon.shop) {
            markers = handler.addMarkers([
                {
                    lat: jsonData.lat,
                    lng: jsonData.lng,
                    picture: {
                        url: "https://cldup.com/4CrHdVk17l-2000x2000.png",
                        width: 34,
                        height: 34,
                        anchor: [17,17]
                    }

                }
            ]);
        }
    });
}