async function contractFormHandler(event) {
    event.preventDefault();

    const client_first_name = document.querySelector('#client_first_name').value.trim();
    const client_last_name = document.querySelector('#client_last_name').value.trim();
    const client_email_address = document.querySelector('#client_email_address').value.trim();
    const client_company_name = document.querySelector('#client_company_name').value.trim();
    const client_billing_address = document.querySelector('#client_billing_address').value.trim();
    const client_city = document.querySelector('#client_city').value.trim();
    const client_zipcode = document.querySelector('#client_zipcode').value.trim();
    const project_start_date = document.querySelector('#project_start_date').value.trim();
    const project_completion_date = document.querySelector('#project_completion_date').value.trim();
    const total_price_of_project = document.querySelector('#total_price_of_project').value.trim();
    const project_title = document.querySelector('#project_title').value.trim();
    const project_description = document.querySelector('#project_description').value.trim();
    const fee_schedule = document.querySelector('#fee_schedule').value.trim();
    const user_first_name = document.querySelector('#user_first_name').value.trim();
    const user_last_name = document.querySelector('#user_last_name').value.trim();
    const user_id = req.session.passport.user.user_id;
    const username = req.session.passport.user._json.nickname;

    const response = await fetch(`/api/projects/`, {
        method: 'POST',
        body: JSON.stringify({
            client_first_name,
            client_last_name,
            client_email_address,
            client_company_name,
            client_billing_address,
            client_city,
            client_zipcode,
            project_start_date,
            project_completion_date,
            total_price_of_project,
            project_title,
            project_description,
            fee_schedule,
            user_first_name,
            user_last_name,
            user_id,
            username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }


document.querySelector('.contract-form').addEventListener('submit', contractFormHandler);


// const contractForm = document.querySelector('.contract-form');

// contractForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);

//     fetch('/api/projects/', {
//         method: 'post',
//         body: formData
//     }).then(function (response) {
//         return response.text();
//     }).then(function (text) {
//         console.log(text);
//     }).catch(function (error) {
//         console.error(error);
//     })
// });