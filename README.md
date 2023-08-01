# Proclinic backend

## API Documentation

### Log in

**Method**

| URI             | HTTP Method | Authentication |
|-----------------|-------------|----------------|
| /api/auth/login | POST        |	None           |


**Fields**

| Parameter | Type   | Description   | Default | Required |
|-----------|--------|---------------|---------|----------|
| userName  | String | username      | N/A     | **Yes**  |
| password  | String | password      | N/A     | **Yes**  |

**Response**

| Key          | Type   |Description|
|--------------|--------|-----------|
| user_ID      | Number |           |
| userName     | String |           |
| accessToken  | String |           |
| refreshToken | String |           |

### Sign up

**Method**

| URI              | HTTP Method | Authentication |
|------------------|-------------|----------------|
| /api/auth/signup | POST        |	None          |


**Fields**

| Parameter     | Type   | Description   | Default | Required |
|---------------|--------|---------------|---------|----------|
| userName      | String | username      | N/A     | **Yes**  |
| password      | String | password      | N/A     | **Yes**  |
| email         | String | email address | N/A     | **Yes**  |
| firstName     | String | first name    | N/A     |          |
| firstName     | String | last name     | N/A     |          |
| DOB           | String | date of birth | N/A     |          |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |

### Refresh Token

**Method**

| URI                    | HTTP Method | Authentication |
|------------------------|-------------|----------------|
| /api/auth/refreshToken | POST        |	None          |


**Fields**

| Parameter         | Type   | Description        | Default | Required |
|-------------------|--------|--------------------|---------|----------|
| refreshToken      | String | refresh token      | N/A     | **Yes**  |

**Response**

| Key              | Type   | Description             |
|------------------|--------|-------------------------|
| accessToken      | String | new access token        |

### Forget Password

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/auth/forgetPassword | POST        |	None          |


**Fields**

| Parameter     | Type   | Description        | Default | Required |
|---------------|--------|--------------------|---------|----------|
| userName      | String | username           | N/A     | **Yes**  |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |

### Reset Password

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/auth/resetPassword  | POST        |	None          |


**Fields**

| Parameter     | Type   | Description        | Default | Required |
|---------------|--------|--------------------|---------|----------|
| password      | String | new password       | N/A     | **Yes**  |
| token         | String | reset token        | N/A     | **Yes**  |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |


### View profile

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/users/{user_ID}     | GET         |	Yes           |

**Response**

| Key          | Type   | Description                |
|--------------|--------|----------------------------|
| id           | Number | user id                    |
| userName     | String | username                   |
| password     | String | password                   |
| created      | Date   | date created               |
| updated      | Date   | date updated               |
| email        | String | email address              |
| person       | Object | first name, last name, dob |


### Create user

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/users               | POST        |	Yes           |


**Fields**

| Parameter     | Type   | Description        | Default | Required |
|---------------|--------|--------------------|---------|----------|
| userName      | String | username           | N/A     | **Yes**  |
| password      | String | password           | N/A     | **Yes**  |
| firstName     | String | first name         | N/A     | **Yes**  |
| lastName      | String | last name          | N/A     | **Yes**  |
| email         | String | email address      | N/A     | **Yes**  |
| DOB           | String | date of birth      | N/A     | **Yes**  |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |


### Delete user

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/users/{user_ID}     | DELETE      |	Yes           |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |

### Update user

**Method**

| URI                      | HTTP Method | Authentication |
|--------------------------|-------------|----------------|
| /api/users/{user_ID}     | PUT         |	Yes           |


**Fields**

| Parameter     | Type   | Description        | Default | Required |
|---------------|--------|--------------------|---------|----------|
| firstName     | String | first name         | N/A     |          |
| lastName      | String | last name          | N/A     |          |
| DOB           | String | date of birth      | N/A     |          |

**Response**

| Key          | Type   | Description             |
|--------------|--------|-------------------------|
| message      | String | success message         |


## Deploy on AWS Lambda

Install and configure serverless

```
npm install -g serverless
serverless config credentials --provider aws --key <PUBLIC_KEY> --secret <SECRET_KEY>

sls deploy
```

