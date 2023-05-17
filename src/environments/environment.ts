// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v8.1.0',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'https://bqds-backend-dot-tanitlabschool-dev.appspot.com',

  firebaseConfig: {
      apiKey: "AIzaSyAV0GEjjV1aTNpLYxj28e1GVZyZ-qc0Ybs",
      authDomain: "tanitlabschool-dev.firebaseapp.com",
      databaseURL: "https://tanitlabschool-dev.firebaseio.com",
      projectId: "tanitlabschool-dev",
      storageBucket: "tanitlabschool-dev.appspot.com",
      messagingSenderId: "1042640352492",
      appId: "1:1042640352492:web:dd687d1cdc51a72b95e1c9"
  },
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration: 'https://preview.keenthemes.com/metronic8/demo1/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1/',
  appPreviewAngularUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl: 'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  appDemos: {
    'demo1': {
      'title': 'Demo 1',
      'description': 'Default Dashboard',
      'published': true,
      'thumbnail': './assets/media/demos/demo1.png'
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
