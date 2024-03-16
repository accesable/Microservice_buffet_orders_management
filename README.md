# Midterm Microservice Project

## Order Service
This Service is a socket_server for an order service.The main use-case is to facilitate interaction between waiter and chief staff 


**Use Case**
- Waiter Actions: The waiter can create orders and add order details.
- Chief Staff Actions: The chief staff can confirm the order detail status. The possible statuses are: `confirmed`, `out`, `declined`. And the default value  `pending`
- Chief Staff : Can lock the menu item selection in The Menu
- The order service is built using Express.js and MongoDB.

### Run DB via Docker
at the root project directory run `docker-compose up -d` and import the `my_sql_db.sql` into MySQL database using by PhpMyAdmin at [http://localhost:8080/](http://localhost:8080/)

### Run Order Service with `npm`
go to the `socket_server` directory and run `npm install && npm run start`. Go to [http://localhost:8085/api-docs/](http://localhost:8085/api-docs/) for api documentations
### Run As Docker 
`docker network ls` and get the ..._my_custom_network \
`docker run --network=restaurantorderservices_my_custom_network -p 8085:8085  socker_server:1.0`
## Authentication Service
Using `jsonwebtoken` for creating an Authentication Service with MySQL and Redis for refresh token storage
```js
{
    _id: ObjectId('65e2ce4c02478d2a21b3008c'), //table id or order id
    created_at: ISODate('2024-03-02T06:59:24.281Z'),
    end_at: null,
    orderdetails: [
        ObjectId('65e2d1a79a04b10768e64376'),
        ObjectId('65eea21f73d9bf11ce6938ca'),
        ObjectId('65eea21f73d9bf11ce6938cc')
    ],
    table: 2, // table id
    __v: 0
}
```