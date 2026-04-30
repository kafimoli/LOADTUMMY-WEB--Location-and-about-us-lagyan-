const menuItems = [
  { name: "Savory Steak & Potato", img: "images/fm1.jpg" },
  { name: "Fresh Beef & Avocado Salad", img: "images/fm2.jpg" },
  { name: "Spicy Dumpling Ramen", img: "images/fm3.JPG" },
  { name: "Smokey Bacon Melt", img: "images/b1.JPG" },
  { name: "Classic Bacon Cheeseburger", img: "images/b2.JPG" },
  { name: "Crispy Chicken Sandwich", img: "images/b3.JPG" },
  { name: "Classic Ground Beef", img: "images/t1.JPG" },
  { name: "Shredded Chicken", img: "images/t2.jpg" },
  { name: "Veggie & Black Bean", img: "images/t3.jpg" },
  { name: "Chocolate Chip Cookie", img: "images/s1.JPG" },
  { name: "Fudgy Chocolate Brownie", img: "images/s2.JPG" },
  { name: "Creamy Chocolate Muffins", img: "images/s3.JPG" },
  { name: "Chilled Coffee Latte", img: "images/d1.jpg" },
  { name: "Fresh Sparkling Lemonade", img: "images/d2.jpg" },
  { name: "Creammy Smoothies", img: "images/d3.jpg" },
];

// Shuffle randomly on every refresh
menuItems.sort(() => Math.random() - 0.5);

let current = 0;
const visible = 4;

function renderCards() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  const shown = menuItems.slice(current, current + visible);
  shown.forEach(item => {
    grid.innerHTML += `
        <div class="menu-card">
          <img src="${item.img}" alt="${item.name}"/>
          <h3>${item.name}</h3>
          <a href = "order.html" class="orderB">Order Now</a>
        </div>`;
  });
}

function slide(direction) {
  current += direction;
  if (current < 0) current = 0;
  if (current + visible > menuItems.length) current = menuItems.length - visible;
  renderCards();
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("home.html")) {
    renderCards();
  }
});

//menu page
const menuData = {
  "Full Meal": [
    { name: "Savory Steak & Potato Power", img: "images/fm1.jpg", price: "99"},
    { name: "Fresh Beef & Avocado Salad", img: "images/fm2.jpg", price: "99" },
    { name: "Spicy Dumpling Ramen", img: "images/fm3.JPG", price: "99"}

  ],
  "Burgers": [
    { name: "Smokey Bacon Melt", img: "images/b1.JPG", price: "99" },
    { name: "Classic Bacon Cheeseburger", img: "images/b2.JPG", price: "99" },
    { name: "Crispy Chicken Sandwich", img: "images/b3.JPG", price: "99" }
  ],
  "Tacos": [
    { name: "Classic Ground Beef", img: "images/t1.JPG", price: "99" },
    { name: "Shredded Chicken", img: "images/t2.jpg", price: "99" },
    { name: "Veggie & Black Bean", img: "images/t3.jpg", price: "99" }
  ],
  "Sweets": [
    { name: "Chocolate Chip Cookies", img: "images/s1.JPG", price: "99" },
    { name: "Fudgy Chocolate Brownies", img: "images/s2.JPG", price: "99" },
    { name: "Creamy Chocolate Muffins", img: "images/s3.JPG", price: "99" }
  ],
  "Drinks": [
    { name: "Chilled Coffee Lattes", img: "images/d1.jpg", price: "99" },
    { name: "Fresh Lemonade Sparklers", img: "images/d2.jpg", price: "99" },
    { name: "Creamy Smoothies", img: "images/d3.jpg", price: "99" }
  ]
};

let currentCategory = "Full Meal";

function filterMenu(category) {
  currentCategory = category;

  // Update active button
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === category) btn.classList.add('active');
  });

  // Update title
  document.getElementById('catTitle').textContent = category;
  document.getElementById('catSubtitle').textContent = 'Category';

  // Render cards
  const cards = document.getElementById('menuCards');
  cards.innerHTML = '';
  menuData[category].forEach(item => {
    cards.innerHTML += `
        <div class="menu-card">
          <img src="${item.img}" alt="${item.name}"/>
          <h3>${item.name}</h3>
          <div class="card-buttons">
            <button class="view-btn" onclick="openModal('${item.img}', '${item.name}', '${category}')">View Item</button>
            <button class="order-btn-card">Order Now</button>
          </div>
        </div>`;
  });
}

function renderMenuCards() {
  const orderMenu = document.getElementById('orderMenuWrapper');
  let html = '';
  for (let category in menuData) {

    html += `
    <h2 class="cat-title" id="catTitle">${category}</h2>
    <p class="cat-subtitle" id="catSubtitle">Category</p>
    <div class = "menu-cards">
    `;
    menuData[category].forEach(item => {
      html += `
        <div class="menu-card">
          <img src="${item.img}" alt="${item.name}"/>
          <h3>${item.name}</h3>
          <h4>Starts at Php 99</h4>
          <div class="card-buttons">
            <button class="view-btn" onclick="addToCart('${item.name}', '${item.img}', '${item.price}')">Add to Cart</button>
            <button class="order-btn-card">Order Now</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  orderMenu.innerHTML = html;
}

//render menu page upon loading
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("order.html")) {
    renderMenuCards();
  }
});

function openModal(img, name, category) {
  document.getElementById('modalImg').src = img;
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalCategory').textContent = category;
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function slideCategory(dir) {
  const tabs = document.getElementById('categoryTabs');
  tabs.scrollLeft += dir * 150;
}
//render menu page upon loading
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("menu.html")) {
    filterMenu('Full Meal');
  }
});
// Load default category


//cart script
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("cartOverlay");

cartBtn.onclick = () => {
  cartPanel.classList.add("active");
  overlay.classList.add("active");
  
};

overlay.onclick = () => {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
};  

let cart = [];

function addToCart(name, img, price){
  const existing = cart.find(item => item.name === name);
  console.log("added");
  if (existing){
    existing.quantity++;
  }else{
    cart.push({name, img, price, quantity: 1});
  }
  renderCart();
}
//RENDER CART
function renderCart(){
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div id="cartItemCard" class="cart-itemcard">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-details">
          <h4>${item.name}</h4>

          <div class="quantity-controls">
            <button class="decrement-btn" data-index="${index}">-</button>
            <p>${item.quantity}</p>
            <button class="increment-btn" data-index="${index}">+</button>
          </div>

          <p id="amount" class="amount">Php ${item.price * item.quantity}</p>
        </div>

      </div>
    `;
  });

  document.querySelectorAll(".increment-btn").forEach(btn => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      cart[index].quantity++;
      renderCart();
    };
  });

  document.querySelectorAll(".decrement-btn").forEach(btn => {
    btn.onclick = () => {
      const index  = btn.dataset.index;

      if (cart[index].quantity > 1){
        cart[index].quantity--;
      }else{
        cart.splice(index,  1);
      }

      renderCart();
    }
  })

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  })

  const totalPriceE1 = document.querySelector(".total-price");
  totalPriceE1.textContent = `Total: Php ${total.toFixed(2)}`;
}

function clearCart(){
  cart = [];
  renderCart();
}
