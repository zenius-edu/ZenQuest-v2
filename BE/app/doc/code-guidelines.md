# Code Guidelines

## Backend: Controller and Usecase Separation

We want to separate router handler specific process from the business logic.

### Controller (`ctrl.clj`)

The request handling process, or handler, will be put in `ctrl.clj`. It has the following responsibilities:

-   Validate the input from the request.
-   Handle request validation results:
    -   Throws `400 Bad Request` for bad requests and failing input validation.
-   Return response status:
    -   Return `200 OK` for a successful process.
    -   Return `500 Internal Server Error` for server errors.

### Usecase (`usecase.clj`)

All business logic must be put in `usecase.clj`.

-   It handles the core business logic.
-   It returns the result to the handlers in `ctrl.clj`.

