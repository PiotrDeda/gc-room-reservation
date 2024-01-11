resource "google_service_networking_connection" "tfer--room-reservation-410823-rr-database-0" {
  network                 = "projects/room-reservation-410823/global/networks/default"
  reserved_peering_ranges = ["${google_compute_global_address.tfer--room-reservation-410823-rrdatabasevpcpeering-0.name}"]
  service                 = "servicenetworking.googleapis.com"
}
