import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { LocalCartItemComponent } from "./local-cart-item/local-cart-item.component";
import { PaymentComponent } from "./payment/payment.component";

export const IndexRoutes: Routes = [
  {
    path: "index",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "cartItems",
        component: LocalCartItemComponent
      },
      {
        path: "payment",
        component: PaymentComponent
      }
    ]
  }
];
