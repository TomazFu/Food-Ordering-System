const menuData = {
    'appetizers': [
        { name: 'Spring Rolls', price: 5.99, image: './img/Spring Rolls.jpg', description: 'Crispy vegetable spring rolls served with sweet chili sauce' },
        { name: 'Chicken Wings', price: 8.99, image: './img/Chicken Wings.jpg', description: 'Spicy buffalo wings served with blue cheese dip' },
        { name: 'Bruschetta', price: 6.99, image: './img/Bruschetta.jpg', description: 'Toasted bread topped with fresh tomatoes, garlic, and basil' },
        { name: 'Calamari Rings', price: 9.99, image: './img/Calamari Rings.jpg', description: 'Crispy fried squid rings with marinara sauce' },
        { name: 'Spinach Artichoke Dip', price: 7.99, image: './img/Spinach Artichoke Dip.jpg', description: 'Creamy spinach and artichoke dip with tortilla chips' },
        { name: 'Mozzarella Sticks', price: 6.99, image: './img/Mozzarella Sticks.jpg', description: 'Breaded mozzarella sticks with marinara sauce' },
        { name: 'Nachos Supreme', price: 10.99, image: './img/Nachos Supreme.jpg', description: 'Loaded nachos with cheese, jalapeños, and all the toppings' }
    ],
    'main-course': [
        { name: 'Grilled Salmon', price: 24.99, image: './img/Grilled Salmon.jpg', description: 'Fresh salmon fillet with lemon butter sauce' },
        { name: 'Beef Steak', price: 29.99, image: './img/Beef Steak.jpg', description: 'Premium cut beef steak with mushroom sauce' },
        { name: 'Chicken Alfredo', price: 18.99, image: './img/Chicken Alfredo.jpg', description: 'Creamy pasta with grilled chicken and parmesan' },
        { name: 'Vegetable Curry', price: 16.99, image: './img/Vegetable Curry.jpg', description: 'Mixed vegetables in aromatic curry sauce' },
        { name: 'BBQ Ribs', price: 26.99, image: './img/BBQ Ribs.jpg', description: 'Tender pork ribs with house BBQ sauce' },
        { name: 'Seafood Paella', price: 28.99, image: './img/Seafood Paella.jpg', description: 'Spanish rice dish with mixed seafood' },
        { name: 'Eggplant Parmesan', price: 17.99, image: './img/Eggplant Parmesan.jpg', description: 'Breaded eggplant with marinara and cheese' }
    ],
    'beverages': [
        { name: 'Fresh Lemonade', price: 3.99, image: './img/Fresh Lemonade.jpg', description: 'Freshly squeezed lemonade with mint' },
        { name: 'Iced Tea', price: 2.99, image: './img/Iced Tea.jpg', description: 'House-made iced tea with lemon' },
        { name: 'Mango Smoothie', price: 4.99, image: './img/Mango Smoothie.jpg', description: 'Fresh mango blended with yogurt' },
        { name: 'Espresso', price: 2.99, image: './img/Espresso.jpg', description: 'Double shot of premium espresso' },
        { name: 'Green Tea', price: 2.99, image: './img/Green Tea.jpg', description: 'Japanese green tea' },
        { name: 'Fresh Orange Juice', price: 4.99, image: './img/Fresh Orange Juice.jpg', description: 'Freshly squeezed orange juice' },
        { name: 'Cappuccino', price: 3.99, image: './img/Cappuccino.jpg', description: 'Espresso with steamed milk foam' }
    ],
    'desserts': [
        { name: 'Chocolate Cake', price: 6.99, image: './img/Chocolate Cake.jpg', description: 'Rich chocolate layer cake' },
        { name: 'Cheesecake', price: 7.99, image: './img/Cheesecake.jpg', description: 'New York style cheesecake' },
        { name: 'Tiramisu', price: 8.99, image: './img/Tiramisu.jpg', description: 'Classic Italian coffee-flavored dessert' },
        { name: 'Apple Pie', price: 5.99, image: './img/Apple Pie.jpg', description: 'Warm apple pie with vanilla ice cream' },
        { name: 'Crème Brûlée', price: 8.99, image: './img/Crème Brûlée.jpg', description: 'Classic French custard with caramelized sugar' },
        { name: 'Fruit Tart', price: 7.99, image: './img/Fruit Tart.jpg', description: 'Fresh fruit tart with pastry cream' },
        { name: 'Chocolate Mousse', price: 6.99, image: './img/Chocolate Mousse.jpg', description: 'Light and airy chocolate mousse' }
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