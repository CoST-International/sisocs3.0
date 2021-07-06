// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl: 'http://localhost:8000/api',
  apiUrl: 'http://localhost:8000/api/v1',
  baseUrl: 'localhost://8000/api/public/',

  // authUrl: 'https://devsisocsapi.cengkuru.com/public/api',
  // apiUrl: 'https://devsisocsapi.cengkuru.com/public/api/v1',
  // baseUrl: 'https://devsisocsapi.cengkuru.com/public/',

  // authUrl: 'https://sisocsapi2.cengkuru.com/public/api',
  // apiUrl: 'https://sisocsapi2.cengkuru.com/public/api/v1',
  // baseUrl: 'https://sisocsapi2.cengkuru.com/public/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
