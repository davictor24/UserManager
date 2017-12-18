sudo docker build -t crud-app -f Dockerfile.production .
sudo docker run --name app -i -t crud-app