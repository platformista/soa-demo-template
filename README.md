# Alteryx Example

This is a synthetic example that reproduces a use-case related to the Alteryx architecture.

In `.platform/applications.yaml`: 

* We have a single React app as a front end accessible at the apex.
* We have one API gateway written in nodejs that can proxy the other micro-services
* We have 4 microservices, one in Go, one in Java, one in Python and one in NodeJS
* a Keycloak instance
* a Vault instance (depending on your usage pattern - we also have vault as a managed service when used as a KMS)
* And we have added two worker instances - one in Python and one in Go - these do nothing actually (their start command is simply `sleep`) - but they show more topological options
* For added realism we also introduce a network storage instance accessible by the Python and Golang apps and workers

Apps: frontend, golang-service, java-service, keycloack, nodejs-service, nodejs-service-gateway, python-service, vault, python_queue_handler, go_queue_handler

Notes:

    The configuration of the internal routing of the gateway is in `nodejs-service-gateway/config/gateway.config.yml` but again, this is just a toy. In real life I am not at all sure this component will be needed. Potentially our Router has (or could have) enough functionality to actually replace it.

    We have sprinkled some relationships between apps and services so it could be demosntrated that inter-service routing is opt-in.

    In this example we put everything in a single Yaml file. But there are other options such as putting a `.platform.app.yaml` in the root of each app. 

In `.platform/services.yaml`: 

There are two databases: One a postgres to serve the microservices (as an example it is configured with two different schemas - and three "endpoints" or roles - admin, reporter and importer), and one MariaDB for Keycloack.

Services: dbpostgres, keycloack-database

And in `.platform/routes.yaml`: 

We expose public routes for the Frontend, the API gateway as well as for Vault and Keycloack.
Routes: "https://{default}/", "https://api.{default}/", "https://keycloack.{default}", "https://vault.{default}/"

