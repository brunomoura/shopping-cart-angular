import { Injectable, EventEmitter, Output } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import axios from "axios";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;
  cartProducts: AngularFireList<FavouriteProduct>;

  // NavbarCounts
  navbarCartCount = 0;
  navbarFavProdCount = 0;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private userService: UserService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    // Toaster Config
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";

    if (this.authService.isLoggedIn()) {
      // this.calculateFavProductCounts();
      this.calculateCartProductCounts();
    } else {
      // this.calculateLocalFavProdCounts();
      this.calculateLocalCartProdCounts();
    }
  }

  getProducts() {
    axios.get( "http://127.0.0.1:8000/api/v1/products/")
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createProduct(data: Product) {
    this.products.push(data);
  }

  getProductById(key: string) {
    // this.product = this.db.object("products/" + key);
    return this.product;
  }

  updateProduct(data: Product) {
    this.products.update(data.$key, data);
  }

  deleteProduct(key: string) {
    this.products.remove(key);
  }

  /*
   ----------  Cart Product Function  ----------
  */

  // Fetching Cart Products based on userId
  getUsersCartProducts() {
    const user = this.authService.getLoggedInUser();
    // this.cartProducts = this.db.list("cartProducts", ref =>
    //   ref.orderByChild("userId").equalTo(user.$key)
    // );
    return this.cartProducts;
  }

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    if (this.authService.isLoggedIn() === false) {
      let a: Product[];

      a = JSON.parse(localStorage.getItem("avct_item")) || [];

      a.push(data);

      const toastOption: ToastOptions = {
        title: "Adding Product to Local Cart",
        msg: "Please add product to cart after signing in to update to server",
        showClose: true,
        timeout: 5000,
        theme: "material"
      };
      this.toastyService.wait(toastOption);
      setTimeout(() => {
        localStorage.setItem("avct_item", JSON.stringify(a));
        this.calculateLocalCartProdCounts();
      }, 1500);
    }
    if (this.authService.isLoggedIn() === true) {
      const user = this.authService.getLoggedInUser();

      const productKey = data.$key;

      delete data.$key;

      const toastOption: ToastOptions = {
        title: "Added  to Cart",
        msg: "Adding Product to Cart",
        showClose: true,
        timeout: 5000,
        theme: "material"
      };
      this.toastyService.wait(toastOption);
      setTimeout(() => {
        this.cartProducts.push({
          product: data,
          productId: productKey,
          userId: user.$key
        });

        this.calculateCartProductCounts();
      }, 1500);
    }
  }

  // Removing Cart product from db
  removeCart(key: string) {
    this.cartProducts.remove(key);
  }

  // Removing cart from local
  removeLocalCartProduct(product: Product) {

    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));

    this.calculateLocalCartProdCounts();
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  // returning LocalCarts Product Count
  calculateLocalCartProdCounts() {
    this.navbarCartCount = this.getLocalCartProducts().length;
  }

  // Calculating Cart products count and assigning to variable
  calculateCartProductCounts() {
    const x = this.getUsersCartProducts()
      .snapshotChanges()
      .subscribe(data => {
        this.navbarCartCount = data.length;
      });
  }
}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
