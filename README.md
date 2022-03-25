![](https://img.shields.io/badge/Coverage-92%25-83A603.svg?style=flat&logo=kotlin&logoColor=white&color=green&prefix=$coverage$)
![Statements](https://img.shields.io/badge/statements-92.45%25-brightgreen.svg?style=flat)
![Branches](https://img.shields.io/badge/branches-85.18%25-yellow.svg?style=flat)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat)
![Lines](https://img.shields.io/badge/lines-91.75%25-brightgreen.svg?style=flat)
[![Travis Build Status](https://app.travis-ci.com/Rukundo725/My-Personal-Website-backend.svg?branch=main)](https://app.travis-ci.com/Rukundo725/My-Personal-Website-backend)
![Github workflow](https://github.com/Rukundo725/My-Personal-Website-backend/actions/workflows/CI.yml/badge.svg)




# **Project Summary**
You are expected to create all the endpoints required to meet all the requirements listed under the required features section and ensure that you persist data with a database. You are  required to use mongoose which will  help you write to and read from your mongoDb database. The endpoints are to be secured with JWT.

**NB:**
All Javascript MUST be written in ES6 or higher and should use Babel to transpile down to ES5
You are to create pull request for each feature in this module  to elicit review and feedback.
Classes/modules MUST respect the SRP (Single Responsibility Principle) and MUST use the ES6 methods of module imports and exports.
# Tools
- **Platform**: NodeJs
- **Framework**: ExpressJs
- **ORM**: Mongoose
- **Database**: MongoDB


# Guidelines
- On Trello, create a chore for setting up a database.
- On Trello  create user stories for setting up and testing API endpoints that do the following using database:
- Validate Login and contact Forms.
- View a list of their articles
- View a list of all queries/questions
- Store all queries/questions
- Create a new article
- Update an existing article
- Delete an existing article
- Update their profile information
- On Trello, create a story(s) for the implementation of token-based authentication using JSON web token (JWT) and the security of all routes using JSON web token.
- On Trello, create stories to capture any other tasks not captured above. The tasks could be a feature, bug or chore for this module.
- On Trello, create user story to implement this optional feature: 
- Authenticate user using with social media platforms using passport 
- Allow only authenticated users in to comment on articles

**NB:** Executing the above optional feature after completing the required features means you have exceeded expectations.:
- Write tests for the endpoints specified below.
- Test all endpoints with Postman.
- Use API Blueprint, Slate, Apiary or Swagger to document your API. Docs should be accessible via your application’s URL.
- Ensure the app gets hosted on Heroku.

## Packages and Documentations
[`babel`](https://babeljs.io/docs/en/usage/):
```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
[` mongoose`](https://www.npmjs.com/package/mongoose):
```sh
npm install mongoose
```
[`bcrypt`](https://www.npmjs.com/package/bcrypt):
```sh
npm install bcrypt
```
[`body-parser`](https://www.npmjs.com/package/body-parser):
```sh
npm install body-parser
```
[`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken):
```sh
npm install jsonwebtoken
```
[`express`](https://www.npmjs.com/package/express):
```sh
npm install express
```
[`dotenv`](https://www.npmjs.com/package/dotenv):
```sh
npm install dotenv --save
```
[`cors`](https://www.npmjs.com/package/cors):
```sh
npm install cors
```

[`nodemon`](https://www.npmjs.com/package/nodemon):
```sh
npm install --save-dev nodemon 
```

[`chai`](https://www.npmjs.com/package/chai):
```sh
npm install --save-dev chai
```
[`chai-http`](https://www.chaijs.com/plugins/chai-http/):
```sh
npm install chai-http
```
[`mocha`](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-mocha.html#node_test_create_mocha_tests):
```sh
npm install --save-dev mocha
```

[`nyc`](https://www.npmjs.com/package/nyc):
```sh
npm i -D nyc
```

[`coveralls`](https://www.chaijs.com/plugins/chai-http/):
```sh
npm install coveralls --save-devp
```
[`chai-http`](https://www.chaijs.com/plugins/chai-http/):
```sh
npm install mocha-lcov-reporter --save-dev
```

[`coverage-badge-creator using npm`](https://www.npmjs.com/package/coverage-badge-creator):
```sh
npm install --save-dev coverage-badge-creator
```
[`coverage-badge-creator using yarn`](https://yarnpkg.com/en/package/coverage-badge-creator):
```sh
yarn add --dev coverage-badge-creator
```

### **how to use** 
**NB:** *you need to have Nodejs installed  already*<br>
 make sure you have node js installed or follow this[ link](https://nodejs.org/en/download/) or by [packages](https://nodejs.org/en/download/package-manager/) to install it 
1. First you can clone this repository and use it.   

    * clone  
        ```sh
      git clone https://github.com/Rukundo725/My-Personal-Website-backend.git
      ```
    * navigate to the repo directory
      ```sh
      cd My-Personal-Website-backend
      ```
    * install dependences
      ```sh
      npm install
      ```
    * use nodemon in dev environment
      ```sh
      npm run dev
      ```
    * build a dist directory
      ```sh
      npm run build
      ```
    * test end-points
      ```sh
      npm run test
      ```
     * generate coverage badges
      ```sh
      Insert one of the following keys anywhere in your README. These will be replaced by the coverage-badge-creator with the appropriate badge.

    The following keys are available:
     * $coverage$
     * $statements$
     * $branches$
     * $functions$
     * $lines$
 
    _important are also the surrounding dollar signs_  
    
    and run it from the CLI:
  
    npm run coverage:badge
    ```

- **Endpoint for deleting one article REST API** :

4. set [postman](https://www.postman.com/) environment to test endpoints 
5. use DEL http://localhost:4000/api/blog/ + id of the blog to be deleted 



