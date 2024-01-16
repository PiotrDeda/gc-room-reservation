resource "google_cloudfunctions_function" "tfer--room-reservation-410823-rr-email-function-europe-west1-0" {
  name    = "rr-email-function"
  project = "room-reservation-410823"
  region  = "europe-west1"
  runtime = "python37"
}
