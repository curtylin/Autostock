# PROTOTYPE DEMO

# Running Development Frontend
run the following code in the WSL terminal (MAKE SURE YOU ARE IN THE auto-stock DIRECTORY !! VERY IMPORTANT)

to start a session navigate to the autostock-react directory and run the command 
`yarn start` or `yarn start` to start up the project, following which you can run a 
`yarn start-api` or `npm run start-api` to start the backend in another terminal 

Both of these processes will watch for changes that happen and will update themselves so you don't have to restart anything, so leave those terminals up

To build a project run 
`yarn build` or `npm build`


# Troubleshooting
## No Gatsby
If the following causes you troubles in the WSL terminal:

`npm install` usually fixes most of them, or you need to delete node_modules and redo that command. 

# Backend
to get the backend working go to
`/auto-stock/AutoStock-React/api`
and then run 
`python3 -m venv venv` to create a virtual environment (only need to do this once) 
following which you can run 
`. venv/bin/activate`
afterwards you install all the dependencies by running 
`pip install -U pip` and then
`pip install -r requirements.txt`  (also need to do it once) 
at which point you can run 
`yarn start-api` or `npm run start-api` to run the backend

