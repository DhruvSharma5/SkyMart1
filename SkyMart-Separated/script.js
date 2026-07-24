/* ---------------- PRODUCT DATA ---------------- */
const CATEGORY_META = {
  'Electronics': { emoji: '💻' },
  'Clothing': { emoji: '👕' },
  'Furniture': { emoji: '🛋️' },
  'Home': { emoji: '🏠' },
  'Sports': { emoji: '🏀' },
  'Accessories': { emoji: '🎒' },
};

const RAW = [
  ['Laptop', 'Electronics', 799.99, '💻', '#1a1a1a', 'top'],
  ['Smartphone', 'Electronics', 699.99, '📱', '#222'],
  ['Wireless Headphones', 'Electronics', 49.99, '🎧', '#000', 'top'],
  ['Smartwatch', 'Electronics', 159.99, '⌚', '#333'],
  ['Bluetooth Speaker', 'Electronics', 99.99, '🔊', '#e8b923', 'new'],
  ['Tablet', 'Electronics', 329.99, '📱', '#d6d6d6'],
  ['Gaming Console', 'Electronics', 599.99, '🎮', '#c98a8a', 'top'],
  ['DSLR Camera', 'Electronics', 299.99, '📷', '#d6d6d6', 'new'],
  ['Power Bank', 'Electronics', 29.99, '🔋', '#444'],
  ['Wireless Mouse', 'Electronics', 19.99, '🖱️', '#eee'],
  ['Mechanical Keyboard', 'Electronics', 149.99, '⌨️', '#d8d8d8', 'top'],
  ['Monitor', 'Electronics', 349.99, '🖥️', '#1a1a1a', 'top'],
  ['Router', 'Electronics', 59.99, '📶', '#333'],
  ['Drone', 'Electronics', 449.99, '🚁', '#222'],
  ['Action Camera', 'Electronics', 179.99, '🎥', '#111'],
  ['Portable SSD', 'Electronics', 89.99, '💾', '#555'],
  ['Smart Bulb', 'Electronics', 14.99, '💡', '#fff2c8'],
  ['Cotton T-Shirt', 'Clothing', 24.99, '👕', '#f0f0f0', 'new'],
  ['Denim Jacket', 'Clothing', 59.99, '🧥', '#4a6a8a'],
  ['Office Chair', 'Furniture', 129.99, '🪑', '#333'],
  ['Wooden Dining Table', 'Furniture', 199.99, '🍽️', '#e8dcc8', 'top'],
  ['Bookshelf', 'Furniture', 89.99, '📚', '#8a6a4a'],
  ['Table Lamp', 'Home', 34.99, '💡', '#f0e0b0'],
  ['Ceramic Vase', 'Home', 199.99, '🏺', '#8a7a6a', 'new'],
  ['Throw Pillow', 'Home', 19.99, '🛋️', '#c98a8a'],
  ['Wall Clock', 'Home', 24.99, '🕰️', '#e0e0e0'],
  ['Scented Candle Set', 'Home', 22.99, '🕯️', '#f0d0a0'],
  ['Cutlery Set', 'Home', 39.99, '🍴', '#c0c0c0'],
  ['Non-stick Pan', 'Home', 27.99, '🍳', '#333'],
  ['Bath Towel Set', 'Home', 29.99, '🧺', '#a8d0e8'],
  ['Coffee Mug Set', 'Home', 18.99, '☕', '#e8dcc8'],
  ['Storage Basket', 'Home', 21.99, '🧺', '#c9a877'],
  ['Curtain Set', 'Home', 44.99, '🪟', '#8ab0a8'],
  ['Door Mat', 'Home', 15.99, '🚪', '#7a5a3a'],
  ['Photo Frame', 'Home', 12.99, '🖼️', '#d0d0d0'],
  ['Indoor Plant Pot', 'Home', 17.99, '🪴', '#5a7a4a'],
  ['Yoga Mat', 'Sports', 19.99, '🧘', '#8ac9a8'],
  ['Dumbbell Set', 'Sports', 49.99, '🏋️', '#333'],
  ['Football', 'Sports', 24.99, '⚽', '#111'],
  ['Cricket Bat', 'Sports', 39.99, '🏏', '#c9a877'],
  ['Running Shoes', 'Sports', 69.99, '👟', '#e0e0e0'],
  ['Resistance Bands', 'Sports', 14.99, '🎗️', '#c98a8a'],
  ['Skipping Rope', 'Sports', 9.99, '🪢', '#333'],
  ['Water Bottle', 'Sports', 34.99, '🧴', '#1e5c3a', 'new'],
  ['Leather Wallet', 'Accessories', 29.99, '👛', '#5a3a2a'],
  ['Sunglasses', 'Accessories', 44.99, '🕶️', '#222'],
  ['Backpack', 'Accessories', 54.99, '🎒', '#3a4a5a'],
  ['Wrist Watch', 'Accessories', 89.99, '⌚', '#111'],
  ['Belt', 'Accessories', 24.99, '➰', '#3a2a1a'],
  ['Cap', 'Accessories', 17.99, '🧢', '#8a2a2a'],
];

