# MVC

m- Models - schemas
v- views - routes -> endpoints
c- controllers - functions that runs the functionality of our routes (relatively our endpoints)

## Authentication

1. User signup and signin - authentication
2. User management - update user, delete user, getUser , getUsers etc
3. JWT token-based functionalities
4. Password hasher - bycrypt
5. Input(request) validation

## flow

Request -> routes -> middleware(validation) -> controller -> model -> database



 match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please enter a valid email address",
      ],