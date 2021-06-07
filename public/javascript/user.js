
// Signup Function
async function userFormHandler(event) {
    event.preventDefault();

    const user_first_name = document.querySelector('#user_first_name').value.trim();
    const user_last_name = document.querySelector('#user_last_name').value.trim();
    const user_company_name = document.querySelector('#user_company_name').value.trim();
    const user_billing_address = document.querySelector('#user_billing_address').value.trim();
    const user_city = document.querySelector('#user_city').value.trim();
    const user_zipcode = document.querySelector('#user_zipcode').value.trim();
    const auth_id = document.querySelector('#auth_id').value.trim();
    const username = document.querySelector('#username').value.trim();
    const user_email = document.querySelector('#user_email').value.trim();

    const response = await fetch(`/api/users/`, {
    method: 'POST',
    body: JSON.stringify({
        user_first_name,
        user_last_name,
        user_company_name,
        user_billing_address,
        user_city,
        user_zipcode,
        auth_id,
        username,
        user_email
    }),
    headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
        console.log('success');
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.user-form').addEventListener('submit', userFormHandler);
