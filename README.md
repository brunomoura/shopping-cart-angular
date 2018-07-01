# Angular6 - ShoppingCart

Shopping Cart with RESTful API based on [ShoppingCart](https://github.com/ikismail/Angular-ShoppingCart)  

## Functionalities

* User can add product to his cart.
* User can remove product from his cart.
* User can order product.

# Installation

1.  Angular CLI
    * [Download Angular CLI](https://cli.angular.io/)
2.  NodeJs
    * [Download Nodejs](https://nodejs.org/en/download/)
3.  Package Manager - NPM / Yarn
4.  Clone the repository and run `npm install` if you use **npm** as package manager or `yarn install` if you use **yarn** as package manager.
5.  Angular + Firebase Tutorial - [Angular + Firebase + Typescript — Step by step tutorial](https://medium.com/factory-mind/angular-firebase-typescript-step-by-step-tutorial-2ef887fc7d71)

6. Configure your firebase configuration `src/environments/firebaseConfig.ts`
 ```
    export const FireBaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_SENDER_ID"
    }; 
```

7. Run the Server. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

