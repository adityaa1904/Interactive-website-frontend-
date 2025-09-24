// Task 4: Interactive Button Logic
const colorChangeBtn = document.getElementById('colorChangeBtn');
const body = document.body;

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

colorChangeBtn.addEventListener('click', () => {
    body.style.backgroundColor = getRandomColor();
});

// Task 5: API Integration Logic
const fetchDataBtn = document.getElementById('fetchDataBtn');
const apiDataContainer = document.getElementById('api-data-container');

fetchDataBtn.addEventListener('click', async () => {
    try {
        fetchDataBtn.textContent = 'Loading...';
        fetchDataBtn.disabled = true;

        // Fetching data from JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=6');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();

        // Clear previous content
        apiDataContainer.innerHTML = '';

        // Dynamically update the DOM
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'bg-gray-50 p-4 border rounded-lg shadow';
            userCard.innerHTML = `
                <h3 class="font-bold text-lg text-blue-700">${user.name}</h3>
                <p class="text-gray-600">${user.email}</p>
                <p class="text-gray-500 text-sm">${user.website}</p>
            `;
            apiDataContainer.appendChild(userCard);
        });

    } catch (error) {
        apiDataContainer.innerHTML = `<p class="text-red-500">Failed to fetch data. ${error.message}</p>`;
        console.error('API Fetch Error:', error);
    } finally {
        fetchDataBtn.textContent = 'Fetch Users';
        fetchDataBtn.disabled = false;
    }
});

// Task 6: Form Validation Logic
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission
    let isValid = true;

    // Reset states
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    formSuccess.classList.add('hidden');
    nameInput.classList.remove('border-red-500');
    emailInput.classList.remove('border-red-500');

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.classList.remove('hidden');
        nameInput.classList.add('border-red-500');
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    }

    if (isValid) {
        formSuccess.classList.remove('hidden');
        console.log('Form Submitted:', { name: nameInput.value, email: emailInput.value });
        contactForm.reset();
    }
});
