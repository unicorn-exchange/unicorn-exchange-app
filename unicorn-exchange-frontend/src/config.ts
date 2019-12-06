class ProfileRoutes {
  static readonly base = "profile";
  static readonly NOTIFICATIONS = "notifications";
  static readonly INFO = "information";
  static readonly CATEGORIES = "categories";
  static readonly DEALS = "deals";
  static readonly RATE = "rate";
  static readonly INVOICES = "invoices";
  static readonly CHANGE_PASSWORD = "change-password";
}

export class ROUTES {
  static readonly SIGN_IN = "sign-in";
  static readonly SIGN_UP = "sign-up";
  static readonly OPEN_MARKET = "market";
  static readonly FULL_REGISTRATION = "full-registration";
  static readonly ORDERS = "orders";
  static readonly ORDER = "order";
  static readonly CHAT = "chat";
  static readonly DEPOSIT = "deposit";
  static readonly WITHDRAW = "withdraw";
  static readonly CREATE_ORDER = "create-order";
  static readonly PROCESSING = "processing";
  static readonly OWNER_PROCESSING = "owner-processing";
  static readonly PROFILE = ProfileRoutes;
}
