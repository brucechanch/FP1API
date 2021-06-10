# Instructions
- Clone and rename folder `$ git clone git@github.com:dented-academy/express-api-starter.git your_project_name_here`
- Find and rename all instance of `your_project_name_here` to your project name
- Create a `.env` file
  ```txt
  COOKIE_SECRET=put_something_random_here
  ```
- Run `$ npm install`
- Run `$ npx sequelize-cli init:migrations && npx sequelize-cli init:seeders`
- Run `$ npx sequelize-cli db:create`
- Run `$ git remote remove origin`
- Create a new repo and add the repo ssh link to remote
- Run `$ git push origin master`