const PRODUCTS = RAW.map((r, i) => ({
  id: 'p' + i, name: r[0], category: r[1], price: r[2], emoji: r[3], color: r[4], tag: r[5] || null
}));

/* ---------------- STATE ---------------- */
const cart = {}; // id -> qty
const filterState = { cat: 'All', tag: null, search: '' };
let currentUserName = 'Dhruv Sharma';
let paymentMethod = 'upi';
let activeProductId = null;

/* ---------------- NAVIGATION ---------------- */
function showView(id) {
  window.scrollTo(0, 0);
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
function goPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.mainnav a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + page).classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'shop') renderShop();
}

function togglePw(id) {
  const p = document.getElementById(id);
  p.type = p.type === 'password' ? 'text' : 'password';
}
function toggleAuthForm(which) {
  document.getElementById('signin-form').style.display = which === 'signin' ? 'block' : 'none';
  document.getElementById('signup-form').style.display = which === 'signup' ? 'block' : 'none';
}
function firstName(full) { return full.trim().split(' ')[0] || full; }

function signIn() {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  const err = document.getElementById('signin-error');
  if (!email || !pass) { err.classList.add('show'); return; }
  err.classList.remove('show');
  currentUserName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Guest';
  applyUserName();
  showView('dashboard-view'); goPage('home');
}
function signUp() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-password').value.trim();
  const err = document.getElementById('signup-error');
  if (!name || !email || !pass) { err.classList.add('show'); return; }
  err.classList.remove('show');
  currentUserName = name;
  applyUserName();
  showToastMsg('🎉 Account created! Welcome, ' + firstName(name));
  showView('dashboard-view'); goPage('home');
}
function applyUserName() {
  document.getElementById('nav-username').textContent = currentUserName;
  document.getElementById('nav-avatar').textContent = currentUserName.charAt(0).toUpperCase();
  document.getElementById('home-username').textContent = firstName(currentUserName) + '!';
}
function signOut() {
  showView('login-view');
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('signin-error').classList.remove('show');
  toggleAuthForm('signin');
  showToastMsg('✅ Logged out. See you soon! 👋');
}

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToastMsg(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------------- PROFILE MENU ---------------- */
function toggleProfileMenu() {
  document.getElementById('profile-menu').classList.toggle('show');
}
function closeProfileMenu() {
  document.getElementById('profile-menu').classList.remove('show');
}
document.addEventListener('click', function (e) {
  const wrap = document.querySelector('.user-pill-wrap');
  if (wrap && !wrap.contains(e.target)) closeProfileMenu();
});

/* ---------------- HOME RENDER ---------------- */
function renderHomeCategories() {
  const grid = document.getElementById('home-cat-grid');
  grid.innerHTML = Object.keys(CATEGORY_META).map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length;
    return `<button class="cat-card" onclick="selectCategory('${cat}')">
        <div class="emoji">${CATEGORY_META[cat].emoji}</div>
        <div class="cname">${cat}</div>
        <div class="ccount">${count} items</div>
      </button>`;
  }).join('');
}
function prodRow(p) {
  return `<div class="prod-row">
      <div class="prod-thumb" style="background:${p.color};" onclick="openProduct('${p.id}')">${p.emoji}</div>
      <div class="prod-name" onclick="openProduct('${p.id}')">${p.name}</div>
      <div class="prod-price">$${p.price.toFixed(2)}</div>
      <button class="add-btn ${cart[p.id] ? 'added' : ''}" onclick="addToCart('${p.id}')">🛍</button>
    </div>`;
}
function renderHomePanels() {
  document.getElementById('home-top-rated').innerHTML = PRODUCTS.filter(p => p.tag === 'top').map(prodRow).join('');
  document.getElementById('home-new-arrivals').innerHTML = PRODUCTS.filter(p => p.tag === 'new').map(prodRow).join('');
}
function selectCategory(cat) {
  filterState.cat = cat; filterState.tag = null; filterState.search = '';
  document.getElementById('search-input') && (document.getElementById('search-input').value = '');
  goPage('shop');
}
function seeAll(tag) {
  filterState.cat = 'All'; filterState.tag = tag; filterState.search = '';
  goPage('shop');
}

