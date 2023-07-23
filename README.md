# Movie Review App Backend Part

The backend part of the review app is made by NodeJS, Express, Mongoose connecting with MongoDb Atlas Cloud Database

The frontend part is in https://github.com/BenCheng2/movie_review_frontend.

## How to configure the app
1. Clone the repository
2. Set the npm environment
3. Create a file in main folder called .env
4. The NODE_ENV set to 'development'
5. DATABASE_URL set to your own database url (mongodb)
6. ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET set by running node and 
   "require('crypto').randomBytes(64).toString('hex')"