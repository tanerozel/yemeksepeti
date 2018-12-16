(function () {
    prHelper.refreshBasket();
})();

var products = [];
var productx = Service.getProductService().d.ResultSet;

for (let index = 0; index < productx.length; index++) {
    Object.assign(products, productx[index].Products);
}
var productsElement = document.getElementById("products");
var productSearch = function () {
    productsElement.innerHTML = prHelper.loading;
    var searchWord = document.getElementById("search").value.toLowerCase();
    var result = ""
    for (let i = 0; i < products.length; i++) {
        if ((products[i].DisplayName.toLowerCase().includes(searchWord))) {
            prHelper.searchResult(products[i]);
            result += prHelper.searchResult(products[i]);
        }
    }

    productsElement.innerHTML = result;
}