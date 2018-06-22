# OpenShift-Example  
This example deploys both a mysql database, and a node.js application, which both communicate with each other in OpenShift.  
## Start a simple OpenShift cluster:  
`minishift start` (I had to eplicitly do `minishift start --vm-driver=kvm` to use kvm)
## Deploy mysql database:
1. `oc new-app --name=mysql5 --docker-image=mysql:5.7
        -e MYSQL_USER=user1 -e MYSQL_PASSWORD=mypa55 -e MYSQL_DATABASE=testdb
        -e MYSQL_ROOT_PASSWORD=r00tpa55`
        
2. Ensure that the database is deployed properly: `oc status`
3. Run `oc get services`, change the host and pod fields found in [index.js](https://github.com/mathu97/OpenShift-Example/blob/1dbdc76beef2d3638fbc55831d4c03be7474f9e0/index.js#L7-L8) to the cluster ip and port found in the command results
## Deploy the node.js application:  
1. Build a docker image of the node applcation (It will use the Dockerfile found in the repo):  
  `docker build -t node-app .`
2. Check if image is built by running: `docker images`
3. Deploy the locally built node-app image as an application to OpenShift:  
  `docker new-app --name=my-node-app --docker-image=node-app`
4. Ensure that the pod is created successfully: `kubectl get pods --watch` (CTRL + C, to exit)  
5. Confirm deployment by running `oc status`, and go to the server address shown in the result of this command to view everything deployed on the OpenShift web interface.
