resource "google_sql_database_instance" "tfer--room-reservation-410823-rr-database-instance-europe-west1-0" {
  database_version = "POSTGRES_15"
  name             = "rr-database-instance"
  project          = "room-reservation-410823"
  region           = "europe-west1"

  settings {
    ip_configuration {
      ipv4_enabled    = "false"
      private_network = "projects/room-reservation-410823/global/networks/default"
      require_ssl     = "false"
    }

    tier = "db-f1-micro"
  }
}
