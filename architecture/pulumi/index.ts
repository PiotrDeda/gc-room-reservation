// noinspection JSUnusedLocalSymbols

import * as gcp from "@pulumi/gcp";
import {Config} from "@pulumi/pulumi";

const config = new Config();
const project = "room-reservation-410823";
const region = "europe-west1";
const db_user = "rradmin";
const db_password = config.requireSecret("dbPass");
const email_username = "roomreservationsender@gmail.com";
const email_password = config.requireSecret("emailPass");
const email_recipient = "roomreservationrecipient@op.pl";

const rr_database = new gcp.sql.DatabaseInstance("tfer--room-reservation-410823-rr-database-instance-europe-west1-0", {
    databaseVersion: "POSTGRES_15",
    deletionProtection: false,
    name: "rr-database-instance",
    project: project,
    region: region,
    settings: {
        ipConfiguration: {
            authorizedNetworks: [{
                name: "infinite-power",
                value: "0.0.0.0/0",
            }],
            ipv4Enabled: true,
            requireSsl: false,
        },
        tier: "db-f1-micro",
    },
});

const rr_database_db = new gcp.sql.Database("tfer--room-reservation-410823-rr-database-instance-europe-west1-rr-database-db-0", {
    instance: rr_database.name,
    name: "room_reservation",
    project: project,
});

const rr_database_user = new gcp.sql.User("tfer--room-reservation-410823-rr-database-instance-europe-west1-rr-database-user-0", {
    instance: rr_database.name,
    name: db_user,
    password: db_password,
    project: project,
});

const rr_noauth = gcp.organizations.getIAMPolicyOutput({
    bindings: [{
        role: "roles/run.invoker",
        members: ["allUsers"],
    }],
});

const rr_backend = new gcp.cloudrunv2.Service("tfer--room-reservation-410823-europe-west1-rr-backend-0", {
    location: region,
    name: "rr-backend",
    project: project,
    template: {
        containers: [{
            image: "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-backend:latest",
            ports: [{
                containerPort: 25497,
            }],
            envs: [
                {
                    name: "CONNECTION_NAME",
                    value: `${project}:${region}:rr-database-instance`,
                },
                {
                    name: "DB_USER",
                    value: db_user,
                },
                {
                    name: "DB_PASS",
                    value: db_password,
                },
            ],
            volumeMounts: [{
                name: "cloudsql",
                mountPath: "/cloudsql",
            }],
        }],
        volumes: [{
            name: "cloudsql",
            cloudSqlInstance: {
                instances: [rr_database.connectionName],
            },
        }],
    },
});

const rr_backend_access_control = new gcp.cloudrunv2.ServiceIamPolicy("room-reservation-410823-europe-west1-rr-backend-access-control-0", {
    name: "rr-backend",
    location: rr_backend.location,
    project: rr_backend.project,
    policyData: rr_noauth.apply(noauth => noauth.policyData),
});

const rr_frontend = new gcp.cloudrunv2.Service("tfer--room-reservation-410823-europe-west1-rr-frontend-0", {
    location: region,
    name: "rr-frontend",
    project: project,
    template: {
        containers: [{
            image: "europe-west1-docker.pkg.dev/room-reservation-410823/rr-image-repository/rr-frontend:latest",
            ports: [{
                containerPort: 25498,
            }],
        }],
    },
});

const rr_frontend_access_control = new gcp.cloudrunv2.ServiceIamPolicy("room-reservation-410823-europe-west1-rr-frontend-access-control-0", {
    name: "rr-frontend",
    location: rr_frontend.location,
    project: rr_frontend.project,
    policyData: rr_noauth.apply(noauth => noauth.policyData),
});

const rr_send_email_function = new gcp.cloudfunctionsv2.Function("room-reservation-410823-europe-west1-rr-send-email-0", {
    buildConfig: {
        runtime: "python39",
        entryPoint: "send_email",
        source: {
            storageSource: {
                bucket: "deda-gcp-rr-functions",
                object: "function.zip",
            },
        },
    },
    location: region,
    name: "rr-send-email",
    project: project,
    serviceConfig: {
        environmentVariables: {
            BACKEND_URL: rr_backend.uri,
            SENDER_MAIL: email_username,
            SENDER_PASSWORD: email_password,
            RECIPIENT_MAIL: email_recipient,
        },
    },
});

const rr_send_email_function_access_control = new gcp.cloudrunv2.ServiceIamPolicy("room-reservation-410823-europe-west1-rr-send-email-access-control-0", {
    name: "rr-send-email",
    location: rr_send_email_function.location,
    project: rr_send_email_function.project,
    policyData: rr_noauth.apply(noauth => noauth.policyData),
});

const rr_schedule_send_email = new gcp.cloudscheduler.Job("oom-reservation-410823-europe-west1-rr-schedule-send-email-0", {
    httpTarget: {
        httpMethod: "GET",
        uri: `https://${region}-${project}.cloudfunctions.net/rr-send-email`,
    },
    name: "rr-schedule-send-email",
    project: project,
    region: region,
    schedule: "0 7 * * *",
});
