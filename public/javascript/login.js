// async function signupFormHandler(event) {
//     event.preventDefault();

//     const username = document.querySelector('#username-signup').value.trim();
//     const firstName = document.querySelector('#firstname-signup').value.trim();
//     const lastName = document.querySelector('#lastname-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
//     const firstName = document.querySelector('#first_name').value.trim();
//     const lastName = document.querySelector('#last_name').value.trim();

//     if (username && email && password) {
//       const response = await fetch('/api/users', {
//         method: 'post',
//         body: JSON.stringify({
//           username,
//           first_name,
//           last_name,
//           email,
//           password
//         }),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       // check the response status
//       if (response.ok) {
//           console.log('success');
//       } else {
//           alert(response.statusText);
//       }
//     }
//   }

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (email && password) {
    // const response = fetch('/api/users/login', {
    //   method: 'post',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => res.json())
    //   .then(json => { console.log('--------------------------------------'+ JSON.stringify(json)) 
    //   if (json.ok) {document.location.replace('54325432');};
    // });

    // if (response.ok) {
      // console.log("response ok");
      // document.location.replace('/');
    // } else {
    //   alert(response.statusText);
    // }
    document.location.replace('/profile/4');
  }
}

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
