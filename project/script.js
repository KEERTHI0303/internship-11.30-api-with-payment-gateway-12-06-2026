let cart = [];
let totalAmount = 0;

function addToCart(name, price){

    cart.push({
        name:name,
        price:price
    });

    totalAmount += price;

    document.getElementById("cart-count").innerText =
    cart.length;

    displayCart();
}

function displayCart(){

    let list =
    document.getElementById("cart-items");

    list.innerHTML = "";

    cart.forEach(item => {

        let li =
        document.createElement("li");

        li.innerHTML =
        `${item.name} - ₹${item.price}`;

        list.appendChild(li);
    });

    document.getElementById("total").innerText =
    totalAmount;
}

function payNow(){

    if(totalAmount === 0){

        alert("Cart is Empty");
        return;
    }

    let options = {

        key: "rzp_test_T0HMCf6l69Cxdi",

        amount: totalAmount * 100,

        currency: "INR",

        name: "My E-Commerce Store",

        description: "Order Payment",

        handler: function(response){

            alert(
                "Payment Successful\n\nPayment ID: " +
                response.razorpay_payment_id
            );

            cart = [];
            totalAmount = 0;

            displayCart();

            document.getElementById("cart-count")
            .innerText = 0;
        },

        theme:{
            color:"#007bff"
        }
    };

    let rzp = new Razorpay(options);

    rzp.open();
}