import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  localCartProducts: Product[];
  showDataNotFound = true;
  cardForm: FormGroup;
  submitted: boolean = false;
  completed: boolean = false;

  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to Cart";

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.getLocalCartProduct();
    this.cardForm = this.formBuilder.group({
      card_name: ["", Validators.required],
      card_number: ["", Validators.required],
      card_expiry_month: ["", Validators.required],
      card_expiry_year: ["", Validators.required]
    });
  }

  clearCart() {
    this.localCartProducts.forEach(element => {
      this.productService.removeLocalCartProduct(element as Product);
    });
  }

  getLocalCartProduct() {
    this.localCartProducts = this.productService.getLocalCartProducts();
  }

  onSubmit() {
    this.submitted = true;
    if (this.cardForm.invalid) {
      return;
    }
    this.submitted = false;
    this.completed = true;
    this.clearCart();
    return;
  }
}
