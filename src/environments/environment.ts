// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tokenKey: 'auth-token',
  ROOT_URL: 'http://localhost:3000',
  // ROOT_URL: 'https://admin-soamada.herokuapp.com',



  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyA6q9k3XK0dKHzKrqZJhVqkvzSSGGrRFj8",
    authDomain: "adminsoamada.firebaseapp.com",
    databaseURL: "https://adminsoamada.firebaseio.com",
    projectId: "adminsoamada",
    storageBucket: "adminsoamada.appspot.com",
    messagingSenderId: "142878856922"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
