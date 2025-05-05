// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Event Handling
    const magicBtn = document.getElementById('magicBtn');
    const hoverZone = document.getElementById('hoverZone');
    const secretMessage = document.getElementById('secretMessage');
    const doubleClickTarget = document.getElementById('doubleClickTarget');

    magicBtn.addEventListener('click', () => {
        magicBtn.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    });

    hoverZone.addEventListener('mouseover', () => {
        hoverZone.style.transform = 'scale(1.1) rotate(5deg)';
    });

    hoverZone.addEventListener('mouseout', () => {
        hoverZone.style.transform = '';
    });

    // Secret keypress (press 'a')
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a') secretMessage.classList.toggle('hidden');
    });

    // Double-click secret
    doubleClickTarget.addEventListener('dblclick', () => {
        doubleClickTarget.textContent = '✨ Poof! Magic activated! ✨';
        setTimeout(() => {
            doubleClickTarget.textContent = 'Double-click for magic';
        }, 2000);
    });

    // Interactive Elements
    const colorSwitch = document.getElementById('colorSwitch');
    colorSwitch.addEventListener('click', () => {
        document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 85%)`;
    });

    // Image Gallery
    const images = document.querySelectorAll('.image-gallery img');
    let currentImage = 0;
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        images[currentImage].classList.add('hidden');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.remove('hidden');
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        images[currentImage].classList.add('hidden');
        currentImage = (currentImage - 1 + images.length) % images.length;
        images[currentImage].classList.remove('hidden');
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
            btn.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${btn.dataset.tab}"]`)
                .classList.add('active');
        });
    });

    // Form Validation
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateForm();
    });

    // Real-time validation
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
    // form validation for real-time feedback
function validateField(input) {
    const error = input.nextElementSibling;
    input.classList.remove('valid', 'invalid');

    if (input.validity.valueMissing) {
        error.textContent = 'This field is required!';
        input.classList.add('invalid');
        return false;
    }
    
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error.textContent = 'Please enter a valid email!';
        input.classList.add('invalid');
        return false;
    }
    
    if (input.type === 'password' && input.value.length < 8) {
        error.textContent = 'Password must be at least 8 characters!';
        input.classList.add('invalid');
        return false;
    }
    
    error.textContent = '';
    input.classList.add('valid');
    return true;
}
});

function validateForm() {
    let isValid = true;
    document.querySelectorAll('input').forEach(input => {
        if (!validateField(input)) isValid = false;
    });
    
    if (isValid) {
        alert('Form submitted successfully! 🎉');
        document.getElementById('signupForm').reset();
    }
}

function validateField(input) {
    const error = input.nextElementSibling;
    
    if (input.validity.valueMissing) {
        error.textContent = 'This field is required!';
        return false;
    }
    
    if (input.type === 'email' && !input.value.includes('@')) {
        error.textContent = 'Please enter a valid email!';
        return false;
    }
    
    if (input.type === 'password' && input.value.length < 8) {
        error.textContent = 'Password must be at least 8 characters!';
        return false;
    }
    
    error.textContent = '';
    return true;
}
// Theme Toggle with localStorage
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    document.getElementById('themeToggle').classList.add('pulse');
    setTimeout(() => {
        document.getElementById('themeToggle').classList.remove('pulse');
    }, 600);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Form Data Persistence
function saveFormData() {
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.getElementById('username').value = savedData.username || '';
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('password').value = savedData.password || '';
    }
}

// Load saved form data on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Save form data while typing
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        saveFormData();
        validateField(input);
    });
});

// Update magic button with animation
document.getElementById('magicBtn').addEventListener('click', function() {
    this.classList.add('pulse');
    setTimeout(() => this.classList.remove('pulse'), 600);
});

// Add animation to form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
            localStorage.removeItem('formData');
        }, 600);
    }
});