# Alpine Challenge

## by Ronald Roe


## Setup

Requires nodejs 12+, mongodb 3+. 

  - Run `npm i`
  - Run `npm run build`
  - Run `npm start`
  - In a separate terminal window, in the same directory, run `npm run setup`
      - This will add a total of 6 accounts, the details of which are in `setup.js`. 
      - The login info for the admin account is: email: admin@admin.admin, password: admin

## Usage

The required pages have been implemented:

  - Login: `/login`
  - Signup: `/signup`
  - Profile: `/profile`
  - Admin: `/admin`

The server maintains a user session once logged in. Users may be created on the signup page, and are automatically logged in upon signup. If a non-admin user attempts to view the admin page, they receive a message and are then redirected to the login page.

## Next Steps

  - Modal error/success messages rather than alerts
  - Email verification for users
  - More UI/UX
  - Index page