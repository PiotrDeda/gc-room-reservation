// noinspection JSUnusedLocalSymbols

import * as gcp from "@pulumi/gcp";

/*const rr_database = new gcp.sql.DatabaseInstance("tfer--room-reservation-410823-rr-database-instance-europe-west1-0", {
    databaseVersion: "POSTGRES_15",
    name: "rr-database-instance",
    project: "room-reservation-410823",
    region: "europe-west1",
    settings: {
        ipConfiguration: {
            ipv4Enabled: false,
            privateNetwork: "projects/room-reservation-410823/global/networks/default",
            requireSsl: false,
        },
        tier: "db-f1-micro",
    },
});*/

const rr_backend = new gcp.cloudrun.Service("tfer--room-reservation-410823-europe-west1-rr-backend-1", {
    location: "europe-west1",
    name: "rr-backend",
    project: "room-reservation-410823",
    template: {
        spec: {
            containers: [{
                image: "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:latest",
                ports: [{
                    containerPort: 25497,
                }],
            }],
        },
    },
});

const rr_frontend = new gcp.cloudrun.Service("tfer--room-reservation-410823-europe-west1-rr-frontend-0", {
    location: "europe-west1",
    name: "rr-frontend",
    project: "room-reservation-410823",
    template: {
        spec: {
            containers: [{
                image: "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:latest",
                ports: [{
                    containerPort: 25498,
                }],
            }],
        },
    },
});

/*const rr_email_function = new gcp.cloudfunctions.Function("tfer--room-reservation-410823-rr-email-function-europe-west1-0", {
    name: "rr-email-function",
    project: "room-reservation-410823",
    region: "europe-west1",
    runtime: "python37",
});

const rr_database_vpc_peering = new gcp.compute.GlobalAddress("tfer--room-reservation-410823-rrdatabasevpcpeering-0", {
    addressType: "INTERNAL",
    name: "rrdatabasevpcpeering",
    network: "projects/room-reservation-410823/global/networks/default",
    prefixLength: 24,
    project: "room-reservation-410823",
    purpose: "VPC_PEERING",
});

const rr_email_pubsub = new gcp.pubsub.Topic("tfer--room-reservation-410823-rr-email-pubsub-0", {
    name: "rr-email-pubsub",
    project: "room-reservation-410823",
});

/*const rr_database_connection = new gcp.servicenetworking.Connection("tfer--room-reservation-410823-rr-database-0", {
    network: "projects/room-reservation-410823/global/networks/default",
    reservedPeeringRanges: [rr_database_vpc_peering.name],
    service: "servicenetworking.googleapis.com",
});*/
