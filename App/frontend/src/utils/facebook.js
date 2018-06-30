export function loadSDK() {
  const id = 'facebook-jssdk';
  const fjs = document.getElementsByTagName('script')[0];

  if (document.getElementById(id)) {
    return;
  }

  const js = document.createElement('script');
  js.id = id;
  js.src = 'https://connect.facebook.net/ko_KR/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}

export function getLoginStatus() {
  if (!window.FB) {
    return Promise.reject();
  }

  return new Promise((resolve) => {
    window.FB.getLoginStatus((response) => {
      console.log(response);
      resolve();
      // if (response.status === 'connected') {
      //   // The user is logged in and has authenticated your
      //   // app, and response.authResponse supplies
      //   // the user's ID, a valid access token, a signed
      //   // request, and the time the access token
      //   // and signed request each expire.
      //   const uid = response.authResponse.userID;
      //   const accessToken = response.authResponse.accessToken;
      // } else if (response.status === 'authorization_expired') {
      //   // The user has signed into your application with
      //   // Facebook Login but must go through the login flow
      //   // again to renew data authorization. You might remind
      //   // the user they've used Facebook, or hide other options
      //   // to avoid duplicate account creation, but you should
      //   // collect a user gesture (e.g. click/touch) to launch the
      //   // login dialog so popup blocking is not triggered.
      // } else if (response.status === 'not_authorized') {
      //   // The user hasn't authorized your application.  They
      //   // must click the Login button, or you must call FB.login
      //   // in response to a user gesture, to launch a login dialog.
      // } else {
      //   // The user isn't logged in to Facebook. You can launch a
      //   // login dialog with a user gesture, but the user may have
      //   // to log in to Facebook before authorizing your application.
      // }
    });
  });
}

export function login() {
  return new Promise((resolve, reject) => {
    window.FB.login((response) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', (user) => {
          console.log(`Good to see you, ${user.name}.`);
          resolve();
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
        reject();
      }
    });
  });
}
