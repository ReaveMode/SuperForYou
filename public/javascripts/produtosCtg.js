var produto;
window.onload = function(){
    $.ajax({
        url: '/api/produto', //Igual ao que está no app.js
        method: 'get',
        success: function(result,status){
            produto= result;
            console.log(produto);
        },
        error: function(){
            console.log('Error');
        }
    })
}