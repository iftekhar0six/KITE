# KITE - Web Forum Backend

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Version](#version)
- [License](#license)
- [Contact](#contact)

## About the Project

KITE is a comprehensive backend for a web forum application. It is designed to handle various aspects of a forum, including user management, categorization, posting, commenting, and messaging. The project is currently in progress, and additional features and improvements may be added in the future.

## Features

- **User/Admin Management:** Create, update, and manage user and admin accounts.
- **Category & Subcategory Management:** Organize posts into categories and subcategories.
- **Post & Comment System:** Users can create posts and add comments.
- **Messaging:** Users can send and receive messages.
- **Follow/Unfollow:** Users can follow and unfollow other users.
- **Email Notifications:** Receive confirmation emails for account creation, password changes, profile updates, and password resets.
- **Swagger Documentation:** API documentation using Swagger.
- **JSDoc Comments:** Comprehensive code comments for better understanding and maintenance.

## Technologies Used

- **Language:** JavaScript
- **Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Validation:** Express Validators
- **Documentation:** Swagger
- **Authentication:** JWT (JSON Web Token)
- **Mailing System:** Integrated email system for notifications

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/iftekhar0six/KITE.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   PORT=your_port_number
   HOST=your_host
   uri=your_database_uri
   JWT_SECRET_KEY=your_jwt_secret_key
   MAIL_ID=your_mailing_system_email
   MAIL_PASSWORD=your_mailing_system_password
   MAIL_SMTP=your_smtp_provider
   BASE_URL=your_base_url_for_swagger
   ```

### Running the Project

```sh
npm start
```

## Usage

To use the API, you can use tools like Postman or Swagger to test the endpoints. Ensure you have MongoDB running and your `.env` file configured.

## API Documentation

The API documentation is generated using Swagger. You can access it at:

```url
http://HOST:PORT/api-docs/
ex. "http://localhost:8080/api-docs/"
```

## Version

Current version: **1.0.0** (initial release). This project will be upgraded in future versions.

## Contact

Iftekhar Ansari - [iftekhar0six@gmail.com](mailto:iftekhar0six@gmail.com)

Project Link: [https://github.com/iftekhar0six/KITE](https://github.com/iftekhar0six/KITE)

---
