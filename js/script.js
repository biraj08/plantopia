const barmenu = document.querySelector('.nav-bar');
let navbars = document.querySelector('#menu-bar');
let header3 = document.querySelector('.header-3');
let scrollTop = document.querySelector('.scroll-top');
document.querySelector("#menu-bar").onclick = () => {
        navbars.classList.toggle('fa-times');
        barmenu.classList.toggle('active');
        cart.classList.remove('active');
    }
    /*
    barmenu.addEventListener('click',()=>{
        navbars.classList.toggle('fa-times');
        barmenu.classList.toggle('active');
    })
    */

window.onscroll = () => {

    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
    if (window.scrollY > 250) {
        header3.classList.add('active');
    } else {
        header3.classList.remove('active');
    }
    if (window.scrollY > 250) {
        scrollTop.style.display = 'initial';
    } else {
        scrollTop.style.display = 'none';
    }

}


window.onload = () => {
    cart.classList.remove('active');
    userlogin.classList.remove('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
    cartItems = []; // Clear the cartItems array
    updateCart(); // Update the cart display to reflect an empty cart
}



const userlogin = document.querySelector('.login-form-container');
document.querySelector('#login-btn ').onclick = () => {
    userlogin.classList.toggle('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');
    cart.classList.remove('active');
}
const closeLogin = document.querySelector('.login-form-container');
document.querySelector('#close-login-btn').onclick = () => {
    closeLogin.classList.remove('active');

}
let cart = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () => {
    cart.classList.toggle('active');
    navbars.classList.remove('fa-times');
    barmenu.classList.remove('active');

}
let swiper = new Swiper(".home-slider", {

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});
let countDate = new Date('june 1, 2023 00:00:00').getTime();

function countDown() {

    let now = new Date().getTime();

    gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

}

setInterval(function() {
    countDown();
}, 1000)

// Get cart container and product cards
const cartContainer = document.querySelector('.cart-items-container');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Array to store cart items
let cartItems = [];

// Function to update the cart display
function updateCart() {
    cartContainer.innerHTML = ''; // Clear cart
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times" onclick="removeFromCart('${item.id}')"></span>
            <img src="${item.image}" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Function to add item to cart
function addToCart(event) {
    const productCard = event.target.closest('.box');
    const productId = productCard.getAttribute('data-product-id');
    const productName = productCard.getAttribute('data-product-name');
    const productPrice = parseFloat(productCard.getAttribute('data-product-price'));
    const quantity = parseInt(productCard.querySelector('.quantity').value);
    const productImage = productCard.querySelector('img').src;

    // Check if item already exists in cart, if so, update quantity
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({ id: productId, name: productName, price: productPrice, quantity: quantity, image: productImage });
    }

    // Update cart display
    updateCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

// Attach event listeners to all 'Add to Cart' buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});


function updateCart() {
    cartContainer.innerHTML = ''; // Clear cart
    let totalPrice = 0;
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times" onclick="removeFromCart('${item.id}')"></span>
            <img src="${item.image}" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    // Add total price at the bottom of the cart
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-price');
    totalDiv.innerHTML = `<h1 style="color: green;" >Total: $${totalPrice.toFixed(2)} </h1>`;
    cartContainer.appendChild(totalDiv);

    

    
}



