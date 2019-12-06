import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileInformationComponent} from "./components/profile/profile-information/profile-information.component";
import {ProfilePasswordComponent} from "./components/profile/profile-password/profile-password.component";
import {OpenMarketComponent} from "./components/open-market/open-market.component";
import {CreateOrderComponent} from "./components/create-order/create-order.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {ROUTES} from "../config";
import {OrderComponent} from "./components/order/order.component";
import {DepositComponent} from "./components/deposit/deposit.component";
import {WithdrawComponent} from "./components/withdraw/withdraw.component";
import {OrderProcessingComponent} from "./components/processing/order-processing.component";
import {ChatComponent} from "./components/chat/chat.component";
import {OwnerProcessingComponent} from "./components/owner-processing/owner-processing.component";
import {ProfileDealsComponent} from "./components/profile/profile-deals/profile-deals.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: ROUTES.ORDERS,
    pathMatch: "full"
  },
  {
    path: ROUTES.SIGN_IN,
    component: SignInComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.SIGN_UP,
    component: SignUpComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.OPEN_MARKET,
    component: OpenMarketComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.CREATE_ORDER,
    component: CreateOrderComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.ORDERS,
    component: OrdersComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.DEPOSIT,
    component: DepositComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.WITHDRAW,
    component: WithdrawComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.CHAT,
    component: ChatComponent,
    pathMatch: "full"
  },
  {
    path: `${ROUTES.ORDER}/:id`,
    component: OrderComponent,
    pathMatch: "full"
  },
  {
    path: `${ROUTES.ORDER}/:id/${ROUTES.PROCESSING}`,
    component: OrderProcessingComponent,
    pathMatch: "full"
  },
  {
    path: `${ROUTES.ORDER}/:id/${ROUTES.OWNER_PROCESSING}`,
    component: OwnerProcessingComponent,
    pathMatch: "full"
  },
  {
    path: ROUTES.PROFILE.base,
    component: ProfileComponent,
    children: [
      {
        path: ROUTES.PROFILE.INFO,
        component: ProfileInformationComponent,
      },
      {
        path: ROUTES.PROFILE.CHANGE_PASSWORD,
        component: ProfilePasswordComponent,
      },
      {
        path: ROUTES.PROFILE.DEALS,
        component: ProfileDealsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
