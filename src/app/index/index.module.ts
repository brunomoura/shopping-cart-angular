// Core Dependencies
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IndexRoutes } from "./index.routing";

import { ProductModule } from "./../product/product.module";
import { UserModule } from "../user/user.module";

// Components
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { LocalCartItemComponent } from "./local-cart-item/local-cart-item.component";
import { PaymentComponent } from "./payment/payment.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    RouterModule.forChild(IndexRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    LocalCartItemComponent,
    PaymentComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarComponent, FooterComponent],
  providers: []
})
export class IndexModule {}
