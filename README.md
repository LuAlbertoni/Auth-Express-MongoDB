
# API Authentication

A user sign-up and login API created in NodeJs that encrypts the password and saves the data to a database.
## Setup

#### STEP 1

 ```sh
  git clone https://github.com/lualbertoni/Auth-Express-MongoDB.git
   ```

#### STEP 2

 ```sh
  npm install
   ```

#### STEP 3
###### (Rename the file ".env_example" in the root directory to ".env" and change the variables)

  ```sh
  PORT = portExpress
  MONGODB_URL = yourMongoConnectionString
  ```

* ##### Starting the server
###### (Make sure to run this in the root directory)
  ```sh
  npm start
  ```
## API Documentation

## POST /api/auth/register
Registers user by username and email.

### Request
| Param    | Description |
|----------|-------------|
| username | Username    |
| email    | Email       |
| password | Password    |

## POST /api/auth/login
Signs in user by username OR email.

### Request
| Body Param    | Description |
|----------|-------------|
| username | Username    |
| password | Password    |

or

| Body Param    | Description |
|----------|-------------|
| email    | Email       |
| password | Password    |