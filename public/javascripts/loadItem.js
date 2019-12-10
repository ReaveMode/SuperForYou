


window.onload = function loadProduto(item) {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {
            var str = ''
            var saved = localStorage.getItem("storageName");
            alert(saved)
            produto = result;
            main = document.getElementById("produto")
            var getClicked = saved;
            localStorage.setItem("storedClick", getClicked);
            for (i in produto) {
                if (produto[i].nome == saved) {
                    str = '<div class = "card"><img id ="productImage" src=' + produto[i].imagem + 'style ="width:100%">' +
                        '<h1 class ="productName">' + produto[i].nome + '</h1><p id ="price">Avg Price: ' + produto[i].AvgPrice + '€</p>' +
                        '<p>' + produto[i].descricao + '</p><p><button type="button" id="button3" onclick = addToCartClicked(\'' + produto[i].nome + '\')>Add to Cart</button></p></div>'

                }
            }
            main.innerHTML = str
        }


    });
}




function addToCartClicked(name) {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {
            var str = ''
            var name = localStorage.getItem("storedClick");
            alert('added ' + name)
            produto = result;
            addItemToCart();
        }

    });
}