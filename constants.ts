
export const DOCKERFILE_CONTENT = `
# Stage 1: Build the React application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight server
FROM nginx:1.25-alpine

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
`;

export const APP_DEPLOYMENT_YAML = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: k8s-task-runner-app
  labels:
    app: k8s-task-runner
spec:
  replicas: 2
  selector:
    matchLabels:
      app: k8s-task-runner
  template:
    metadata:
      labels:
        app: k8s-task-runner
    spec:
      containers:
      - name: k8s-task-runner
        image: your-repo/k8s-task-runner:latest # Replace with your actual image
        ports:
        - containerPort: 80
        env:
        - name: MONGO_HOST
          value: "mongodb-service"
        - name: MONGO_PORT
          value: "27017"
        - name: MONGO_DB_NAME
          value: "task_executions"
        # It's better to use secrets for credentials
        # - name: MONGO_USER
        #   valueFrom:
        #     secretKeyRef:
        #       name: mongodb-secret
        #       key: username
        # - name: MONGO_PASSWORD
        #   valueFrom:
        #     secretKeyRef:
        #       name: mongodb-secret
        #       key: password
`;

export const APP_SERVICE_YAML = `
apiVersion: v1
kind: Service
metadata:
  name: k8s-task-runner-service
spec:
  selector:
    app: k8s-task-runner
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  # Use NodePort to expose the service on each node's IP at a static port.
  # For production, an Ingress controller is recommended.
  type: NodePort 
  # type: LoadBalancer # Alternative for cloud environments
`;

export const MONGO_STATEFULSET_YAML = `
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: "mongodb-service"
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:6.0
        ports:
        - containerPort: 27017
          name: mongo
        volumeMounts:
        - name: mongo-persistent-storage
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: mongo-persistent-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
`;

export const MONGO_SERVICE_YAML = `
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
  labels:
    app: mongodb
spec:
  ports:
  - port: 27017
    targetPort: 27017
  clusterIP: None # Creates a headless service
  selector:
    app: mongodb
`;
