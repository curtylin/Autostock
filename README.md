# Running on Docker: (NOTE: These are all run on WSL/Linux.. make sure you have docker preinstalled there.)
To build a docker image run the following command: (keep in mind, this will take a while to load ~5 minutes.. so we recommend running it on development.)
```
docker build -f Dockerfile.SingleCombined -t autostock-react .
```

To run the docker image run 
```
docker run --rm -p 5000:5000 autostock-react 
```
Which will run on http://localhost:5000/ from there you can see the application running

# To first get started with the project:
## In one terminal, To get the backend packages installed and running: 
to get the backend working go to
`/auto-stock/AutoStock-React/api`
and then run 
`python3 -m venv venv` to create a virtual environment (only need to do this once) 
following which you can run 
`. venv/bin/activate`
afterwards you install all the dependencies by running 
`pip install -U pip` and then
`pip install -r requirements.txt`  

Once all of that is done, run this command in the terminal:
`yarn start-api` or `npm run start-api` to run the backend

## Then in another terminal, to get the frontend packages installed and running: 
run the following code in the WSL terminal (MAKE SURE YOU ARE IN THE auto-stock DIRECTORY !! VERY IMPORTANT)

First run `npm install` to install the necessary packages. 

to start a session navigate to the autostock-react directory and run the command 
`yarn start` or `yarn start` to start up the project



# Troubleshooting
## No Gatsby
If the following causes you troubles in the WSL terminal:

`npm install` usually fixes most of them, or you need to delete node_modules and redo that command. 


# Building project
To build a project run 
`yarn build` or `npm build`


