# Smart Wholesale Shop Backend API

This document describes all available endpoints for authentication, user management, and product management in the Smart Wholesale Shop backend.

---

## Base URL

```
https://wholesale-backend-cnfg.onrender.com/
```

---

## Authentication Endpoints

### Register (Customer, Salesman, Owner)

**POST** `/auth/register`  
**Full URL:** `https://wholesale-backend-cnfg.onrender.com/auth/register`

#### Request Body

- **Owner**
  ```json
  {
    "name": "Owner Name",
    "email": "owner@example.com",
    "password": "password123",
    "role": "owner",
    "shopId": "shop001",
    "shopName": "Super Mart",
    "shopType": "RetailPackStore",
    "address": "123 Main Street, City, State"
  }
  ```
- **Customer**
  ```json
  {
    "name": "Customer Name",
    "email": "customer@example.com",
    "password": "password123",
    "role": "customer",
    "shopId": "shop001"
  }
  ```
- **Salesman**
  ```json
  {
    "name": "Salesman Name",
    "email": "salesman@example.com",
    "password": "salesman123",
    "role": "salesman",
    "enterpriseName": "ABC Enterprises"
  }
  ```

#### Success Response

- `{ "message": "Owner registered successfully." }`
- `{ "message": "User registered successfully." }`
- `{ "message": "Salesman registered successfully." }`

#### Error Responses

- Missing fields, duplicate email/shopId, invalid shopId, etc.

---

### Login (All Roles)

**POST** `/auth/login`  
**Full URL:** `https://wholesale-backend-cnfg.onrender.com/auth/login`

#### Request Body

```json
{
  "email": "owner@example.com",
  "password": "password123"
}
```

#### Success Response

- **Owner**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "name": "Owner Name",
      "email": "owner@example.com",
      "role": "owner",
      "shopId": "shop001",
      "shopName": "Super Mart",
      "shopType": "RetailPackStore",
      "address": "123 Main Street, City, State"
    }
  }
  ```
- **Customer**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "name": "Customer Name",
      "email": "customer@example.com",
      "role": "customer",
      "shopId": "shop001",
      "shopName": "Super Mart",
      "shopType": "RetailPackStore",
      "address": "123 Main Street, City, State"
    }
  }
  ```
- **Salesman**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "name": "Salesman Name",
      "email": "salesman@example.com",
      "role": "salesman",
      "enterpriseName": "ABC Enterprises"
    }
  }
  ```

#### Error Responses

- Invalid credentials, missing fields, etc.

---

## Product Endpoints

### Create Product (Owner Only)

**POST** `/products`  
**Full URL:** `https://wholesale-backend-cnfg.onrender.com/products`

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: multipart/form-data`

**Body (form-data):**

- `title`: string (required)
- `image`: file (**png, jpg, jpeg, webp, gif, svg**; required)
- `price`: number (required)
- `discount`: number (optional)
- `description`: string (optional)

**Success Response:**

```json
{
  "message": "Product created successfully.",
  "product": {
    "_id": "PRODUCT_ID",
    "title": "Premium Basmati Rice",
    "image": "data:image/jpeg;base64,...",
    "price": 1200,
    "discount": 10,
    "description": "High quality basmati rice, 5kg pack.",
    "owner": "OWNER_ID",
    "createdAt": "2024-06-17T12:00:00.000Z",
    "__v": 0
  }
}
```

---

### Get My Products (Owner Only)

**GET** `/products`  
**Full URL:** `https://wholesale-backend-cnfg.onrender.com/products`

**Headers:**

- `Authorization: Bearer <JWT_TOKEN>`

**Response:**

```json
{
  "products": [
    {
      "_id": "PRODUCT_ID",
      "title": "Premium Basmati Rice",
      "image": "data:image/jpeg;base64,...",
      "price": 1200,
      "discount": 10,
      "description": "High quality basmati rice, 5kg pack.",
      "owner": "OWNER_ID",
      "createdAt": "2024-06-17T12:00:00.000Z",
      "__v": 0
    }
    // ...more products
  ]
}
```

---

### Get All Products (Public)