/* ---------------- SHOP RENDER ---------------- */
function renderChips() {
  const cats = ['All', ...Object.keys(CATEGORY_META)];
  document.getElementById('chip-row').innerHTML = cats.map(c =>
    `<button class="chip ${filterState.cat === c ? 'active' : ''}" onclick="setCategoryFilter('${c}')">${c}</button>`
  ).join('');
}
function setCategoryFilter(cat) {
  filterState.cat = cat; filterState.tag = null;
  renderShop();
}
function clearTagFilter() {
  filterState.tag = null;
  renderShop();
}
function onSearch() {
  filterState.search = document.getElementById('search-input').value.trim().toLowerCase();
  renderShop();
}
function renderShop() {
  renderChips();
  const banner = document.getElementById('filter-banner');
  if (filterState.tag) {
    banner.classList.add('show');
    document.getElementById('filter-banner-text').textContent =
      'Showing: ' + (filterState.tag === 'top' ? '⭐ Top Rated' : '⚡ New Arrivals');
  } else {
    banner.classList.remove('show');
  }
  const list = PRODUCTS.filter(p =>
    (filterState.cat === 'All' || p.category === filterState.cat) &&
    (!filterState.tag || p.tag === filterState.tag) &&
    (!filterState.search || p.name.toLowerCase().includes(filterState.search))
  );
  const grid = document.getElementById('shop-grid');
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="big-ico">🔍</div>No products match this filter.</div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
      <div class="shop-card">
        <div class="shop-thumb" style="background:${p.color};" onclick="openProduct('${p.id}')">${p.emoji}</div>
        <div class="scat">${p.category}</div>
        <div class="sname" onclick="openProduct('${p.id}')">${p.name}</div>
        <div class="sfoot">
          <div class="sprice">$${p.price.toFixed(2)}</div>
          ${cart[p.id]
      ? `<div class="qty-ctrl">
                 <button onclick="changeQty('${p.id}',-1)">−</button>
                 <span>${cart[p.id]}</span>
                 <button onclick="changeQty('${p.id}',1)">+</button>
               </div>`
      : `<button class="shop-add" onclick="addToCart('${p.id}')">🛍 Add</button>`
    }
        </div>
      </div>
    `).join('');
}

/* ---------------- PRODUCT DETAIL MODAL ---------------- */
function descFor(p) {
  return `Premium quality ${p.name.toLowerCase()} from our ${p.category} collection. Carefully selected for durability, everyday comfort, and honest value — backed by SkyMart's price-match guarantee.`;
}
function openProduct(id) {
  activeProductId = id;
  const p = PRODUCTS.find(x => x.id === id);
  document.getElementById('pd-thumb').style.background = p.color;
  document.getElementById('pd-thumb').textContent = p.emoji;
  document.getElementById('pd-cat').textContent = p.category;
  document.getElementById('pd-name').textContent = p.name;
  document.getElementById('pd-price').textContent = '$' + p.price.toFixed(2);
  document.getElementById('pd-desc').textContent = descFor(p);
  renderProductAddBtn();
  document.getElementById('cart-overlay').classList.remove('show');
  document.getElementById('product-overlay').classList.add('show');
}
function renderProductAddBtn() {
  const p = PRODUCTS.find(x => x.id === activeProductId);
  const btn = document.getElementById('pd-add-btn');
  if (!p) return;
  if (cart[p.id]) {
    btn.textContent = `In cart (${cart[p.id]}) · Add another`;
  } else {
    btn.textContent = 'Add to Cart';
  }
  btn.onclick = () => { addToCart(p.id); renderProductAddBtn(); };
}
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}
function closeOverlayOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}

