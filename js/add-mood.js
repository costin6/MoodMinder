// Get all the emoji buttons
const emojiButtons = document.querySelectorAll('.emoji-btn');

// Get the modal and its components
const modal = document.querySelector('.modal-mood');
const closeButton = document.querySelector('.close');
const modalEmoji = document.getElementById('modal-emoji');
const responseInput = document.getElementById('response');
const submitButton = document.getElementById('submit');

// Function to save the response and emoji to local storage
function saveData(emoji, response) {
    // Check if the data key exists in local storage
    let data = localStorage.getItem('moodData');
    if (!data) {
        data = [];
    } else {
        data = JSON.parse(data);
    }

    // Add the current data to the list
    data.push({ emoji, response });

    // Save the updated list to local storage
    localStorage.setItem('moodData', JSON.stringify(data));
}

// Event listener to open the modal
emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const emoji = button.getAttribute('data-emoji');
        modal.style.display = 'block';
        modalEmoji.textContent = `${emoji} Why do you feel this way? `;

        // Event listener to submit the response and save it
        submitButton.addEventListener('click', () => {
            const response = responseInput.value;
            saveData(emoji, response);

            // Close the modal
            modal.style.display = 'none';
            responseInput.value = '';

            window.location.href = 'HomePage.html';
        });
    });
});

// Event listener to close the modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
