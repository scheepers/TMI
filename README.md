# minimi

minimal microservice implementation


## System requirements

1. NodeJS


## Install

In the root of minimi, run:
```
npm install
```


## Configure

minimi exposes a microservice per JSON schema in the [schema folder](./schema) using [wrappers](./wrappers).
By default schemas are exposed using the [RestWrapper](./wrappers/RestWrapper).
You may change this behavior by assigning Wrappers to schemata in [config.json](./config.json).

```
{

	"name": "example minimi instance",
	"port": 3000,

	"schema": {

		"schema-name": {
			"wrapper": "MySchemaWrapper",
		}

	}

}
```


## Start

From the folder containing minimi, run:
```
node minimi
```


## Request

Make requests to schema at:
```
http://localhost:3000/schema-name
```

Requests are responded to in the following manner:
* GET Accept=text/json - an array [JSON].
* GET Accept=json/schema - schema [JSON].
* GET Accept=text/html - form body [HTML].
* DELETE - request url parameters [JSON].
* POST and PUT - request body as [JSON].
* PATCH - both request url parameters and body [JSON].

Apart from testing HTTP requests, this is not particularly useful in itself.

The idea is to extend the JsonWrapper into more interesting wrappers, as per the
[MongoWrapper](./wrappers/MongoWrapper.js) that stores records in a MongoDB:
* GET Accept=text/json - an array of all stored records [JSON].
* GET Accept=json/schema - schema as [JSON].
* GET Accept=text/html - form body [HTML].
* DELETE - removes an entity that matches the url parameters.
* POST - creates a new record represented by the request body.
* PUT - overwrites a record matching the request url paramters with the record
  represented by the request body.
* PATCH - .

## Extend

[MongoWrapper](./wrappers/MongoWrapper.js) is an example of extending the
[RestWrapper](./wrappers/RestWrapper.js).

With a local MongoDB service running and an example
[config.json](./config.json):
```
{

	"name": "example",
	"port": 3000,

	"schema": {

		"user": {
			"wrapper": "MongoWrapper",
			"host": "localhost",
			"port": 27017
		}

	}

}
```

User records may be persisted, retrieved, updated and deleted within a store
with the same name as the schema.

Visit:
```
http://localhost:3000/schema-name
```
to view an HTML form generated using
[json-schema-form-js](https://www.npmjs.com/package/json-schema-form-js) based
on the schema.

TODO: Add validation


## Reference

http://json-schema.org/