Set-Location ./backend
docker build -t europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:latest .
docker push europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:latest

Set-Location ../frontend
docker build -t europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:latest .
docker push europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:latest
