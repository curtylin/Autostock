# Running Development
run the following code in the WSL terminal (MAKE SURE YOU ARE IN THE auto-stock DIRECTORY !! VERY IMPORTANT)
```
npm run develop
```


# Troubleshooting
## No Gatsby
If the following causes you troubles in the WSL terminal:
```
gatsby -v
``` 
Follow the steps [here](https://www.gatsbyjs.com/docs/tutorial/part-0/#set-default-nodejs-version):

Essentially:
```
npm --version
npm install -g gatsby-cli
gatsby --version
```

## ENOENT when running 'npm run develop'
When running 
```
curtis@Curtis-PC2:~/code-repo$ npm run develop
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/curtis/code-repo/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open '/home/curtis/code-repo/package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/curtis/.npm/_logs/2021-11-19T10_00_50_656Z-debug.log
```
Make sure to be in the auto-stock directory:
```
curtis@Curtis-PC2:~/code-repo/auto-stock$ npm run develop

> auto-stock@1.0.0 develop /home/curtis/code-repo/auto-stock
> gatsby develop

success open and validate gatsby-configs, load plugins - 0.072s
success onPreInit - 0.001s
success initialize cache - 0.035s
success copy gatsby files - 0.074s
success Compiling Gatsby Functions - 0.160s
success onPreBootstrap - 0.167s
success createSchemaCustomization - 0.002s
success Checking for changed pages - 0.002s
success source and transform nodes - 0.070s
success building schema - 0.252s
success createPages - 0.002s
success createPagesStatefully - 0.061s
info Total nodes: 25, SitePage nodes: 4 (use --verbose for breakdown)
success Checking for changed pages - 0.001s
success write out redirect data - 0.009s
success onPostBootstrap - 0.002s
info bootstrap finished - 1.956s
success onPreExtractQueries - 0.001s
success extract queries from components - 0.167s
success write out requires - 0.005s
success run page queries - 0.017s - 1/1 58.08/s
⠀
You can now view auto-stock in the browser.
⠀
  http://localhost:8000/
⠀
View GraphiQL, an in-browser IDE, to explore your site's data and schema
⠀
  http://localhost:8000/___graphql
⠀
Note that the development build is not optimized.
To create a production build, use gatsby build
⠀
success Building development bundle - 2.451s
success Writing page-data.json files to public directory - 0.088s - 3/4 45.46/s
```
