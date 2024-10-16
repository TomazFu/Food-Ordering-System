document.addEventListener('DOMContentLoaded', function() {
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
    animateOnScroll(); // Initial check on page load

    function updateOrderSummary() {
        orderItems.innerHTML = '';
        let total = 0;

        order.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            orderItems.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = `Total: $${total.toFixed(2)}`;
        
        // Show/hide checkout button based on order status
        if (order.length > 0) {
            checkoutButton.style.display = 'inline-block';
        } else {
            checkoutButton.style.display = 'none';
        }
    }

    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodItem = this.closest('.food-item');
            const name = foodItem.dataset.name;
            const price = parseFloat(foodItem.dataset.price);

            order.push({ name, price });
            updateOrderSummary();

            // Add animation to the button
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 500);

            // Animate order summary
            orderItems.lastElementChild.classList.add('animate-on-scroll');
            orderItems.lastElementChild.classList.add('show');
        });
    });

    clearOrderButton.addEventListener('click', function() {
        order = [];
        updateOrderSummary();
    });

    checkoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Thank you for your order! Total: $' + order.reduce((sum, item) => sum + item.price, 0).toFixed(2));
        order = [];
        updateOrderSummary();
    });

    // Initialize order summary
    updateOrderSummary();

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simulate form submission (replace with actual form submission logic)
            console.log('Form submitted:', formValues);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
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

});