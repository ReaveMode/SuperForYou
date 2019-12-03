



function loadProduto(item) {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {
            var str = ''
            main = document.getElementById("produto")
            console.log(result)
            for (i in result) {
                if (result[i].nome == item) {
                    str += '<div class = "card"><img class ="productImage" src=' + result[i].imagem + 'style ="width:100%">' +
                        '<h1 class ="productName">' + result[i].nome + '</h1><p class ="price">' + result[i].AvgPrice + '</p>' +
                        '<p>' + result[i].descricao + '</p><p><button id="button3">Add to Cart</button></p></div>'
                }
            }
            main.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })

}