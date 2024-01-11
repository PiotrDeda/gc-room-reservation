resource "google_cloud_run_service" "tfer--room-reservation-410823-europe-west1-rr-backend-1" {
  location = "europe-west1"
  name     = "rr-backend"
  project  = "room-reservation-410823"
}

resource "google_cloud_run_service" "tfer--room-reservation-410823-europe-west1-rr-frontend-0" {
  location = "europe-west1"
  name     = "rr-frontend"
  project  = "room-reservation-410823"
}
