import {AuthConfig} from "angular-oauth2-oidc";
import {ROUTES} from "../config";

export const authConfig: AuthConfig = {
  issuer: "https://accounts.google.com",
  redirectUri: window.location.origin + "/" + ROUTES.ORDERS,
  clientId: "814681536118-eij186mapdo2cscq5scif49ipf1iu85v.apps.googleusercontent.com",
  scope: "openid profile email",
  strictDiscoveryDocumentValidation: false
};
