
# **Challenge-IT-Crowd**
a fullstack web app for a job application

### Backend:
This is an API rest connected to MongoDB to manage products and brands, and the relationship between them. It is written in Typescript to help to avoid most common type errors. Basically ist an express server with helpful endpoints to reach and modify the data.

Next the specifications:

**Database**: MongoDB

**Depedencies :** 
 - cors: Node.js CORS middleware,
 - dotenv: Loads environment variables from .env file,
 - express: Fast, unopinionated, minimalist web framework,
 - mongodb: The official MongoDB driver for Node.js,
 - mongoose: Mongoose MongoDB ODM,

**Dev Dependencies:**
 - @types/express: TypeScript definitions for Express,
 - ts-node-dev: Compiles your TS app and restarts when files are modified,
 - ts-standard: Typescript Standard Style based on StandardJS,
 - typescript: TypeScript is a language for application scale JavaScript development,

**Available Scripts:**
The first step to run the API locally is to use npm install command in a terminal open in the API root directory that you can dowload from this repository.
Then In the project directory, you can run:

***npm run dev*** 
Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to use it in postman or to fetch the endpoints y your app.
The api will reload when you make changes.\

***npm run tsc*** 
Builds the app for production to the `build` folder.\

***npm run lint***
Run code quality tools, e.g. ESLint, TSLint, etc.\

***npm start***
Runs the API.\

**Available Endpoints:**

***Product routes***
 - POST: http://localhost:4000/product : It receives product data in the body request and creates a product, in the response it send a json with the created product.
 - GET: http://localhost:4000/products : In the response it send an array with all products available.
 - GET: http://localhost:4000/product/:id : It receives a product id in the request params, in the response it send a json with the details of the product.
 - GET:http://localhost:4000/products/:brandId : It receives a brand id in the request params, In the response it send an array with all products available wich have the brand.
 - PUT: http://localhost:4000/product/:id : It receives a product id in the request params and updates the product, in the response it send a json with the updated product with the updated data.
 - DELETE: http://localhost:4000/product/:id : It receives a product id in the request params and deletes the product,  in the response it send a json with a message of this type  {"msg": "1 document deleted}.

***Brand routes***
 - POST: http://localhost:4000/brand : It receives brand data in the body request and creates a product, in the response it send a json with the created brand.
 - GET: http://localhost:4000/brands : In the response it send an array with all brands available.
 - GET: http://localhost:4000/brand/:id : It receives a brand id in the request params, in the response it send a json with the details of the brand.
 - PUT: http://localhost:4000/brand/:id : It receives a brand id in the request params and updates the brand , in the response it send a json with the updated brand with the updated data.
 - DELETE: http://localhost:4000/brand/:id : It receives a brand id in the request params and deletes the brand ,  in the response it send a json with a message of this type  {"msg": "1 document deleted}.

*If no one of this endpoints it's reached the API result is an error message of this type:{msg: "resource not found"}*

### Frontend:

This is a SPA to display all the products available in the database and also to display the detail of these products when the user clicks the “see more” button. I use Material UI for the styles and sweetalert2 for all the user feedback. Then for the management of the global states I use redux; axios for fetching the data and Auth0 for user authentication.

The application has an admin view that the user can access by only logging into the app.

Here the specifications:

### Getting Started with Create React App  
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**More Relevant Depedencies :** 
 - @mui/material: React components that implement Google's Material Design,
 - axios: Promise based HTTP client for the browser and node.js,
 - react-redux: Official React bindings for Redux,
 - @reduxjs/toolkit: The official, opinionated, batteries-included toolset for efficient Redux development,
 - sweetalert2: A beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes, supported fork of sweetalert,
 - @auth0/auth0-react: Auth0 SDK for React Single Page Applications (SPA).

**Available Scripts:**
The first step to run the client locally is to use npm install command in a terminal open in the client root directory that you can dowload from this repository.
Then In the project directory, you can run:

***npm start***
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

***npm run build***
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

