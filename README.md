<h1 align="center">NestJs Backend Clean Template</h1>

<p align="center">
  General Information

This project is a restaurant application where users can order from restaurants and give reviews and ratings. After logging into the system, users can review and order from various restaurants.
</p>


<hr/>

## NestJs - 0 - Features
    User registration and login procedures
    Adding multiple address information
    View restaurant information
    Browse menu items
    Order placement
    Commenting and rating restaurants
<hr/>

## NestJs - 1 - Database Design
    The database was designed on MongoDB and contains the following main components:

    Users: Name, password, email, age, gender and profile picture.
    Restaurants: Name, description, logo, address and location information. Support for multiple branches.
    Menus: Menu items for the restaurant with price, content and cover image.
    Orders: User, restaurant, address, date and time.
    Reviews: User reviews and restaurant ratings.
<hr/>

## NestJs - 2 - Modules and Functions
  Auth Module

    User authentication and authorization processes.
    JWT based authentication strategy.

User Module

    User registration, profile update and address addition.
    View user information.

restaurants Module

    CRUD operations of restaurants and their branches.
    Listing and updating restaurant information.

menus Module

    Management of restaurant menu items.
    Add, update and delete menu items.

orders Module

    User order processing.
    Creating orders and viewing user orders.

reviews Module

    Commenting and rating restaurants.
    Managing reviews and ratings.
<hr/>


## NestJs - 3 - Solved Problems
      Problem 2: Restaurant query by coordinates.
      Problem 3: Adding new items to the menu.
      Problem 4: User ranking based on restaurant reviews.
      Problem 5: Querying restaurants by category and score.
      Problem 6: Listing restaurants with pagination and sorting by average score.
<hr/>

### What to do
      While our project currently has basic functionality, the following features and improvements are planned for future releases:

    Test Automation: Extensive unit and integration testing will be added to make the application more stable and reliable. Testing of API endpoints will be performed using tools such as Jest and Supertest.

    CI/CD Integration: Tools such as GitHub Actions or Travis CI will be integrated for continuous integration and continuous deployment (CI/CD) processes. This will enable code changes to be automatically tested and quickly put into production.

    Front End Development: It is planned to add a web or mobile interface to the project. A user-friendly interface can be developed using modern JavaScript libraries such as React, Angular or Vue.js.

    Advanced User Management: User management features will be expanded and user roles and authorizations will be managed in more detail.

    Performance Optimization: Database queries and API responses will be optimized to increase the performance of the application.

    Security Enhancements: Additional protection mechanisms against security threats such as XSS, CSRF and SQL Injection will be implemented.

    Expansion of Documentation: More detailed technical documentation and development guides will be prepared for developers who will contribute to the project.
    
    Improvements Based on User Feedback: The user experience and functionality of the application will be improved based on feedback from users and other stakeholders.
<hr/>

## Skills

- Rigor
- Object-oriented programming
- Web

## Author

<a href="https://github.com/erdogancayir">Erdogan CAYIR</a>

<hr/>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
