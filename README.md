# OpenShift-Example  
This example shows how a node.js application which uses a mysql database, is deployed on OpenShift.  
## Must Have:  
* Installed the compatible version of [Docker](https://www.docker.com/) for OpenShift (`dnf instal docker-engine` on fedora)  
* Installed [OpenShift CLI](https://github.com/openshift/origin)  
* Running Docker (`systemctl start docker`) 

## Start a simple OpenShift cluster:  
`oc cluster up`
## Deploy mysql database:
1. `oc new-app --name=mysql5 --docker-image=mysql:5.7 \`  
        `-e MYSQL_USER=user1 -e MYSQL_PASSWORD=mypa55 -e MYSQL_DATABASE=testdb \`  
        `-e MYSQL_ROOT_PASSWORD=r00tpa55`  
        
2. Ensure that the database is deployed properly: Run `oc status`  
3. Expose the database: `oc expose service mysql5`   
4. Run `oc get services`, change the host and pod fields found in [index.js](https://github.com/mathu97/OpenShift-Example/blob/1dbdc76beef2d3638fbc55831d4c03be7474f9e0/index.js#L7-L8) to the cluster-ip and port found in the command results
## Deploy the node.js application:  
1. Build a docker image of the node applcation (It will use the [Dockerfile](https://github.com/mathu97/OpenShift-Example/blob/master/Dockerfile)):  
  `docker build -t node-app .`
2. Check if the image is built: `docker images` (should see an image called node-app)  
  * Login to Docker: `docker login -u <Docker Hub Username> -p <Password>`
  * Tag the image: `docker tag node-app <user name>/node-app:<some unique tag>`
  * Push image to dokcer hub: `docker push <user name>/node-app:<tag used above>` 
3. Deploy the node-app image as an application to OpenShift:  
  `oc new-app --name=my-node-app --docker-image=<user name>/node-app:<tag>`
4. Ensure that the pod is created successfully: `kubectl get pods --watch` (CTRL + C, to exit)  
5. Confirm deployment by running `oc status`, and go to the server address shown in the result of this command to view everything that is deployed, on the OpenShift web interface.  

## Verify  
* You can verify if the two pods are set up properly by going to the OpenShift web interface, and viewing the logs of the "my-node-app" application.
* You should see "Connected!" in the logs.
