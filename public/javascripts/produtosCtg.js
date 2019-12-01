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
                        str += '<img src ="' + produto[i].imagem + '" id ="abc" style="width:100%">' + '<p><a href = "ProductGeneric.html">' + produto[i].nome + '</a></p>'
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