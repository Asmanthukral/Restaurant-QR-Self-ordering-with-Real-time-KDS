import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const menuData = [
 { id: 1, name: "Paneer Tikka", price: 300, category: "veg" },
 { id: 2, name: "Paneer Pahadi Tikka", price: 325, category: "veg" },
 { id: 3, name: "Malai Tikka", price: 325, category: "veg" },
 { id: 4, name: "Paneer Butter Masala", price: 260, category: "veg" },
 { id: 5, name: "Kadhai Paneer", price: 260, category: "veg" },
 { id: 6, name: "Paneer Tikka Masala", price: 325, category: "veg" },
 { id: 7, name: "Paneer Silbatta", price: 300, category: "veg" },
 { id: 8, name: "Sev Tamatar", price: 130, category: "veg" },
 { id: 9, name: "Dal Fry", price: 130, category: "veg" },
 { id: 10, name: "Dal Tadka", price: 140, category: "veg" },
 { id: 11, name: "Tawa Roti", price: 25, category: "breads" },
 { id: 12, name: "Tandoori Roti", price: 30, category: "breads" },
 { id: 13, name: "Laccha Paratha", price: 50, category: "breads" },
 { id: 14, name: "Butter Naan", price: 50, category: "breads" },
 { id: 15, name: "Garlic Naan", price: 60, category: "breads" },
 { id: 16, name: "Green Salad", price: 80, category: "salad" },
 { id: 17, name: "Chicken Lollipop", price: 219, category: "chinese" },
 { id: 18, name: "Chilli Chicken", price: 249, category: "chinese" },
 { id: 19, name: "Dragon Chicken", price: 259, category: "chinese" },
 { id: 20, name: "Chicken 65", price: 259, category: "chinese" },
 { id: 21, name: "Pepper Chicken", price: 249, category: "chinese" },
 { id: 22, name: "Chicken Fried Rice", price: 199, category: "chinese" },
 { id: 23, name: "Chicken Hakka Noodles", price: 199, category: "chinese" },
 { id: 24, name: "Egg Noodles", price: 129, category: "chinese" },
 { id: 25, name: "Egg Fried Rice", price: 129, category: "chinese" },
 { id: 26, name: "Chicken Roll", price: 129, category: "chinese" },
 { id: 27, name: "Egg Roll", price: 99, category: "chinese" },
 { id: 28, name: "Butter Chicken (Half)", price: 349, category: "chicken" },
 { id: 29, name: "Butter Chicken (Full)", price: 649, category: "chicken" },
 { id: 30, name: "Chicken Masala (Half)", price: 299, category: "chicken" },
 { id: 31, name: "Chicken Masala (Full)", price: 499, category: "chicken" },
 { id: 32, name: "Chicken Silwatta (Half)", price: 349, category: "chicken" },
 { id: 33, name: "Chicken Silwatta (Full)", price: 649, category: "chicken" },
 { id: 34, name: "Tawa Chicken (Half)", price: 349, category: "chicken" },
 { id: 35, name: "Tawa Chicken (Full)", price: 649, category: "chicken" },
 { id: 36, name: "Chicken Kolhapuri (Half)", price: 349, category: "chicken" },
 { id: 37, name: "Chicken Kolhapuri (Full)", price: 649, category: "chicken" },
 { id: 38, name: "Chicken RaRa (Half)", price: 349, category: "chicken" },
 { id: 39, name: "Chicken RaRa (Full)", price: 599, category: "chicken" },
 { id: 40, name: "Bhuna Chicken (Half)", price: 349, category: "chicken" },
 { id: 41, name: "Bhuna Chicken (Full)", price: 649, category: "chicken" },
 { id: 42, name: "Handi Chicken (Half)", price: 299, category: "chicken" },
 { id: 43, name: "Handi Chicken (Full)", price: 499, category: "chicken" },
 { id: 44, name: "Chicken Curry", price: 299, category: "chicken" },
 { id: 45, name: "Chicken Tikka Masala", price: 299, category: "chicken" },
 { id: 46, name: "Kadhai Chicken", price: 299, category: "chicken" },
 { id: 47, name: "Fish Amritsari", price: 499, category: "fish" },
 { id: 48, name: "Fish Masala", price: 499, category: "fish" },
 { id: 49, name: "Fish Curry", price: 499, category: "fish" },
 { id: 50, name: "Mutton Bhuna", price: 399, category: "mutton" },
 { id: 51, name: "Mutton Rogan Josh", price: 449, category: "mutton" },
 { id: 52, name: "Mutton Masala", price: 399, category: "mutton" },
 { id: 53, name: "Mutton Kadhai", price: 429, category: "mutton" },
 { id: 54, name: "Mutton Curry", price: 369, category: "mutton" },
 { id: 55, name: "Mutton Silwatta", price: 449, category: "mutton" },
 { id: 56, name: "Mutton Tawa Masala", price: 449, category: "mutton" },
 { id: 57, name: "Mutton Keema Masala", price: 349, category: "mutton" },
 { id: 58, name: "Mutton Keema Kaleji", price: 399, category: "mutton" },
 { id: 59, name: "Mutton Keema Chaap Masala", price: 449, category: "mutton" },
 { id: 60, name: "Steamed Rice", price: 105, category: "rice" },
 { id: 61, name: "Jeera Rice", price: 130, category: "rice" },
 { id: 62, name: "Chicken Dum Biryani", price: 199, category: "rice" },
 { id: 63, name: "Chicken Tikka Biryani", price: 249, category: "rice" },
 { id: 64, name: "Mutton Dum Biryani", price: 299, category: "rice" },
 { id: 65, name: "Egg Biryani", price: 149, category: "rice" },
 { id: 66, name: "Egg Curry", price: 119, category: "eggs" },
 { id: 67, name: "Egg Masala", price: 149, category: "eggs" },
 { id: 68, name: "Egg Silwatta", price: 169, category: "eggs" },
 { id: 69, name: "Egg Bhurji", price: 99, category: "eggs" },
 { id: 70, name: "Omlette", price: 89, category: "eggs" },
 { id: 71, name: "Chicken Curry + 2 Roti + Rice", price: 219, category: "combo" },
 { id: 72, name: "Egg Curry + 2 Roti + Rice", price: 169, category: "combo" }
];

