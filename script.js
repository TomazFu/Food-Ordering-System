const menuData = {
    'appetizers': [
        { name: 'Spring Rolls', price: 5.99, image: 'https://images.unsplash.com/photo-1544037803-b17d332fcc90', description: 'Crispy vegetable spring rolls served with sweet chili sauce' },
        { name: 'Chicken Wings', price: 8.99, image: 'https://images.unsplash.com/photo-1608039858788-667850f129d3', description: 'Spicy buffalo wings served with blue cheese dip' },
        { name: 'Bruschetta', price: 6.99, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f', description: 'Toasted bread topped with fresh tomatoes, garlic, and basil' },
        { name: 'Calamari Rings', price: 9.99, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0', description: 'Crispy fried squid rings with marinara sauce' },
        { name: 'Spinach Artichoke Dip', price: 7.99, image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7', description: 'Creamy spinach and artichoke dip with tortilla chips' },
        { name: 'Mozzarella Sticks', price: 6.99, image: 'https://images.unsplash.com/photo-1531749668029-257fe5f3d34f', description: 'Breaded mozzarella sticks with marinara sauce' },
        { name: 'Nachos Supreme', price: 10.99, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d', description: 'Loaded nachos with cheese, jalapeños, and all the toppings' }
    ],
    'main-course': [
        { name: 'Grilled Salmon', price: 24.99, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288', description: 'Fresh salmon fillet with lemon butter sauce' },
        { name: 'Beef Steak', price: 29.99, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e', description: 'Premium cut beef steak with mushroom sauce' },
        { name: 'Chicken Alfredo', price: 18.99, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a', description: 'Creamy pasta with grilled chicken and parmesan' },
        { name: 'Vegetable Curry', price: 16.99, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd', description: 'Mixed vegetables in aromatic curry sauce' },
        { name: 'BBQ Ribs', price: 26.99, image: 'https://images.unsplash.com/photo-1544025162-d76694265947', description: 'Tender pork ribs with house BBQ sauce' },
        { name: 'Seafood Paella', price: 28.99, image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a', description: 'Spanish rice dish with mixed seafood' },
        { name: 'Eggplant Parmesan', price: 17.99, image: 'https://images.unsplash.com/photo-1629115916087-31ca04368013', description: 'Breaded eggplant with marinara and cheese' }
    ],
    'beverages': [
        { name: 'Fresh Lemonade', price: 3.99, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859', description: 'Freshly squeezed lemonade with mint' },
        { name: 'Iced Tea', price: 2.99, image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87', description: 'House-made iced tea with lemon' },
        { name: 'Mango Smoothie', price: 4.99, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4', description: 'Fresh mango blended with yogurt' },
        { name: 'Espresso', price: 2.99, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04', description: 'Double shot of premium espresso' },
        { name: 'Green Tea', price: 2.99, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5', description: 'Japanese green tea' },
        { name: 'Fresh Orange Juice', price: 4.99, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423', description: 'Freshly squeezed orange juice' },
        { name: 'Cappuccino', price: 3.99, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', description: 'Espresso with steamed milk foam' }
    ],
    'desserts': [
        { name: 'Chocolate Cake', price: 6.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', description: 'Rich chocolate layer cake' },
        { name: 'Cheesecake', price: 7.99, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad', description: 'New York style cheesecake' },
        { name: 'Tiramisu', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', description: 'Classic Italian coffee-flavored dessert' },
        { name: 'Apple Pie', price: 5.99, image: 'https://images.unsplash.com/photo-1568571780765-9276235f1e3d', description: 'Warm apple pie with vanilla ice cream' },
        { name: 'Crème Brûlée', price: 8.99, image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3', description: 'Classic French custard with caramelized sugar' },
        { name: 'Fruit Tart', price: 7.99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777', description: 'Fresh fruit tart with pastry cream' },
        { name: 'Chocolate Mousse', price: 6.99, image: '', description: 'Light and airy chocolate mousse' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Menu page elements
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    const orderItems = document.getElementById('order-items');
    const totalPrice = document.getElementById('total-price');
    const clearOrderButton = document.getElementById('clear-order');
    const checkoutButton = document.getElementById('checkout-button');
    let order = [];

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            navLinks.classList.toggle('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuIcon.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Order functionality
    if (addToOrderButtons.length > 0 && orderItems && totalPrice) {
        function updateOrderSummary() {
            orderItems.innerHTML = '';
            let total = 0;

            order.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <div class="item-controls">
                        <span class="price">${item.price.toFixed(2)}</span>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                orderItems.appendChild(li);
                total += item.price;
            });

            totalPrice.textContent = `Total: $${total.toFixed(2)}`;
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = order.length;
                cartCount.classList.toggle('visible', order.length > 0);
            }
            
            if (checkoutButton) {
                checkoutButton.style.display = order.length > 0 ? 'inline-block' : 'none';
            }
        }

        function handleAddToCart(button) {
            // Add loading state
            button.classList.add('loading');
            button.innerHTML = '<i class="fas fa-spinner"></i> Adding...';

            // Remove loading state
            button.classList.remove('loading');
            
            // Show success state
            button.classList.add('success');
            button.innerHTML = '<i class="fas fa-check"></i> Added';

            // Reset button after 1 second
            setTimeout(() => {
                button.classList.remove('success');
                button.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
            }, 1000);
        }

        addToOrderButtons.forEach(button => {
            button.addEventListener('click', function() {
                const foodItem = this.closest('.food-item');
                const name = foodItem.dataset.name;
                const price = parseFloat(foodItem.dataset.price);

                handleAddToCart(this);
                order.push({ name, price });
                updateOrderSummary();
                showToast(`Added ${name} to cart`);
            });
        });

        if (clearOrderButton) {
            clearOrderButton.addEventListener('click', function() {
                order = [];
                if (!confirm('Are you sure you want to clear your cart?')) {
                    return;
                }
                updateOrderSummary();
                alert('Cart cleared');
            });
        }

        if (checkoutButton) {
            checkoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Thank you for your order! Total: $' + order.reduce((sum, item) => sum + item.price, 0).toFixed(2));
                order = [];
                updateOrderSummary();
                window.location.reload(true);
            });
        }

        updateOrderSummary();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add these near the top with other constants
    const cartIcon = document.querySelector('.cart-icon');
    const cartPanel = document.querySelector('.cart-panel');
    const closeCart = document.querySelector('.close-cart');
    const cartCount = document.querySelector('.cart-count');

    // Add this after the existing order functionality
    if (cartIcon && cartPanel && closeCart) {
        cartIcon.addEventListener('click', () => {
            cartPanel.classList.add('open');
        });

        closeCart.addEventListener('click', () => {
            cartPanel.classList.remove('open');
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartPanel.contains(e.target) && !cartIcon.contains(e.target)) {
                cartPanel.classList.remove('open');
            }
        });

        // Instead of redefining updateOrderSummary, just update cart count directly
        if (cartCount) {
            cartCount.textContent = order.length;
        }
    }

    // Add escape key listener to close cart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartPanel) {
            cartPanel.classList.remove('open');
        }
    });

    // Toast notification function
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <span>${message}</span>
        `;
        
        const container = document.querySelector('.toast-container') || document.body;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Newsletter form handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Show success message
            showToast(`Thanks for subscribing! We'll send updates to ${email}`, 'success');
            
            // Reset the form
            emailInput.value = '';
        });
    }

    // Add remove item functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
            const index = e.target.closest('.remove-item').dataset.index;
            const removedItem = order[index];
            order.splice(index, 1);
            updateOrderSummary();
            showToast(`Removed ${removedItem.name} from cart`, 'error');
        }
    });

    function handleImageLoading() {
        const images = document.querySelectorAll('.food-image');
        
        images.forEach(img => {
            img.classList.add('loading');
            
            img.onload = function() {
                img.classList.remove('loading');
            };
            
            img.onerror = function() {
                img.src = '/placeholder.svg?height=150&width=150';
                img.classList.remove('loading');
            };
        });
    }

    // Call this function when the page loads
    document.addEventListener('DOMContentLoaded', handleImageLoading);

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Show success message
            showToast('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Add these new functions for menu category handling
    function createMenuItemElement(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'food-item';
        itemDiv.dataset.name = item.name;
        itemDiv.dataset.price = item.price;

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-image">
            <div class="food-details">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="price-action">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-order">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;

        return itemDiv;
    }

    function showCategory(category) {
        const menuContainer = document.querySelector('.menu-container');
        if (!menuContainer) return;

        // Clear current content
        menuContainer.innerHTML = '';
        
        // Create and append menu items for the selected category
        const items = menuData[category];
        items.forEach(item => {
            const itemElement = createMenuItemElement(item);
            menuContainer.appendChild(itemElement);
        });

        // Add animation class to new items
        setTimeout(() => {
            document.querySelectorAll('.food-item').forEach(item => {
                item.classList.add('show');
            });
        }, 100);

        // Reinitialize add to order buttons
        initializeAddToOrderButtons();
    }

    // Initialize category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                showCategory(button.dataset.category);
            });
        });

        // Show default category (appetizers)
        showCategory('appetizers');
    }

    // Initialize floating cart button
    const cartButton = document.querySelector('.cart-button');

    if (cartButton && cartPanel && closeCart) {
        cartButton.addEventListener('click', () => {
            cartPanel.classList.add('open');
        });

        closeCart.addEventListener('click', () => {
            cartPanel.classList.remove('open');
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartPanel.contains(e.target) && !cartButton.contains(e.target)) {
                cartPanel.classList.remove('open');
            }
        });
    }

    function initializeAddToOrderButtons() {
        const addToOrderButtons = document.querySelectorAll('.add-to-order');
        if (addToOrderButtons.length > 0) {
            addToOrderButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const foodItem = this.closest('.food-item');
                    const name = foodItem.dataset.name;
                    const price = parseFloat(foodItem.dataset.price);

                    handleAddToCart(this);
                    order.push({ name, price });
                    updateOrderSummary();
                    showToast(`Added ${name} to cart`);
                });
            });
        }
    }
});