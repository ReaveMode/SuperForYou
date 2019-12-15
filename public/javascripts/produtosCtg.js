var produto;
var teste;
var total;
var title;
var yeet;
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
                        $('#yeetus').remove();
                        console.log(produto[i].categoria + '==' + teste)
                        str += '<div class="card"><img src ="' + produto[i].imagem + '" id ="abc" style="width:100%">' + '<p id = "yeetus" onclick = "loadProduto(\'' + produto[i].nome + '\')"><a>' + produto[i].nome + '</a></p></div>'

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
function getMaxId() {
  
}

function loadProduto(item) {
    $.ajax({
        url: '/api/produto',
        method: 'get',
        success: function (result, status) {
            var str = '';
            produto = result;
            main = document.getElementById("produto")
            for (i in produto) {
                if (produto[i].nome == item) {
                    str = '<div class = "card1"><img id ="productImage" src=' + produto[i].imagem + 'style ="width:"100" height:"100"">' +
                        '<h1 id = "nome" data-value = "' + produto[i].nome + '" class ="shop-item-title">' + produto[i].nome + '</h1><p class="shop-item-price" data-value = "' + produto[i].AvgPrice + '" id ="price">Avg Price: ' + produto[i].AvgPrice + '€</p>' +
                        '<p>' + produto[i].descricao + '</p><p><button type="button" class="btn btn-primary shop-item-button" id="button3">Add to Cart</button></p></div>'

                }
            }
            main.innerHTML = str
            ready();

        }
    });
    $.ajax({
        url: '/api/produto/id',
        method: 'get',
        success: function (result, status) {    
        console.log(result[0].ID)
        yeet = result[0].ID + 1
        console.log(yeet)
        localStorage.setItem("id", yeet);
        }
    });
    
}

function ready() {
    console.log("test")
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}



function purchaseClicked() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var produtos = '';
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        produtos = title
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    console.log(total);
    console.log(produtos)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    
    $.ajax({
        url: "/api/produto/compra",
        method: "post",
        data: {
            id: yeet,
            produto: produtos,
            preco: total,
            date: String(today),

        },
        success: function (res, status) {
            console.log('Success')

        },
        error: function () {
            console.log("Error on post")
        }
    });
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement

    title = document.getElementById("nome").getAttribute("data-value");
    var price = document.getElementById("price").getAttribute("data-value");


    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

