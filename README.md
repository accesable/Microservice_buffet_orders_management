# Midterm Microservice Project

## Order Service
This Service is a socket_server for an order service.The main use-case is to facilitate interaction between waiter and chief staff 

**Use Case**
- Waiter Actions: The waiter can create orders and add order details.
- Chief Staff Actions: The chief staff can confirm the order detail status. The possible statuses are: `confirmed`, `out`, `declined`. And the default value  `pending`
- The order service is built using Express.js and MongoDB.

### Run DB via Docker
at the root project directory run `docker-compose up -d` and import the `my_sql_db.sql` into MySQL database using by PhpMyAdmin at [http://localhost:8080/](http://localhost:8080/)

### Run Order Service with `npm`
go to the `socket_server` directory and run `npm install && npm run start`. Go to [http://localhost:8085/api-docs/](http://localhost:8085/api-docs/) for api documentations