// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export class Env {
  static readonly RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  static readonly API_EXCHANGE_BASE_URL = "http://localhost:3000/api/v1";
  static readonly THEME = "default";
  static readonly FAKE_NETWORK = false;
  static readonly IS_PRODUCTION = false;
  static readonly DEBUG_NETWORK = true;
  static readonly DEBUG_PERFORMANCE = false;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