let cart = [];
let currentFilter = 'all';

// Make functions global so HTML onclick can access them
window.addToCart = function(id) {
    let item = menuData.find(i => i.id === id);
    let existing = cart.find(i => i.id === id);
    if(existing) { existing.qty++; } 
    else { cart.push({...item, qty: 1}); }
    updateUI();
};

window.changeQty = function(id, delta) {
    let item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateUI();
    }
};

function updateUI() {
    let total = cart.reduce((a, b) => a + (b.price * b.qty), 0);
    document.getElementById('cart-total').innerText = `₹${total}`;
    renderMenu(currentFilter === 'all' ? menuData : menuData.filter(i => i.category === currentFilter));
    updateCartList();
}

function updateCartList() {
    let list = document.getElementById('cart-items-list');
    list.innerHTML = cart.length === 0 ? "<p>Cart is empty</p>" : cart.map(i => `
        <div class="cart-item">
            <span>${i.name} (${i.qty})</span>
            <div class="qty-btns">
                <button onclick="changeQty(${i.id}, -1)">-</button>
                <span>${i.qty}</span>
                <button onclick="changeQty(${i.id}, 1)">+</button>
            </div>
        </div>`).join('');
}

window.toggleCart = function() {
    const m = document.getElementById('cart-modal');
    m.style.display = m.style.display === 'block' ? 'none' : 'block';
};

function renderMenu(items) {
    let container = document.getElementById('menu-container');
    container.innerHTML = items.map(item => {
        let cartItem = cart.find(c => c.id === item.id);
        let qty = cartItem ? cartItem.qty : 0;
        return `
          <div class="menu-card">
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price">₹${item.price}</div>
            </div>
            <div>
              ${qty === 0 
                ? `<button class="add-btn" onclick="addToCart(${item.id})">ADD</button>`
                : `<div class="qty-btns">
                     <button onclick="changeQty(${item.id}, -1)">-</button>
                     <span>${qty}</span>
                     <button onclick="changeQty(${item.id}, 1)">+</button>
                   </div>`
              }
            </div>
          </div>
        `;
    }).join('');
}

window.filterMenu = function(cat, el) {
    currentFilter = cat;
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    renderMenu(cat === 'all' ? menuData : menuData.filter(i => i.category === cat));
};

renderMenu(menuData);

// Firebase Config and Order System
const firebaseConfig = {
  apiKey: "AIzaSyBAlnapud2yDq8XqVLSc0j3M1HfBHSXrso",
  authDomain: "restaurant-web-qr.firebaseapp.com",
  projectId: "restaurant-web-qr",
  storageBucket: "restaurant-web-qr.firebasestorage.app",
  messagingSenderId: "123100593096",
  appId: "1:123100593096:web:216f40047477fd7dac5efd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
let tableNum = urlParams.get('table');

if (!tableNum) {
    tableNum = prompt("Kripya apna Table Number darj karein (Jaise: Table 1, Table 4) ya Takeaway likhein:", "Table 1");
    if (!tableNum || tableNum.trim() === "") {
        tableNum = "Takeaway";
    }
}

document.getElementById('table-display').innerText = `Table No: ${tableNum}`;

document.getElementById('place-order-btn').addEventListener('click', async () => {
    if(cart.length === 0) { 
        alert("Cart is empty!"); 
        return; 
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let totalBill = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const orderDataFirebase = {
        table: tableNum,
        items: cart,
        total: totalBill,
        orderTime: timeString,
        paymentStatus: 'Pending',
        status: 'New Order',
        timestamp: Date.now()
    };

    const orderDataMySQL = {
        table_no: tableNum,
        items: cart,
        total_amount: totalBill,
        payment_status: "Paid"
    };

    try {
        await addDoc(collection(db, "orders"), orderDataFirebase);

        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDataMySQL)
        });

        const result = await response.json();
        console.log("MySQL Save Result:", result);

        let itemsListStr = cart.map(i => `• ${i.name} x ${i.qty} (₹${i.price * i.qty})`).join('%0A');
        let whatsappMessage = `*New Order Received!*%0A%0A*Table:* ${tableNum}%0A*Time:* ${timeString}%0A%0A*Items:*%0A${itemsListStr}%0A%0A*Total Bill:* ₹${totalBill}%0A*Payment:* Paid`;
        
        let restaurantWhatsAppNumber = "917415446230"; // Replace with actual restaurant WhatsApp number
        let whatsappURL = `https://api.whatsapp.com/send?phone=${restaurantWhatsAppNumber}&text=${whatsappMessage}`;

        alert("Order Placed Successfully, Saved to DB, & Opening WhatsApp!");
        
        window.open(whatsappURL, '_blank');
        
        cart = [];
        updateCartList();
        updateUI();
        document.getElementById('cart-modal').style.display = 'none';
        
    } catch (e) {
        console.error("Order Error: ", e);
        alert("Error placing order: " + e.message);
    }
});