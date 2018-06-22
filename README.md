# OpenShift-Example  
This example deploys both a mysql database, and a nodejs application, which both communicate with each other in OpenShift.  
## Start an OpenShift Cluster:  
1. `oc cluster up`  
2. `oc login -u developer -p developer`
## Deploy mysql database:
1. `oc new-app --name=mysql5 --docker-image=mysql:5.7
        -e MYSQL_USER=user1 -e MYSQL_PASSWORD=mypa55 -e MYSQL_DATABASE=testdb
        -e MYSQL_ROOT_PASSWORD=r00tpa55`
        
2. Ensure that the database is deployed properly: `oc status`  
## Deploy the node application:  
1. Build a docker image of the node applcation (It will use the Dockerfile found in the repo):  
  `docker build -t node-app .`
2. Check if image is built by running: `docker images`
3. Deploy the locally built node-app image as an application to OpenShift:  
  `docker new-app --name=my-node-app --docker-image=node-app`  
4. Confirm deployment by running `oc status`, and go to the server address shown in the result of this command.
