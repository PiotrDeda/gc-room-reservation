$versionTag = Read-Host "Enter version number"

Set-Location ./backend
docker build -t europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:$versionTag .
docker push europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:$versionTag

Set-Location ../frontend
docker build -t europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:$versionTag .
docker push europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:$versionTag
