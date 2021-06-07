
// Signup Function
async function signupFormHandler(event) {
    event.preventDefault();

    const user_first_name = document.querySelector('#user_first_name').value.trim();
    const user_last_name = document.querySelector('#user_last_name').value.trim();
    const user_company_name = document.querySelector('#user_company_name').value.trim();
    const user_billing_address = document.querySelector('#user_billing_address').value.trim();
    const user_city = document.querySelector('#user_city').value.trim();
    const user_zipcode = document.querySelector('#user_zipcode').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
    const username = document.querySelector('#username').value.trim();
    const user_email = document.querySelector('#user_email').value.trim();

    if (username && email && password && firstName && lastName ) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          user_first_name,
          user_last_name,
          user_company_name,
          user_billing_address,
          user_city,
          user_zipcode,
          user_id,
          username,
          user_email
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      // check the response status
      if (response.ok) {
          console.log('success');
      } else {
          alert(response.statusText);
      }
    }
  }

document.querySelector('.user-form').addEventListener('submit', loginFormHandler);
