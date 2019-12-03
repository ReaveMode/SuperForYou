var produto;
var teste;

window.onload = function () {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {

            $(".sub-ctg").click(function (e) {
                e.preventDefault();
                var id = this.id;
                teste = document.getElementById(id).getAttribute("data-value");
                produto = result;
                str = ''
                card = document.getElementById("card")
                for (i in produto) {
                    if (produto[i].categoria == teste) {
                        $('#abc').remove();
                        $("p").remove();
                        console.log(produto[i].categoria + '==' + teste)
                        str += '<div class="card"><img src ="' + produto[i].imagem + '" id ="abc" style="width:100%">' + '<p onclick = "loadProduto(\'' + produto[i].nome + '\')"><a href = "ProductGeneric.html">' + produto[i].nome + '</a></p></div>'
                    }
                }
                card.innerHTML = str + card.innerHTML
            });

        },
        error: function () {
            console.log('Error');
        }
    })
}

function loadProduto(item) {
    var str = ''
    main = document.getElementById("produto")
    for (i in produto) {
        if (produto[i].nome == item) {
            str = '<div class = "card"><img class ="productImage" src=' + produto[i].imagem + 'style ="width:100%">' +
                '<h1 class ="productName">' + produto[i].nome + '</h1><p class ="price">' + produto[i].AvgPrice + '</p>' +
                '<p>' + produto[i].descricao + '</p><p><button id="button3">Add to Cart</button></p></div>'
        }
    }
    main.innerHTML = str
}