document.getElementById('newTimer').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.toggle('show');
});

document.getElementById('hourSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createHourSpecificTimer();
});

document.getElementById('minuteSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createMinuteSpecificTimer();
});

document.getElementById('secondSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createSecondSpecificTimer();
});

document.getElementById('calculateHours').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createYearsMonthsDaysToHours();
});

function createYearsMonthsDaysToHours() {
    createInputCard(['years', 'months', 'days'], (inputs) => {
        let years = parseInt(inputs.years) || 0;
        let months = parseInt(inputs.months) || 0;
        let days = parseInt(inputs.days) || 0;

        // Calculating total hours
        let totalHours = ((years * 365) + (months * 30) + days) * 24;
        alert(`Total Hours: ${totalHours}`);
    }, false);  // Pass false to indicate no title and description
}

function createHourSpecificTimer() {
    createInputCard(['hours', 'minutes', 'seconds'], (inputs) => {
        let hours = parseInt(inputs.hours) || 0;
        let minutes = parseInt(inputs.minutes) || 0;
        let seconds = parseInt(inputs.seconds) || 0;

        if (minutes >= 60 || seconds >= 60) {
            alert('Minutes and seconds should be less than 60.');
            return;
        }

        let time = (hours * 3600) + (minutes * 60) + seconds;
        createTimerCard(time, inputs.title, inputs.description);
    });
}

function createMinuteSpecificTimer() {
    createInputCard(['minutes', 'seconds'], (inputs) => {
        let minutes = parseInt(inputs.minutes) || 0;
        let seconds = parseInt(inputs.seconds) || 0;

        if (seconds >= 60) {
            alert('Seconds should be less than 60.');
            return;
        }

        let time = (minutes * 60) + seconds;
        createTimerCard(time, inputs.title, inputs.description);
    });
}

function createSecondSpecificTimer() {
    createInputCard(['seconds'], (inputs) => {
        let seconds = parseInt(inputs.seconds) || 0;
        createTimerCard(seconds, inputs.title, inputs.description);
    });
}

function createInputCard(fields, callback, includeTitleAndDescription = true) {
    let inputCard = document.createElement('div');
    inputCard.classList.add('input-card');

    let inputs = {};

    // Conditionally include title and description fields
    if (includeTitleAndDescription) {
        // Title input
        let titleLabel = document.createElement('label');
        titleLabel.textContent = 'Enter Timer Title:';
        inputCard.appendChild(titleLabel);

        let titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        inputCard.appendChild(titleInput);

        // Description input
        let descLabel = document.createElement('label');
        descLabel.textContent = 'Enter Timer Description:';
        inputCard.appendChild(descLabel);

        let descTextarea = document.createElement('textarea');
        descTextarea.id = 'description';
        inputCard.appendChild(descTextarea);

        inputs.title = titleInput;
        inputs.description = descTextarea;
    }

    // Time inputs
    fields.forEach(field => {
        let label = document.createElement('label');
        label.textContent = `Enter ${field}:`;
        inputCard.appendChild(label);

        let input = document.createElement('input');
        input.type = 'number';
        input.id = field;
        inputCard.appendChild(input);

        inputs[field] = input;
    });

    // Submit button
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', function () {
        let inputValues = {};

        if (includeTitleAndDescription) {
            inputValues.title = inputs.title.value || 'Untitled Timer';
            inputValues.description = inputs.description.value || 'No Description';
        }

        fields.forEach(field => {
            inputValues[field] = inputs[field].value;
        });

        inputCard.remove();  // Remove the input fields
        callback(inputValues);  // Pass the values to the callback
    });
    inputCard.appendChild(submitButton);

    document.getElementById('timers').appendChild(inputCard);
}
