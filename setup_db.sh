sudo docker build -t mongodb -f Dockerfile.db .
sudo docker run --name mongo -i -t mongodb