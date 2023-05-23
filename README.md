# Start up Walkit - Nuxt 3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Walkit - user guide
How to use the application. Visit [Netlify Walkit Application](https://kxn-walkit.netlify.app/) to register an account and signing in.
# Authentication
## Register
Click the register link and fill in the register-form, accept terms & conditions and submit the for, await the e-mail comfirmation and click it to sign-in.
## Sign in
If the sign-in link doesn't work, please try to sign in through the login-form.
## Recover account
If you forgot your password and needs to reset it, press "recover password" and submit your e-mail, await the recover link and assign your new password.

***

# Pages
## Landing page
See the goal-destination on the map, starting-point and end-point, summary of how many steps that are left to the current active destination. Goal-summary with information about the current destination, statistic of how many steps that currently have ben documented and a top-list that shows top-10 most amount of taken steps towards the active destination.

## Profile page
See personal statistics about your steps, steps taken today, current month and the total amount of steps ever logged from your account. Also see weekly stats for the current week.

## My steps
Perform CRUD-operation on your step entrys.

## Activities
See what amount of steps different activities yield per 30 minutes.

***

# Admin dashboard
## admin
To enter the admin dashboard, login and visit [admin dashboard](https://kxn-walkit.netlify.app/admin), (/admin).

## Handle destinations
To handle destination simpy fill in the form with the required information, Please note that co-ordinates needs to have brackets around them '[]'.
Many destinations can be created, but only the active one will be displayed with its data, the steps is automaticly added to the active destination. There can only be one active destination, if destination is set to active all other destinations will be set to inactive, upon deletion the destination will also be set to inactive by default. Please note that the destination-data will be preserved in the database for access to its logged steps.

## Handle activities
To add a activity simple fill in the form and submit, to change the data of a activity press the edit button and save your changes. Theese activities are the ones displayed on the activities list.

# Add steps
## Add steps amount
To add steps to the database simply press the 'Add' button in the header. Select date and amount of steps and submit, please note steps need to be higher than 1 and the date cant be in the future.

## Att steps by activity
To add steps by a activity, select the activity in the options-list and add amount of minutes that you performed the activity, the same date rules apply here.






