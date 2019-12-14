window.onload = function () {
    $.ajax({
        url: '/api/produto/store',
        method: 'get',
        success: function (result, status) {
            var id = this.id;
            store = result;
            str = ''
            card = document.getElementById("stores")
            console.log(result)
            for (i in store) {
                console.log(store)
                str += '<li id= "' + store[i].nomeSM + '" onclick="swap('+store[i].Latitude+','+store[i].Longitude+')">' + store[i].nomeSM + '</li>'
                
            }

            card.innerHTML = str + card.innerHTML

        },

        error: function () {
            console.log('Error');
        }
    })
}


function swap(Lat, Long) {

    console.log(Lat + "," +Long)    




}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 8);
        var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
        var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(map);
        var control = L.Routing.control({
            waypoints: [
                L.latLng(position.coords.latitude, position.coords.longitude),
                L.latLng(38.7753, -9.34193)
            ]

        }).addTo(map);
    })
}