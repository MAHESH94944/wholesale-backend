# Smart Wholesale Shop Backend API

This document describes the main authentication and user management endpoints for the Smart Wholesale Shop backend. Use these endpoints to integrate the frontend UI.

---

## Base URL

```
https://wholesale-backend-cnfg.onrender.com/
```

---

## Authentication Endpoints

### 1. Register (Customer, Salesman, Owner)

**POST** `/auth/register`

**Full URL:**  
`https://wholesale-backend-cnfg.onrender.com/auth/register`

#### Request Body

- For **Owner**:
  ```json
  {
    "name": "Owner Name",
    "email": "owner@example.com",
    "password": "password123",
    "role": "owner",
    "shopId": "shop001",
    "shopName": "Super Mart",
    "shopType": "RetailPackStore" // or "BulkRationStore"
  }
  ```

- For **Customer/Salesman**:
  ```json
  {
    "name": "Customer Name",
    "email": "customer@example.com",
    "password": "password123",
    "role": "customer", // or "salesman"
    "shopId": "shop001"
  }
  ```

#### Success Response

- **Owner:**
  ```json
  { "message": "Owner registered successfully." }
  ```
- **Customer/Salesman:**
  ```json
  { "message": "User registered successfully." }
  ```

#### Error Responses

- Missing fields, duplicate email/shopId, invalid shopId, etc.

---

### 2. Login (All Roles)

**POST** `/auth/login`

**Full URL:**  
`https://wholesale-backend-cnfg.onrender.com/auth/login`

#### Request Body

```json
{
  "email": "owner@example.com",
  "password": "password123",
  "role": "owner" // or "customer" or "salesman"
}
```

#### Success Response

- **Owner:**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "name": "Owner Name",
      "email": "owner@example.com",
      "role": "owner",
      "shopId": "shop001",
      "shopName": "Super Mart",
      "shopType": "RetailPackStore"
    }
  }
  ```

- **Customer/Salesman:**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "name": "Customer Name",
      "email": "customer@example.com",
      "role": "customer",
      "shopId": "shop001",
      "shopName": "Super Mart",
      "shopType": "RetailPackStore"
    }
  }
  ```

#### Error Responses

- Invalid credentials, missing fields, etc.

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

**Example JSON:**
```json
{
  "name": "Rahul Deshmukh",
  "email": "rahul.retail@example.com",
  "password": "rahul1234",
  "role": "owner",
  "shopId": "shop101",
  "shopName": "Deshmukh Retail Center",
  "shopType": "RetailPackStore"
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
- shopId (must be an existing shopId created by an owner)

**Example JSON:**
```json
{
  "name": "Vishal Singh",
  "email": "vishal.salesman@example.com",
  "password": "vishal1234",
  "role": "salesman",
  "shopId": "shop001"
}
```

---

**Note:**  
- The frontend should dynamically show/hide fields based on the selected role.
- For "owner", both `shopName` and `shopType` are required.
- For "customer" and "salesman", only `shopId` is required (must be valid).

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
  "shopType": "RetailPackStore"
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

### Login

```http
POST https://wholesale-backend-cnfg.onrender.com/auth/login
Content-Type: application/json

{
  "email": "owner@example.com",
  "password": "password123",
  "role": "owner"
}
```

---

## More Endpoints

Additional endpoints for products, orders, slots, etc. will follow a similar pattern and will be documented as implemented.

---
