## Deployment


- AWS
    First of all is needed to have AWS CLIENT already installed and configured following the steps described at oficial documentation [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)


- Package.json
  Inside the file package.json, sould be configured region parameter where you want deploy this solution, also replace variables slack token, mongo uri and token to validate every request.

- Commands list
  Using command line, first locate on the root aplication folder and then you will be able to run the following commands.

```nodejs
npm install

npm run deploy:development 
#make a deploy,
#stage and profile configured at development environment
#Output: returns all settings to use all endpoints (apikey, url, etc)

npm run local-api
#create local server,
#stage and profile configured at development environment
#Output: returns all settings to use all endpoints (apikey, url, etc)
```

- After you have uploaded to aws or local your lambdas, please remember adding authorization headers to all your request, setting up with the token you setup at token variable on 
package.json