/* ---------------- CART LOGIC ---------------- */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  const p = PRODUCTS.find(x => x.id === id);
  showToastMsg('🛍 Added "' + p.name + '" to cart');
  refreshAll();
}
function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  refreshAll();
  if (activeProductId === id) renderProductAddBtn();
}
function removeItem(id) {
  delete cart[id];
  refreshAll();
}
function cartTotals() {
  let items = 0, value = 0;
  Object.keys(cart).forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    items += cart[id];
    value += cart[id] * p.price;
  });
  return { items, value };
}
function refreshAll() {
  const { items, value } = cartTotals();
  document.getElementById('stat-cart-items').textContent = items;
  document.getElementById('stat-cart-value').textContent = '$' + value.toFixed(2);
  const badge = document.getElementById('cart-badge');
  if (items > 0) { badge.style.display = 'flex'; badge.textContent = items; }
  else { badge.style.display = 'none'; }
  renderHomePanels();
  if (document.getElementById('page-shop').classList.contains('active')) renderShop();
  renderCartPanel();
}

function renderCartPanel() {
  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="big-ico">🛒</div>Your cart is empty.<br>Go add something nice!</div>`;
    foot.style.display = 'none';
    return;
  }
  foot.style.display = 'block';
  body.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    return `<div class="cart-item">
        <div class="thumb" style="background:${p.color};" onclick="openProduct('${id}')">${p.emoji}</div>
        <div class="info" onclick="openProduct('${id}')">
          <div class="name">${p.name}</div>
          <div class="price">$${p.price.toFixed(2)}</div>
        </div>
        <div class="qty-ctrl">
          <button onclick="changeQty('${id}',-1)">−</button>
          <span>${cart[id]}</span>
          <button onclick="changeQty('${id}',1)">+</button>
        </div>
        <button class="remove" onclick="removeItem('${id}')">✕</button>
      </div>`;
  }).join('');
  const { value } = cartTotals();
  document.getElementById('cart-total').textContent = '$' + value.toFixed(2);
}

function openCart() {
  renderCartPanel();
  document.getElementById('cart-overlay').classList.add('show');
}
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('show');
}
function closeCartOutside(e) {
  if (e.target.id === 'cart-overlay') closeCart();
}

/* ---------------- CHECKOUT ---------------- */
function selectPayment(method) {
  paymentMethod = method;
  ['upi', 'card', 'cod'].forEach(m => document.getElementById('pay-' + m).classList.toggle('active', m === method));
}
function renderCheckoutSummary() {
  const { items, value } = cartTotals();
  const delivery = value >= 999 ? 0 : (value > 0 ? 49 : 0);
  document.getElementById('co-summary').innerHTML = `
      <div class="row"><span>Items (${items})</span><span>$${value.toFixed(2)}</span></div>
      <div class="row"><span>Delivery</span><span>${delivery === 0 ? 'Free' : '$' + delivery.toFixed(2)}</span></div>
      <div class="row total"><span>Total</span><span>$${(value + delivery).toFixed(2)}</span></div>
    `;
}
function openCheckout() {
  if (Object.keys(cart).length === 0) { showToastMsg('🛒 Your cart is empty'); return; }
  closeCart();
  document.getElementById('co-name').value = currentUserName || '';
  renderCheckoutSummary();
  document.getElementById('checkout-error').classList.remove('show');
  document.getElementById('checkout-overlay').classList.add('show');
}
function placeOrder() {
  const name = document.getElementById('co-name').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const err = document.getElementById('checkout-error');
  if (!name || !address) { err.classList.add('show'); return; }
  err.classList.remove('show');
  Object.keys(cart).forEach(k => delete cart[k]);
  closeModal('checkout-overlay');
  refreshAll();
  showToastMsg('🎉 Order placed! Paying via ' + paymentMethod.toUpperCase() + ' — thanks for shopping with SkyMart.');
}

/* ---------------- ABOUT PAGE FAQ ---------------- */
function toggleFaq(el) {
  el.classList.toggle('open');
}

/* ---------------- INIT ---------------- */
renderHomeCategories();
renderHomePanels();
refreshAll();