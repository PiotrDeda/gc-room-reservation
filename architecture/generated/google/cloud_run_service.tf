resource "google_cloud_run_service" "tfer--room-reservation-410823-europe-west1-rr-backend-1" {
  location = "europe-west1"
  name     = "rr-backend"
  project  = "room-reservation-410823"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend"

        ports {
          container_port = "25497"
        }
      }
    }
  }
}

resource "google_cloud_run_service" "tfer--room-reservation-410823-europe-west1-rr-frontend-0" {
  location = "europe-west1"
  name     = "rr-frontend"
  project  = "room-reservation-410823"

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend"

        ports {
          container_port = "25498"
        }
      }
    }
  }
}
