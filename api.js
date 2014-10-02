var base_url = 'https://api.digitalriver.com/v1/shoppers/';
var apiKey = window.localStorage.getItem('apiKey');
var siteID = window.localStorage.getItem('siteID');
var accessToken;


// Look at Products
function getProducts() {
    $.ajax({
        url: base_url + 'me/products?apiKey=' + apiKey + '&expand=all&pageSize=3&format=json',
        dataType: 'jsonp',
        success: function(results) {
            displayUrl(this.url);
            $.each(results.products.product, function(i, item) {
                $(".results").append("<tr><td>" + item.displayName + "</td><td>" + item.pricing.formattedListPrice + "</td><td>" + item.id +"</td><td>" + "<input type='button' value='Add Product to Cart' onClick='addToCart(" + item.id +")'></br> " + "</td></tr>");
            });
        },
    });
}

// Add a product to cart by DR product ID
function addToCart(addProductId) {
    $.ajax({
        url: base_url + 'me/carts/active/line-items?format=json&method=post&productId=' + addProductId + '&token=' + accessToken,
        dataType: 'jsonp',
        success: function(results) {
            displayUrl(this.url);
        },
        error: function(results) {
            alert("failed");
        },
    });
}

// Show contents of the current shopping cart
function getCurrentCart() {
    $.ajax({
        url: base_url + 'me/carts/active?format=json&expand=lineitems.lineItem.product.sku&method=get&token=' + window.localStorage.getItem('accessToken'),
        dataType: 'jsonp',
        success: function(results){
            displayUrl(this.url);
            var cart = results;
            $('.results').empty();
            console.log(results);
            $.each(results.cart.lineItems.lineItem, function(indexOne, firstLevel) {
                $('.results').append("Product: ", firstLevel.product.displayName, " ", "Quantity: ", firstLevel.quantity, "</br>", "SKU: ", firstLevel.product.sku, "</br>");
            });
            $('.results').append("</br>", "Total: ", cart.cart.pricing.formattedOrderTotal);
        },
        error: function(results) {
            console.log(results);
        }
    });
}

// Get Anonymous Shopping Token and Store in Browser Storage
function getAnonToken() {
    $.ajax({
        url: 'https://store.digitalriver.com/store/' + siteID + '/SessionToken?apiKey=' + apiKey + '&format=json',
        dataType: 'jsonp',
        success: function(results){
            displayUrl(this.url);
            window.localStorage.setItem('accessToken', results.access_token);
            accessToken = window.localStorage.getItem('accessToken');
        }
    });
}

//WebCheckout
function checkout()
{
    window.open(base_url + 'me/carts/active/web-checkout?token=' + accessToken);

}


// Display the Request URL on the Page for Reference
function displayUrl(requestUrl) {
    $('#apiCall').empty();
    $('#apiCall').append("API URL: ", requestUrl);
}

// Change Shopper Locale
function changeLocale(locale) {
    $.ajax({
        url: base_url + 'me?format=json&method=post&locale=' + locale + '&token=' + accessToken,
        dataType: 'jsonp',
        success: function(results){
            console.log('Locale Updated!');
        }
    });
}

// Update API Key and Site ID
function updateApiKey() {
    apiKey = document.getElementById("apiKey").value;
    window.localStorage.setItem('apiKey', apiKey);
    siteID = document.getElementById("siteID").value;
    window.localStorage.setItem('siteID', siteID);
};