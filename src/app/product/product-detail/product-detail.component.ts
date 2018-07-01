import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";

import axios from "axios";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"]; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    const parent = this;
    const spinner = this.spinnerService;
    spinner.show();
    axios.get( "http://127.0.0.1:8000/api/v1/products/" + id)
      .then(function (response) {
        spinner.hide();
        const y = response.data as Product;
        console.log(y);
        y["$key"] = id;
        parent.product = y;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
