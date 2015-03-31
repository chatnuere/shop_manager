var markerCache
function updateForm(result){
    var cleanAddresses = [];
    var addresses = $.parseHTML(result.adr_address);

    for (var i = 0 ; i< addresses.length; i++) {
        var object = $(addresses[i]);
        cleanAddresses[object.attr('class')] = object.html()
    }

    if(cleanAddresses['street-address']){
        $('#shop_address').val(cleanAddresses['street-address'])
    }else{
        $('#shop_address').val(result.name)
    }
    if(cleanAddresses['postal-code']){
        $('#shop_zip').val(cleanAddresses['postal-code'])
        $('#shop_country_code').val(result.address_components[result.address_components.length - 2].short_name);
    }else{
        $('#shop_zip').val('')
        $('#shop_country_code').val(result.address_components[result.address_components.length - 1].short_name);
    }
    if(cleanAddresses['locality']){
        $('#shop_city').val(cleanAddresses['locality'])
    }else{
        $('#shop_city').val('')
    }
}


function updateMarker( lat , lng){



    handler.removeMarkers(markerCache)

    markerCache = handler.addMarkers([
            {
                lat: lat,
                lng: lng,
                picture: {
                    url: "https://cldup.com/4CrHdVk17l-2000x2000.png",
                    width: 34,
                    height: 34,
                    anchor: [17,17]
                }

            }
        ]);
    handler.resetBounds();
    handler.bounds.extendWith(markerCache);
    handler.fitMapToBounds();
    handler.getMap().setZoom(16);


}

function mapOneMarker() {
    var jsonData =  {lat: 47.0810120, lng: 2.3987820};
    jsonData.zoom = 5;
    var isMarker = false
    if (typeof gon !== 'undefined') {
        if (typeof gon.shop !== 'undefined') {
            console.log(gon.shop)
            jsonData = gon.shop;
            jsonData.zoom = 16;
            isMarker = true
        }
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

        if(isMarker) {
            markerCache = handler.addMarkers([
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


    $("#geocodeAdress").geocomplete().bind("geocode:result", function (event, result) {

        updateForm(result);
        updateMarker(result.geometry.location.k ,result.geometry.location.B )
    });

}