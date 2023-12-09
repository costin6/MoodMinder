function displayCalendarDates() {
    const previousDate1Element = document.getElementById('previous-date-1')
    const previousDay1Element = document.getElementById('previous-day-1')
    const previousDate2Element = document.getElementById('previous-date-2')
    const previousDay2Element = document.getElementById('previous-day-2')
    const previousDate3Element = document.getElementById('previous-date-3')
    const previousDay3Element = document.getElementById('previous-day-3')
    const currentDateElement = document.getElementById('current-date');
    const currentDayElement = document.getElementById('current-day')
    const nextDate1Element = document.getElementById('next-date-1')
    const nextDay1Element = document.getElementById('next-day-1')
    const nextDate2Element = document.getElementById('next-date-2')
    const nextDay2Element = document.getElementById('next-day-2')
    const nextDate3Element = document.getElementById('next-date-3')
    const nextDay3Element = document.getElementById('next-day-3')

    const dayInfo = [];
    const currentDate = new Date();

    for (let i = -3; i <= 3; i++) {
        const targetDate = new Date(currentDate);
        targetDate.setDate(targetDate.getDate() + i);

        const day = targetDate.toLocaleDateString('en-US', { weekday: 'short' });
        const date = targetDate.toLocaleDateString('en-US', { day: '2-digit' })

        dayInfo.push({ day, date });
    }

    console.log(dayInfo)
    previousDate3Element.textContent = dayInfo[0].date;
    previousDay3Element.textContent = dayInfo[0].day;
    previousDate2Element.textContent = dayInfo[1].date;
    previousDay2Element.textContent = dayInfo[1].day;
    previousDate1Element.textContent = dayInfo[2].date;
    previousDay1Element.textContent = dayInfo[2].day;
    currentDateElement.textContent = dayInfo[3].date;
    currentDayElement.textContent = dayInfo[3].day;
    nextDate1Element.textContent = dayInfo[4].date;
    nextDay1Element.textContent = dayInfo[4].day;
    nextDate2Element.textContent = dayInfo[5].date;
    nextDay2Element.textContent = dayInfo[5].day;
    nextDate3Element.textContent = dayInfo[6].date;
    nextDay3Element.textContent = dayInfo[6].day;
}

displayCalendarDates();

// Get the container for mood cards on the home page
const moodHistoryContainer = document.getElementById('mood-history-container');
const partnerMoodContainer = document.getElementById('partner-mood-container');
const currentDayEmoji = document.getElementById('current-emoji')

// Function to create a mood card with emoji, username, response, and formatted date
function createMoodCard(container, emoji, username, response) {
    const card = document.createElement('div');
    card.className = 'mood-card';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    const usernameElement = document.createElement('div');
    usernameElement.className = 'username';
    usernameElement.textContent = username;

    const emojiElement = document.createElement('div');
    emojiElement.className = 'emoji-symbol';
    emojiElement.textContent = emoji;

    const dateElement = document.createElement('div');
    dateElement.className = 'date';

    // Format the current date as "dd.MM.yyyy"
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    dateElement.textContent = formattedDate;

    infoContainer.appendChild(usernameElement);
    infoContainer.appendChild(emojiElement);
    infoContainer.appendChild(dateElement);

    const responseElement = document.createElement('p');
    responseElement.className = 'response-text';
    responseElement.textContent = response;

    card.appendChild(infoContainer);
    card.appendChild(responseElement);
    container.appendChild(card);
}

// Function to display partner's moods
function displayPartnerMoods() {
    createMoodCard(partnerMoodContainer, '😁', 'Alaa', 'Happy');
}

// Function to retrieve saved mood data from local storage and create mood cards
function displayMoodHistory() {
    const data = JSON.parse(localStorage.getItem('moodData'));
    if(data[0]){
        currentDayEmoji.textContent = data[0].emoji;    
    }
    if (data) {
        data.forEach((item) => {
            createMoodCard(moodHistoryContainer, item.emoji, 'Costin', item.response);
        });
    }
}

displayPartnerMoods();
displayMoodHistory();