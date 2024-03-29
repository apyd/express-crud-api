# Crud API made with Express (mentoring module 6)

## Requirements

### Specification: 

The application has 4 primary entities:
- User - can add some products to the cart and then order them (example).
- Product - represents product information that user can order (example).
- Cart - contains a list of products and their amount that user wants to order (example).
- Order - contains list of products from cart that user has ordered (example).

Relations between entities:

- Each User can have only one non-deleted Cart at a time. Each Cart is attached to a specific User.
- One User can have multiple Orders. Each Order is attached to a specific User.
- Cart contains a list of products that user wants to order with the amount of those products specified.

### Acceptance criteria

Note: TypeScript should be used.

1. Server is created using Express framework.
    - Server should be started using npm start command and stopped by npm run stop. Server is running on 8000 port.
2. API implementation follows Swagger (docs/swagger.yml). Proper HTTP status codes are returned in responses (not only 200 or 500).
    - Auth endpoints should be skipped at this point.
    - If token is not provided, 401 status code should be returned. If there is no such a user, 403 status code should be returned.
    - At least one product should be available in /api/products endpoint
    - Order entity has copy of products. If you have only product id in order, it may lead to inconsistency. For example, if user creates an order and after that price is changed, the order price shouldn't be changed.

3. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example xxx.repository.ts contains functions to retrieve data (data access layer), xxx.service.ts contains services that implement business logic, xxx.controller.ts contains functions that manage status codes/responses returned (presentation layer).
4. Data is stored either in memory or on file system.
5. joi is used to validate request bodies.
6. Simple authentication middleware is added to check if user with such id exists. User id is passed in x-user-id header.
    - admin value is hardcoded for x-user-id header and can be used to access all these endpoints.
