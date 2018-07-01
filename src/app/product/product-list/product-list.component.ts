import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import axios from "axios";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
  ) {
    this.productList = [];
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    const parent = this;
    const spinner = this.spinnerService;
    spinner.show();
    axios.get( "http://0.0.0.0:8000/api/v1/products/")
      .then(function (response) {
        spinner.hide();
        parent.productList = [];
        response.data.forEach(element => {
          const y = element;
          y["$key"] = element.pk;
          parent.productList.push(y as Product);
        });
      })
      .catch(function (error) {
        // handle error
        return error;
      });
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
