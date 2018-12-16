var prHelper = {
    loading: function (status) {
        return '<img src="assets/load.svg" alt="Loading"> ';
    },
    searchResult: function (product) {
        return (
            `
            <div class="box">
            <div class="product-image">
              <img src="https://cdn0.iconfinder.com/data/icons/black-logistics-icons/256/Add_product_arrow.png" />
            </div>
            <div class="prod-info">
              <div class="product-name">${product.DisplayName}</div>
              <div class="product-price">${product.ListPrice} ₺</div>
              <div class="add-basket" onclick="prHelper.addBasket('${product.ProductId}','${product.DisplayName}','${product.ListPrice}')">Sepete Ekle</div>
            </div>
          </div>
            `
        )
    },
    getBasketProducts: function () {
        return JSON.parse(localStorage.getItem("baskets"));
    },

    addBasket: function (ProductId, Name, ListPrice) {
        var products = this.getBasketProducts();

        if (products) {

            var addProd = false;
            products.map((item) => {
                if (item.productId === ProductId) {
                    item.totalPrice = parseFloat(item.totalPrice) + parseFloat(ListPrice);
                    item.count = parseInt(item.count) + 1;
                    addProd = true;
                }

            })

            if (!addProd) {
                products.push({
                    productId: ProductId,
                    totalPrice: parseFloat(ListPrice),
                    productName: Name,
                    count: 1
                });
            }

            localStorage.setItem("baskets", JSON.stringify(products));
        }
        else {
            products = [];
            products.push({
                productId: ProductId,
                totalPrice: parseFloat(ListPrice),
                productName: Name,
                count: 1
            });
            localStorage.setItem("baskets", JSON.stringify(products))
        }

        this.refreshBasket();
    },
    removeBasket: function (ProductId) {
        var products = this.getBasketProducts();
        products.map((item, index) => {
            if (item.productId === ProductId) {
                products.splice(index, 1)
            }

        })
        localStorage.setItem("baskets", JSON.stringify(products));

        this.refreshBasket();

    },
    refreshBasket() {
        var products = this.getBasketProducts()
        var basketsTable = document.getElementById("basketsTable");
        var element = "";
        products.map((item) => {
            element += this.addBasketItemElement(item);
        });
        basketsTable.innerHTML = element;

    },
    addBasketItemElement(product) {
        return `<tr>
        <td>${product.productName}</td>
        <td>${product.count}</td>
        <td>${product.totalPrice.toFixed(2)}₺</td>
        <td style="cursor:pointer" onclick="prHelper.removeBasket('${product.productId}')">Sil</td>
      </tr>`
    }
}

window.prHelper = prHelper;