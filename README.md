# appsody-node-demo

This demo is a simple node app (based on the aws dynamoddb [example]( https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html) modifed to use mongodb instead.

## Instructions

Check out this repo

`cd appsody-node-demo`

run `npm install` to install the node dependencies

run `npm audit fix`  to fix any audit issues

create a `.env` file in the root directory -( you can copy or rename `env_local` to `.env` ) that has the required envvar values for this demo.

run `local_setup.sh` to get mongodb running locally in docker as a daemon container

## Run demo locally

`npm start`

goto [http://localhost:3000]()

Try to register a new user.
Registering with the same email twice should cause a message

Kill the server with `^C`

## Now appsify the code

In the root of the application run

`appsody init appsodyhub/nodejs-express none`

And then lauch the server again but this time through appsody.  The code will use the running mongodb docker instance started before.

run `appsody run --docker-options "--env-file .env"`

Go back to  [http://localhost:3000]() Try to register a new user. Registering with the same email used in the original mode above  should cause a message

In index.js

Add

```
      <div id="signupDuplicate" class="alert alert-success" style="display:none">
        <p id="signupDuplicateText">Fear not, you're already on the list! You'll be among the first to know when we launch.</p>
      </div>
```

and

```
                  case 409:
                    $("#signupDuplicate").show();
                    break;
```

stop the server with `^C`

We can stop the mongo docker instance now as we no longer need it.

`docker container stop mongo`
`docker container rm mongo to remove the docker`

## Run the Demo on OpenShift

The assumption for this demo is that you have a running mongodb service ready on OpenShift and have credentials and IP address to hand.

Create a docker image of the application by running

`appsody build`

Now we need to create a descriptor for the application to run on OpenShift.  

`appsody deploy --generate-only`

This creates a deployment descriptor. To this file we must add environment variables for the application to use when deployed. Since this is a demowe will do this in the simplest way. In reality you would use a pre-created secret on OpenShift and reference that here.

Inline with the last entry in the file add the following with values substituted based on the mongodb setup in OpenShift

```
  serviceAccountName: appsody-node-demo-sa
  env:
    - name: MONGO_DB
      value: "sampledb"
    - name: MONGO_USERNAME
      value: "admin"
    - name: MONGO_PASSWORD
      value: "kabanero"
    - name: MONGO_URI
      value: "mongodb://mongodb.kabanero.svc.cluster.local:27017"
```

When complete we can push the image to docker hub and simultaneously start the deployment to OpenShift
Replace <account> with your github details

`appsody deploy -t <account>/appsody-node-demo --push  -n kabanero`

Visit your OpenShift server to see the demo deployed.  Find the related 'routes' and use the demo as before. 
