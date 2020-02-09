This project was built whit Lerna as a dependency manager and structured with Yarn workspace.
It's split in two different sub-project, one of them is the server project running with Node and Express,
and the other it's running a frontend application built with React.

## The frontend application

This is stored in the `packages/app` directory, and you can run these commands to start to use:
### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## The server application

This it stored in the `packages/api` directory and for runs you need this command:

### `yarn dev`

This command compiles the project and exposes them in the address `http://localhost:7000` 

### `yarn prod`
