# STAAN Bio-Med

![Project Screenshot](assets/staan.png)


## E-commerce Project

## Key Features

### User Authentication and Authorization
- **User Authentication Using JWT Token**,  Users can authenticate using their username and password.
- **SMTP Verification**  Users can verify their accounts via email OTP.


### Admin Dashboard
- **Category Management**, Create, read, update, and delete categories.
- **Product Management**, Create, read, update, and delete products.
- **Order Management**,  Manage user orders.
- **Admin Dashboard**,  Comprehensive functionality including total monthly sales count, total weekly sales count, recent orders, total weekly and monthly sales aggregation, trending products, and percentage of weekly and monthly sales.

### Shopping Cart 
- **Shopping Cart**, Users can add items to the cart, update quantities, and remove items.


### Checkout with Razorpay
- **Seamless Order Placement**, Users can effortlessly place orders using Razorpay's secure and efficient payment gateway.

### Product Search and Filtering and Product Listing and Responsive Design
- **User Can see all Products Availble**
- **Responsive Design**
- **Order Cancel to the User**


### API Documentation
- **Comprehensive documentation of API endpoints**: [View API Documentation](https://documenter.getpostman.com/view/31242747/2sA3QwbpaE)


## Getting Started



### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/badusha061/staan-ecommerce-.git
    ```

2. **Navigate to the project folder for backend:**
    ```sh
    cd server
    ```

3. **Configure environment variables** as instructed in the provided `.env.example` file.

4. **set up venvr:**
    ```sh
    Python -m venv venv 
    venv\Scripts\activate
    ```


5. **Install All dependies for Server:**
    ```sh
    pip install -r requirements.txt
    python manage.py migrate 
    python manage.py runserver
    ```


6. **Navigate to the project folder for fronend:**
    ```sh
    cd client
    ```
7. **Navigate to the project folder for fronend:**
    ```sh
    npm i 
    npm run dev 
    ```


## Technology Stack


- **Backend Development**: Pythn, Django REST framework, ORM
- **Databases**:  PostgreSQL, 
- **Frontend Development**: React, TypeScripts, Tailwind CSS,  Zustand, shadcn ui
- **Integrations**: JWT, Razorpay
