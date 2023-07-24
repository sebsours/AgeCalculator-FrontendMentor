const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('day_error').innerText = '';
    document.getElementById('month_error').innerText = '';
    document.getElementById('year_error').innerText = '';

    resetCSS();

    // get the user's inputs
    const day = document.getElementById('day_input').value;
    const month = document.getElementById('month_input').value;
    const year = document.getElementById('year_input').value;

    // validating if all fields are nonempty
    if (day === '' || month === '' || year === '') {
        // console.log('This field is required');
        if (day === '') {
            document.getElementById('day_error').innerText = 'This field is required';
            cssDayError();
        }
        if (month === '') {
            document.getElementById('month_error').innerText = 'This field is required';
            cssMonthError();
        }
        if (year === '') {
            document.getElementById('year_error').innerText = 'This field is required';
            cssYearError();
        }
        return;
    }

    const date = new Date();
    // validating inputs for date
    if (day < 1 || day > 31 || month < 1 || month > 12 || year > date.getFullYear() || (year == date.getFullYear() && month - 1 > date.getMonth()) ||
        (year == date.getFullYear() && month - 1 == date.getMonth() && day > date.getDate())) {
        // console.log('Must be a valid day');
        if (day < 1 || day > 31) {
            document.getElementById('day_error').innerText = 'Must be a valid day';
            cssDayError();
        }
        if (month < 1 || month > 12) {
            document.getElementById('month_error').innerText = 'Must be a valid month';
            cssMonthError();
        }
        if (year > date.getFullYear() || (year == date.getFullYear() && month - 1 > date.getMonth()) ||
            (year == date.getFullYear() && month - 1 == date.getMonth() && day > date.getDate())) {
            document.getElementById('year_error').innerText = 'Must be in the past';
            cssDayError();
            cssMonthError();
            cssYearError();
        }
        return;
    }

    // If the day parameter in Date constructor "overflows" into the next month it's an invalid date
    const givenDate = new Date(year, month - 1, day);
    if ((month - 1) != givenDate.getMonth()) {
        document.getElementById('day_error').innerText = 'Must be a valid date';
        cssDayError();
        cssMonthError();
        cssYearError();
        return;
    }


    let year_result = date.getFullYear() - year;
    let month_result = (date.getMonth() + 1) - month;
    let day_result = (date.getDate()) - day;

    // Readjust the number of years and months
    // if given month is after current month OR
    // if given month is the same current month but the day is after the current date 
    if (month_result < 0 || (month_result === 0 && day_result < 0)) {
        year_result--;
        month_result += 12;
    }

    // Readjust number of months and days
    // if given date is after current date
    if (day_result < 0) {
        month_result--;
        day_result += (new Date(date.getFullYear(), date.getMonth(), 0).getDate());
    }

    // Show results in the html
    document.getElementById('result_year').innerText = year_result;
    document.getElementById('result_month').innerText = month_result;
    document.getElementById('result_day').innerText = day_result;

});

function resetCSS() {
    document.getElementById('day_label').style.color = 'hsl(0, 1%, 44%)';
    document.getElementById('day_input').style.borderColor = 'hsl(0, 0%, 86%)';

    document.getElementById('month_label').style.color = 'hsl(0, 1%, 44%)';
    document.getElementById('month_input').style.borderColor = 'hsl(0, 0%, 86%)';

    document.getElementById('year_label').style.color = 'hsl(0, 1%, 44%)';
    document.getElementById('year_input').style.borderColor = 'hsl(0, 0%, 86%)';
}

function cssDayError() {
    document.getElementById('day_label').style.color = 'hsl(0, 100%, 67%)';
    document.getElementById('day_input').style.borderColor = 'hsl(0, 100%, 67%)';
}

function cssMonthError() {
    document.getElementById('month_label').style.color = 'hsl(0, 100%, 67%)';
    document.getElementById('month_input').style.borderColor = 'hsl(0, 100%, 67%)';
}

function cssYearError() {
    document.getElementById('year_label').style.color = 'hsl(0, 100%, 67%)';
    document.getElementById('year_input').style.borderColor = 'hsl(0, 100%, 67%)';
}