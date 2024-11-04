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
});