**GET** `/products/all`  
**Full URL:** `https://wholesale-backend-cnfg.onrender.com/products/all`

**Response:**

```json
{
  "products": [
    {
      "_id": "PRODUCT_ID",
      "title": "Premium Basmati Rice",
      "image": "data:image/jpeg;base64,...",
      "price": 1200,
      "discount": 10,
      "description": "High quality basmati rice, 5kg pack.",
      "owner": "OWNER_ID",
      "createdAt": "2024-06-17T12:00:00.000Z",
      "__v": 0
    }
    // ...more products
  ]
}
```

---

## (Planned) Order & Slot Endpoints

> Endpoints for orders and slots will be added as implemented.

---

## Registration UI Guidance

When a user opens the registration form, they must first select their **role**. Based on the selected role, show the following input fields and example payloads:

### 1. Owner Registration

Show these fields:

- name
- email
- password
- role (must be "owner")
- shopId (unique for each shop)
- shopName
- shopType (select: "RetailPackStore" or "BulkRationStore")
- address

**Example JSON:**

```json
{
  "name": "Rahul Deshmukh",
  "email": "rahul.retail@example.com",
  "password": "rahul1234",
  "role": "owner",
  "shopId": "shop101",
  "shopName": "Deshmukh Retail Center",
  "shopType": "RetailPackStore",
  "address": "123 Main Street, Pune, Maharashtra"
}
```

---

### 2. Customer Registration

Show these fields:

- name
- email
- password
- role (must be "customer")
- shopId (must be an existing shopId created by an owner)

**Example JSON:**

```json
{
  "name": "Amit Joshi",
  "email": "amit.customer@example.com",
  "password": "amit1234",
  "role": "customer",
  "shopId": "shop001"
}
```

---

### 3. Salesman Registration

Show these fields:

- name
- email
- password
- role (must be "salesman")
- enterpriseName

**Example JSON:**

```json
{
  "name": "Vishal Singh",
  "email": "vishal.salesman@example.com",
  "password": "vishal1234",
  "role": "salesman",
  "enterpriseName": "Vishal Distributors"
}
```

---

**Note:**

- The frontend should dynamically show/hide fields based on the selected role.
- For "owner", both `shopName` and `shopType` are required.
- For "customer", `shopId` is required (must be valid).
- For "salesman", `enterpriseName` is required.

---

## Example Usage

### Register Owner

```http
POST https://wholesale-backend-cnfg.onrender.com/auth/register
Content-Type: application/json

{
  "name": "Owner Name",
  "email": "owner@example.com",
  "password": "password123",
  "role": "owner",
  "shopId": "shop001",
  "shopName": "Super Mart",
  "shopType": "RetailPackStore",
  "address": "123 Main Street, City, State"
}
```

### Register Customer

```http
POST https://wholesale-backend-cnfg.onrender.com/auth/register
Content-Type: application/json

{
  "name": "Customer Name",
  "email": "customer@example.com",
  "password": "password123",
  "role": "customer",
  "shopId": "shop001"
}
```

### Register Salesman

```http
POST https://wholesale-backend-cnfg.onrender.com/auth/register
Content-Type: application/json

{
  "name": "Salesman Name",
  "email": "salesman@example.com",
  "password": "salesman123",
  "role": "salesman",
  "enterpriseName": "ABC Enterprises"
}
```

### Login (All Roles)

```http
POST https://wholesale-backend-cnfg.onrender.com/auth/login
Content-Type: application/json

{
  "email": "owner@example.com",
  "password": "password123"
}
```

### Create Product (Owner Only)

```http
POST https://wholesale-backend-cnfg.onrender.com/products
Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: multipart/form-data

Body (form-data):
  title: Premium Basmati Rice
  image: [choose file: rice.jpg/png/jpeg/webp/gif/svg]
  price: 1200
  discount: 10
  description: High quality basmati rice, 5kg pack.
```

### Get My Products (Owner Only)

```http
GET https://wholesale-backend-cnfg.onrender.com/products
Headers:
  Authorization: Bearer <JWT_TOKEN>
```

### Get All Products (Public)

```http
GET https://wholesale-backend-cnfg.onrender.com/products/all
```

---
