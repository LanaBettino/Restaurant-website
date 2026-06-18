// MenuManager.js
document.addEventListener("DOMContentLoaded", function() {
    // Menu Data
    const menuData = {
        burgers: [
            { name: "Classic Beef Burger", desc: "Grilled beef patty with lettuce, tomato, and special sauce", price: 85, image: "Burger.WEBP" },
            { name: "Cheese Burger", desc: "Classic beef with melted cheddar cheese", price: 95, image: "Burger.WEBP" },
            { name: "Bacon Burger", desc: "Beef patty topped with crispy bacon and BBQ sauce", price: 105, image: "Burger.WEBP" },
            { name: "Chicken Burger", desc: "Grilled chicken breast with mayo and fresh veggies", price: 90, image: "Chicken.WEBP" },
            { name: "Veggie Burger", desc: "Plant-based patty with avocado and roasted peppers", price: 80, image: "Burger.WEBP" }
        ],
        pizzas: [
            { name: "Margherita Pizza", desc: "Classic tomato, mozzarella, and fresh basil", price: 120, image: "pizza.jpg" },
            { name: "Pepperoni Pizza", desc: "Loaded with pepperoni and extra cheese", price: 140, image: "pizza.jpg" },
            { name: "BBQ Chicken Pizza", desc: "Grilled chicken, BBQ sauce, and red onions", price: 150, image: "pizza.jpg" },
            { name: "Veggie Supreme", desc: "Bell peppers, mushrooms, olives, and spinach", price: 130, image: "pizza.jpg" }
        ],
        chicken: [
            { name: "Grilled Chicken & Chips", desc: "Juicy grilled chicken with golden fries", price: 99, image: "Chicken.WEBP" },
            { name: "Fried Chicken (6 pcs)", desc: "Crispy fried chicken with dipping sauce", price: 110, image: "Chicken.WEBP" },
            { name: "Chicken Wings (10 pcs)", desc: "Spicy or mild wings with blue cheese dip", price: 95, image: "Chicken.WEBP" },
            { name: "Chicken Wrap", desc: "Grilled chicken, lettuce, and garlic sauce in a tortilla", price: 75, image: "Chicken.WEBP" }
        ],
        pies: [
            { name: "Steak & Ale Pie", desc: "Tender beef in rich ale gravy", price: 65, image: "pie.WEBP" },
            { name: "Chicken & Mushroom Pie", desc: "Creamy chicken with mushrooms", price: 60, image: "pie.WEBP" },
            { name: "Lamb & Rosemary Pie", desc: "Slow-cooked lamb with fresh rosemary", price: 70, image: "pie.WEBP" },
            { name: "Vegetable Pie", desc: "Seasonal vegetables in a savory sauce", price: 55, image: "pie.WEBP" }
        ],
        drinks: [
            { name: "Coca-Cola", desc: "Classic cola (can)", price: 25, image: "Burger.WEBP" },
            { name: "Sprite", desc: "Lemon-lime soda (can)", price: 25, image: "Burger.WEBP" },
            { name: "Fruit Juice", desc: "Fresh orange or apple juice", price: 35, image: "Burger.WEBP" },
            { name: "Milkshake", desc: "Chocolate, vanilla, or strawberry", price: 45, image: "Burger.WEBP" },
            { name: "Coffee", desc: "Freshly brewed hot coffee", price: 30, image: "Burger.WEBP" }
        ]
    };

    // Current state
    let currentCategory = 'all';
    let cart = [];
    let orderTotal = 0;

    // DOM references
    const grid = document.getElementById('menuItemsGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    const searchInput = document.getElementById('searchInput');
    const categoryCards = document.querySelectorAll('.category-card');
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotalDisplay = document.getElementById('orderTotal');

    // Render menu items
    function renderItems(category, searchTerm = '') {
        let items = [];
        let title = '';

        if (category === 'all') {
            // Combine all items
            for (const [cat, catItems] of Object.entries(menuData)) {
                items = items.concat(catItems.map(item => ({ ...item, category: cat })));
            }
            title = 'All Menu Items';
        } else if (menuData[category]) {
            items = menuData[category].map(item => ({ ...item, category: category }));
            const categoryNames = {
                burgers: 'Burgers',
                pizzas: 'Pizzas',
                chicken: 'Chicken',
                pies: 'Pies',
                drinks: 'Drinks'
            };
            title = categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            items = items.filter(item => 
                item.name.toLowerCase().includes(term) || 
                item.desc.toLowerCase().includes(term)
            );
        }

        // Render
        if (items.length === 0) {
            grid.innerHTML = `
                <div class="empty-menu">
                    <i class="fa-regular fa-face-frown"></i>
                    <p>No items found. Try a different search.</p>
                </div>
            `;
            categoryTitle.textContent = title;
            return;
        }

        let html = '';
        items.forEach(item => {
            html += `
                <div class="menu-item-card" data-category="${item.category}">
                    <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='Burger.WEBP'">
                    <div class="item-name">${item.name}</div>
                    <div class="item-desc">${item.desc}</div>
                    <div class="item-price">R${item.price}</div>
                    <div class="item-actions">
                        <button class="btn-add" onclick="addToOrder('${item.name}', ${item.price})">
                            <i class="fa-solid fa-plus"></i> Add
                        </button>
                        <button class="btn-details" onclick="showItemDetails('${item.name}', '${item.desc}', ${item.price})">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
        categoryTitle.textContent = title;
    }

    // Category click handler
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Get category
            const category = this.dataset.category;
            currentCategory = category;

            // Update search placeholder
            const categoryNames = {
                all: 'Search all menu items...',
                burgers: 'Search burgers...',
                pizzas: 'Search pizzas...',
                chicken: 'Search chicken...',
                pies: 'Search pies...',
                drinks: 'Search drinks...'
            };
            searchInput.placeholder = categoryNames[category] || 'Search menu...';

            // Render
            renderItems(category, searchInput.value.trim());
        });
    });

    // Search handler
    searchInput.addEventListener('input', function() {
        renderItems(currentCategory, this.value.trim());
    });

    // Add to order function (global)
    window.addToOrder = function(name, price) {
        // Check if item already in cart
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateOrderDisplay();
    };

    // Remove from cart
    window.removeFromOrder = function(index) {
        cart.splice(index, 1);
        updateOrderDisplay();
    };

    // Update order display
    function updateOrderDisplay() {
        if (cart.length === 0) {
            orderItemsContainer.innerHTML = '<p style="color:#888;">No items added yet</p>';
            orderTotalDisplay.textContent = '0.00';
            orderTotal = 0;
            return;
        }

        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += `
                <div class="order-item">
                    <span>${item.name} (${item.qty})</span>
                    <span>R${itemTotal.toFixed(2)} 
                        <button class="remove-item" onclick="removeFromOrder(${index})">×</button>
                    </span>
                </div>
            `;
        });

        orderItemsContainer.innerHTML = html;
        orderTotalDisplay.textContent = total.toFixed(2);
        orderTotal = total;
    }

    // Show item details (simple alert for now, can be expanded)
    window.showItemDetails = function(name, desc, price) {
        alert(`${name}\n${desc}\nPrice: R${price}`);
    };

    // Override sendOrder to include cart items
    const originalSendOrder = window.sendOrder;
    window.sendOrder = function() {
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const address = document.getElementById('address')?.value || '';

        if (cart.length === 0) {
            alert('Please add items to your order first.');
            return;
        }

        if (!name || !phone || !address) {
            alert('Please fill in your name, phone, and delivery address.');
            return;
        }

        let orderSummary = cart.map(item => 
            `${item.name} x${item.qty} - R${(item.price * item.qty).toFixed(2)}`
        ).join('%0A');

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const message = `NEW ORDER%0A%0A` +
            `Name: ${name}%0A` +
            `Phone: ${phone}%0A` +
            `Address: ${address}%0A%0A` +
            `Items:%0A${orderSummary}%0A%0A` +
            `Total: R${total.toFixed(2)}`;

        const ownerNumber = '0714767516';
        window.open('https://wa.me/' + ownerNumber + '?text=' + message, '_blank');
    };

    // Initial render
    renderItems('all');

    // Set default active category
    document.querySelector('.category-card[data-category="all"]')?.classList.add('active');

    // Add empty menu styles
    const style = document.createElement('style');
    style.textContent = `
        .empty-menu {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: #888;
        }
        .empty-menu i {
            font-size: 3rem;
            color: #333;
            margin-bottom: 16px;
        }
        .empty-menu p {
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
});