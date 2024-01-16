resource "google_compute_global_address" "tfer--room-reservation-410823-rrdatabasevpcpeering-0" {
  address_type  = "INTERNAL"
  name          = "rrdatabasevpcpeering"
  network       = "projects/room-reservation-410823/global/networks/default"
  prefix_length = "24"
  project       = "room-reservation-410823"
  purpose       = "VPC_PEERING"
}
