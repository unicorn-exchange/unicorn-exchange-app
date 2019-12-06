// Dependencies
import {BrowserModule} from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngstack/translate";
import {NgbAlertModule, NgbModalModule, NgbRatingModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {UiSwitchModule} from "ngx-toggle-switch";
import {NgSelectConfig, NgSelectModule} from "@ng-select/ng-select";
import {ClipboardModule} from "ngx-clipboard";
import {OAuthModule} from "angular-oauth2-oidc";
import {NbCardModule, NbChatModule, NbLayoutModule, NbListModule, NbPopoverModule, NbThemeModule} from "@nebular/theme";
import {ChatComponent} from "./components/chat/chat.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {CountdownModule} from "ngx-countdown";
// Components
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileInformationComponent} from "./components/profile/profile-information/profile-information.component";
import {ProfilePasswordComponent} from "./components/profile/profile-password/profile-password.component";
import {ProfileFormComponent} from "./components/profile-form/profile-form.component";
import {CardComponent} from "./components/card/card.component";
import {OpenMarketComponent} from "./components/open-market/open-market.component";
import {RatingComponent} from "./components/rating/rating.component";
import {CreateOrderComponent} from "./components/create-order/create-order.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {AlertsComponent} from "./components/alerts/alerts.component";
import {OrderComponent} from "./components/order/order.component";
import {DepositComponent} from "./components/deposit/deposit.component";
import {WithdrawComponent} from "./components/withdraw/withdraw.component";
import {DepositModalComponent} from "./components/deposit/deposit-modal/deposit-modal.component";
import {WithdrawModalComponent} from "./components/withdraw/withdraw-modal/withdraw-modal.component";
import {OrderProcessingComponent} from "./components/processing/order-processing.component";
import {OrderDeclineModalComponent} from "./components/processing/order-decline-modal/order-decline-modal.component";
import {OrderPayModalComponent} from "./components/processing/order-pay-modal/order-pay-modal.component";
import {FooterComponent} from "./components/footer/footer.component";
import {OwnerProcessingComponent} from "./components/owner-processing/owner-processing.component";
import {OrderCompleteModalComponent} from "./components/owner-processing/order-complete-modal/order-complete-modal.component";
import {ProfileDealsComponent} from "./components/profile/profile-deals/profile-deals.component";
import {OrderDeleteModalComponent} from "./components/profile/profile-deals/order-delete-modal/order-delete-modal.component";

// tslint:disable-next-line:ban-types
export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use("en");
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbRatingModule,
    NgbTooltipModule,
    TranslateModule.forRoot({
      supportedLangs: ["en", "ru"],
      activeLang: "en"
    }),
    UiSwitchModule,
    NgSelectModule,
    NgbAlertModule,
    NgbModalModule,
    ClipboardModule,
    OAuthModule.forRoot(),
    NbChatModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: "default"}),
    NbLayoutModule,
    NbEvaIconsModule,
    CountdownModule,
    NbPopoverModule,
    NbCardModule,
    NbListModule,
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ProfileComponent,
    ProfileInformationComponent,
    ProfilePasswordComponent,
    ProfileFormComponent,
    CardComponent,
    OpenMarketComponent,
    RatingComponent,
    CreateOrderComponent,
    OrdersComponent,
    OrderComponent,
    DepositComponent,
    WithdrawComponent,
    DepositModalComponent,
    WithdrawModalComponent,
    OrderProcessingComponent,
    OrderDeclineModalComponent,
    OrderPayModalComponent,
    AlertsComponent,
    FooterComponent,
    ChatComponent,
    OwnerProcessingComponent,
    OrderCompleteModalComponent,
    ProfileDealsComponent,
    OrderDeleteModalComponent,
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DepositModalComponent,
    WithdrawModalComponent,
    OrderDeclineModalComponent,
    OrderPayModalComponent,
    OrderCompleteModalComponent,
    OrderDeleteModalComponent,
  ]
})
export class AppModule {
  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = "Custom not found";
  }
}
