var marker = {};
var control;
var been_routed = true;

window.onload = function () {
    $.ajax({
        url: '/api/produto/store',
        method: 'get',
        success: function (result, status) {
            store = result;
            str = ''
            card = document.getElementById("stores")
            for (i in store) {
                str += '<li onclick="swap(\'' + store[i].nomeSM + '\',' + store[i].Latitude + ',' + store[i].Longitude + ')">' + store[i].nomeSM + '</li>'

            }

            card.innerHTML = str + card.innerHTML

        },

        error: function () {
            console.log('Error');
        }
    })
    $.ajax({
        url: '/api/produto/cart',
        method: 'get',
        success: function (result, status) {
            var id = localStorage.getItem("id")
            cart = result;
            str = ''
            console.log(result)

            card = document.getElementById("prices")
            for (i in cart) {
                if (id == cart[i].idCart)
                var dif = 0.5
                var dif2 = 2
                var dif3 = 4
                if (cart[i].precoTotal < 10) {
                    var PingoDoce = cart[i].precoTotal - dif
                    PingoDoce = Math.round(PingoDoce * 100) / 100
                    var Lidl = cart[i].precoTotal + dif
                    Lidl = Math.round(Lidl * 100) / 100
                } else if (cart[i].precoTotal > 10 && cart[i].precoTotal < 20) {
                    var PingoDoce = cart[i].precoTotal - dif2
                    PingoDoce = Math.round(PingoDoce * 100) / 100
                    var Lidl = cart[i].precoTotal + dif2
                    Lidl = Math.round(Lidl * 100) / 100
                } else if (cart[i].precoTotal > 20 && cart[i].precoTotal < 100) {
                    var PingoDoce = cart[i].precoTotal - dif3
                    PingoDoce = Math.round(PingoDoce * 100) / 100
                    var Lidl = cart[i].precoTotal + dif3
                    Lidl = Math.round(Lidl * 100) / 100
                }
                str = '<li>' + PingoDoce + '</li><li>' + cart[i].precoTotal + '</li><li>' + Lidl + '</li>'

            }

            card.innerHTML = str + card.innerHTML
        },

        error: function () {
            console.log('Error');
        }
    })
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 8);
        var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
        var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(map);
        control = L.Routing.control({
            waypoints: [
                L.latLng(position.coords.latitude, position.coords.longitude),
                L.latLng(38.7753, -9.34193)
            ]

        }).addTo(map);
    })
}






function swap(nome, Lat, Long) {
    console.log(nome + "," + Lat + "," + Long)
    console.log(nome)
    if (Lat !== '') {
        if (nome == "Continente") {
            control.spliceWaypoints(1,1, L.latLng(38.739, -9.39939));
        } else if (nome == "Pingo Doce") {
            control.spliceWaypoints(1,1, L.latLng(38.7753, -9.34193));
        } else if (nome == "Lidl") {
            control.spliceWaypoints(1,1, L.latLng(38.7595, -9.37785));
        }
    }
}




function finish(){
    alert("Thank you for your purchase")
    window.location = "CtgGeneric.html"
}