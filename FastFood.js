// === Cart System ===
let cart = [];

// === Add to Order ===
function addToOrder(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateOrderDisplay();
}

// === Remove from Order ===
function removeFromOrder(index) {
    cart.splice(index, 1);
    updateOrderDisplay();
}

// === Clear Order ===
function clearOrder() {
    if (cart.length > 0) {
        if (confirm('Are you sure you want to clear your order?')) {
            cart = [];
            updateOrderDisplay();
        }
    }
}

// === Update Order Display ===
function updateOrderDisplay() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');

    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="empty-order">No items added yet</p>';
        orderTotal.textContent = '0.00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="order-item">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x${item.qty}</span>
                <span class="item-price">R${itemTotal.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromOrder(${index})">×</button>
            </div>
        `;
    });

    orderItems.innerHTML = html;
    orderTotal.textContent = total.toFixed(2);
}

// === Send Order via WhatsApp ===
function sendOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const deliveryOption = document.getElementById('deliveryOption').value;

    // Check if cart has items
    if (cart.length === 0) {
        alert('Please add items to your order first.');
        return;
    }

    // Validate customer info
    if (!name) {
        alert('Please enter your full name.');
        document.getElementById('name').focus();
        return;
    }
    if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number (minimum 10 digits).');
        document.getElementById('phone').focus();
        return;
    }
    if (deliveryOption === 'delivery' && !address) {
        alert('Please enter your delivery address.');
        document.getElementById('address').focus();
        return;
    }

    // Build order summary
    let orderSummary = cart.map(item => 
        `${item.name} x${item.qty} - R${(item.price * item.qty).toFixed(2)}`
    ).join('%0A');

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryText = deliveryOption === 'delivery' ? `Delivery Address: ${address}` : 'Collection';

    const message = `NEW ORDER%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `${deliveryText}%0A%0A` +
        `Items:%0A${orderSummary}%0A%0A` +
        `Total: R${total.toFixed(2)}`;

    const ownerNumber = '0714767516';
    window.open('https://wa.me/' + ownerNumber + '?text=' + message, '_blank');
}

// === Bill Calculator (kept for compatibility) ===
function calculateTotal() {
    let qty = parseInt(document.getElementById('qty').value) || 0;
    let total = qty * 99;
    document.getElementById('billOutput').innerHTML = 'Total Amount: R' + total;
}

// === Contact Form ===
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("result").innerHTML = "Thank you for contacting us!";
        });
    }
});

// === Hero Image Slideshow ===
const heroImages = ["Burger.WEBP", "pizza.jpg", "Chicken.WEBP", "pie.WEBP"];
let current = 0;
setInterval(function() {
    current++;
    if (current >= heroImages.length) current = 0;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)),url('" + heroImages[current] + "')";
    }
}, 4000);

// === Reviews System ===
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('ratingValue');
    const ratingText = document.getElementById('ratingText');
    const reviewForm = document.getElementById('reviewForm');
    const customerName = document.getElementById('customerName');
    const reviewText = document.getElementById('reviewText');
    const charCount = document.getElementById('charCount');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const averageScore = document.querySelector('.average-score');
    const reviewCount = document.querySelector('.review-count');

    let selectedRating = 0;

    if (stars.length) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                setRating(value);
            });
            star.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    const value = parseInt(this.getAttribute('data-value'));
                    highlightStars(value);
                }
            });
            star.addEventListener('mouseleave', function() {
                if (selectedRating === 0) resetStars();
                else highlightStars(selectedRating);
            });
        });
    }

    function setRating(value) {
        selectedRating = value;
        ratingInput.value = value;
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= value) {
                star.classList.add('active');
                star.className = 'fa-solid fa-star active';
            } else {
                star.classList.remove('active');
                star.className = 'fa-regular fa-star';
            }
        });
        const labels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
        ratingText.textContent = labels[value] || 'Select a rating';
        ratingText.style.color = '#f8b400';
    }

    function highlightStars(value) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= value) {
                star.className = 'fa-solid fa-star';
                star.style.color = '#f8b400';
            } else {
                star.className = 'fa-regular fa-star';
                star.style.color = '#ddd';
            }
        });
    }

    function resetStars() {
        stars.forEach(star => {
            star.className = 'fa-regular fa-star';
            star.style.color = '#ddd';
        });
        ratingText.textContent = 'Select a rating';
        ratingText.style.color = '#6c757d';
    }

    if (reviewText) {
        reviewText.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (selectedRating === 0) {
                ratingText.textContent = ' Please select a rating';
                ratingText.style.color = '#dc3545';
                return;
            }
            if (!customerName.value.trim() || !reviewText.value.trim()) return;

            const reviewData = {
                name: customerName.value.trim(),
                rating: selectedRating,
                text: reviewText.value.trim(),
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            };
            saveReview(reviewData);
            addReviewToContainer(reviewData);
            resetForm();
            updateAverageRating();
            showSuccess();
        });
    }

    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.unshift(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        if (reviews.length === 0) {
            showEmptyState();
        } else {
            reviews.forEach(review => addReviewToContainer(review));
            updateAverageRating();
        }
    }

    function addReviewToContainer(review) {
        const emptyState = document.querySelector('.empty-reviews');
        if (emptyState) emptyState.remove();

        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <h4>${escapeHtml(review.name)}</h4>
                <span class="review-stars">${stars}</span>
            </div>
            <p class="review-text">${escapeHtml(review.text)}</p>
            <small class="review-meta"> ${review.date}</small>
        `;
        reviewsContainer.insertBefore(card, reviewsContainer.firstChild);
    }

    function showEmptyState() {
        reviewsContainer.innerHTML = `
            <div class="empty-reviews">
                <i class="fa-regular fa-comment-dots"></i>
                <p>No reviews yet. Be the first to share your experience!</p>
            </div>
        `;
    }

    function updateAverageRating() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        if (reviews.length === 0) {
            averageScore.textContent = '0.0';
            reviewCount.textContent = '(0 reviews)';
            return;
        }
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avg = (total / reviews.length).toFixed(1);
        averageScore.textContent = avg;
        reviewCount.textContent = `(${reviews.length} reviews)`;
    }

    function showSuccess() {
        successMessage.classList.add('show');
        submitBtn.disabled = true;
        setTimeout(() => {
            successMessage.classList.remove('show');
            submitBtn.disabled = false;
        }, 3000);
    }

    function resetForm() {
        customerName.value = '';
        reviewText.value = '';
        charCount.textContent = '0';
        selectedRating = 0;
        ratingInput.value = '0';
        resetStars();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadReviews();
});