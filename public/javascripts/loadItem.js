


window.onload = function loadProduto(item) {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {
            var str = ''
            var bunda = localStorage.getItem("storageName");
            alert(bunda)
            produto = result;
            main = document.getElementById("produto")
            for (i in produto) {
                if (produto[i].nome == bunda) {
                    str = '<div class = "card"><img class ="productImage" src=' + produto[i].imagem + 'style ="width:100%">' +
                        '<h1 class ="productName">' + produto[i].nome + '</h1><p class ="price">Avg Price: ' + produto[i].AvgPrice + '€</p>' +
                        '<p>' + produto[i].descricao + '</p><p><button id="button3">Add to Cart</button></p></div>'
                }
            }
            main.innerHTML = str
        }

    });
}