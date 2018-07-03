# Example: A Three-Tier application on a Single Node in OpenShift
This example shows how a three tier application (front-end, server, and database) is deployed on OpenShift.  
## Must Have:  
* Installed the compatible version of [Docker](https://www.docker.com/) for OpenShift (`dnf install docker-engine` on fedora)  
* Installed [OpenShift CLI](https://github.com/openshift/origin)  
* Running Docker (`systemctl start docker`) 

## Start a simple OpenShift cluster:  
`oc cluster up`  
## Create a project:  
1. `oc new-project three-tier-app`  
2. `oc project three-tier-app`  
## Deploy mysql database:
1. `oc new-app --name=mysql5 --docker-image=mysql:5.7 \`  
        `-e MYSQL_USER=user1 -e MYSQL_PASSWORD=mypa55 -e MYSQL_DATABASE=testdb \`  
        `-e MYSQL_ROOT_PASSWORD=r00tpa55`  
        
2. Ensure that the database is deployed properly: Run `oc status`  
## Deploy the node.js server:
1. Change directory to back-end: `cd back-end`  
2. Build a docker image of the node server (It will use the [Dockerfile](https://github.com/mathu97/OpenShift-Example/blob/master/Dockerfile)):  
  `docker build -t node-server .`
3. Check if the image is built: `docker images` (should see an image called node-server)  
  * Login to Docker: `docker login -u <Docker Hub Username> -p <Password>`
  * Tag the image: `docker tag node-server <user name>/node-server:<some unique tag>`
  * Push image to dokcer hub: `docker push <user name>/node-server:<tag used above>` 
4. Deploy the node-server image as an application to OpenShift:  
  `oc new-app --name=my-node-server --docker-image=<user name>/node-server:<tag>`
5. Ensure that the pod is created successfully: `oc get pods --watch` (CTRL + C, to exit)  
6. Confirm deployment by running `oc status`, and go to the server address shown in the result of this command to view everything that is deployed, on the OpenShift web interface.  
## Deploy front-end:
1. Change directory to front-end: `cd front-end`  
2. Build docker image of front-end: `docker build -t front-end .`  
3. Run `docker images` to ensure front-end image is built
  * Tag image: `docker tag front-end <user name>/front-end:<some unique tag>`
  * Push image: `docker push <user name>/front-end:<tag used above>`
4. Deploy front-end: `oc new-app --name=front-end --docker-image=<user name>/front-end:<tag>`
5. Ensure that pod is created successfully: `oc get pods --watch` (CTRL + C, to exit)  
6. Create a route so front-end can be accessed: `oc route service front-end`, and go to given URL.

## Verify  
* To connect to database/server from the front-end, you will need the database IP, database port, and serverIP.  
* This can be found by running `oc get services`  
* The database IP and port is the `CLUSTER-IP` and `PORT` respectively, listed beside `mysql5`
* The server IP is: `http://<CLUSTER-IP listed beside node-server>:<PORT listed beside node-server>`
* Afer you click connect you can create/delete a table, and add to that table.
