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

    const response = await fetch(`/api/project`, {
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
            fee_schedule
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    }

    document.location.replace('/profile/4');
}


document.querySelector('.contract-form').addEventListener('submit', contractFormHandler);