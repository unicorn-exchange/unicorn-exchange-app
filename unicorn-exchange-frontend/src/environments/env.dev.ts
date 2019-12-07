/**
 * Env for development with local backend
 */

export class Env {
  static readonly RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  static readonly API_EXCHANGE_BASE_URL = "http://localhost:3000/api/v1";
  static readonly THEME = "default";
  static readonly FAKE_EXCHANGE_API = false;
  static readonly IS_PRODUCTION = false;
  static readonly DEBUG_NETWORK = false;
  static readonly DEBUG_PERFORMANCE = false;
}
