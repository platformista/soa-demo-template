<p align="center"><a href="https://console.platform.sh/projects/create-project/?template=https://github.com/vincenzo/alteryx-demo-template/blob/main/template-definition.yaml&utm_campaign=deploy_on_platform?utm_medium=button&utm_source=affiliate_links&utm_content=https://github.com/vincenzo/alteryx-demo-template/blob/main/template-definition.yaml" target="_blank" title="Deploy with Platform.sh"><img src="https://platform.sh/images/deploy/deploy-button-lg-blue.svg"></a></p>

# Alteryx Example

This is a synthetic example that reproduces a use-case related to the Alteryx architecture.

In `.platform/applications.yaml`, we have

* a single [React app](https://docs.platform.sh/development/templates.html#nodejs) as a front end accessible at the apex
* one [API gateway](https://www.krakend.io/) that can proxy the other micro-services
* a [Python](https://docs.platform.sh/languages/python.html) service acting as "Assets Service"
    * includes [a worker instances](https://docs.platform.sh/configuration/app/workers.html) in Python; this does nothing currently (their start command is simply `sleep`), but it
      shows more topological options
* a [NodeJS](https://docs.platform.sh/languages/nodejs.html) service acting as "Settings Service"
* a [Java](https://docs.platform.sh/languages/java.html) service acting as "Data/Connector Service"
* a Keycloak (Java service) instance acting as "User Management" service
* a Vault instance (depending on your usage pattern, Platform.sh also offer [Vault as a managed service](https://docs.platform.sh/configuration/services/vault.html) when used as a
  KMS)

In `.platform/services.yaml`, we have:

- a [PostgreSQL](https://docs.platform.sh/configuration/services/postgresql.html) instance (as an example it is configured with two different schemas - and three "endpoints" or roles -
  admin, reporter and importer),
- a [MariaDB](https://docs.platform.sh/configuration/services/mysql.html) instance (for Keycloak).
- a [network storage](https://docs.platform.sh/configuration/services/network-storage.html) instance accessible by the Python and Golang apps and workers
- a [Redis](https://docs.platform.sh/configuration/services/redis.html) instance
- an [Elasticsearch](https://docs.platform.sh/configuration/services/elasticsearch.html) instance

And in `.platform/routes.yaml`:

We expose public routes for the Frontend, the API gateway as well as for Vault and Keycloak:

- `https://{default}/`
- `https://api.{default}/`
- `https://keycloack.{default}`
- `https://vault.{default}/`

## Notes

> The configuration of the internal routing of the gateway is in `api-gateway/krakend.json`. But, again, this is just a toy. In real life there is a possibility Platform.sh built-in Router Service could have enough functionality to replace it.

> Relationships between apps and services have been added just so it could be demonstrated that inter-service routing is opt-in.

> This example uses a single configuration file `applications.yaml` to set up the various apps, but there are other options that could be considered, such using a single `.platform.app.yaml` per application (in the root of each application's directory).
