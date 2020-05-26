# appsody-node-demo-backend

This demo is a simple node app representing a backend for a microservice.

It provides a single endpoint accepting http `POST` on `/signup`

## Instructions

Check out this repo

run `npm install` to install the node dependencies

run `npm audit fix`  to fix any audit issues

## Run demo locally

`npm start`

goto http://localhost:3001

Try to register a new user.

```bash
curl -X POST  http://localhost:3001/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"carlos@example.com","name":"Carlos","previewAccess":true}' \
  -v
```

Kill the server with `^C`

## Now appsodify the code

In the root of the application run

`appsody init incubator/nodejs-express none`

And then lauch the server again but this time through appsody. 

run `appsody run -p 3001:3000 -p 9230:9229 -p 8081:8080`

Go back to http://localhost:3001 Try to register a new user. 

Now you have the benefit of instrumentation added by the Appsody Stack:
- Application endpoint: http://localhost:3001/
- Health endpoint: http://localhost:3001/health
- Liveness endpoint: http://localhost:3001/live
- Readiness endpoint: http://localhost:3001/ready
- Metrics endpoint: http://localhost:3001/metrics
- Dashboard endpoint: http://localhost:3001/appmetrics-dash (development only)


