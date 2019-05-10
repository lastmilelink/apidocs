---

title: OTD V2.0 Booking Service 

language_tabs: 
  - shell: cURL
  - javascript: JS
  - ruby: Ruby
  - python: Python


toc_footers:
   - <a href='https://onthedot-bookingdraft.apigee.io' target="_blank">Sign Up for a Developer Key</a>
   - <p>&copy; 2019 ON THE DOT Technologies<p>

includes: 

search: true 

---

# Introduction 

**Welcome to the On the dot Booking Service V2.0 API's Reference documentation.**

> Samples of code language syntax highlight

```ruby
require 'OTD_API_Token'

api = OTD_API_Token::APIClient.authorize!('meowmeowmeow')
```

```python
import OTD_API_Token

api = OTD_API_Token.authorize('meowmeowmeow')
```

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```javascript
const OTD_API_Token = require('OTD_API_Token');

let api = OTD_API_Token.authorize('meowmeowmeow');
```

This documentation is currently in `Beta` and will be updated over the next few months. Should you require further assistance using our API's, please contact our Partner team **partners@onthedot.com**.

<body>
<div class="flex-container">
  <div><a href="#get-it-now" id="close-image"><img src="/images/OTD_GITN.png"></a></div>
  <div><a href="#get-it-later" id="close-image"><img src="/images/OTD_GITL.png"></a></div>
  <div><a href="#returns" id="close-image"><img src="/images/OTD_RTD.png"></a></div>
  <div><a href="#real-time-tracking" id="close-image"><img src="/images/OTD_RTTE.png"></a></div>
  <div><a href="#real-time-notifications" id="close-image"><img src="/images/OTD_RTN.png"></a></div>
</div>
</body>

> This is the Swagger Section for download

> <details><summary class="highlight plaintext">Expand for Swagger</summary>
  <pre>
    <code class="highlight javascript">
{
  "swagger": "2.0",
  "schemes": [
    "https"
  ],
  "host": "sandbox.onthedot.com",
  "basePath": "/V2",
  "x-apigee": {
    "rootRules": [
      {
        "node": "PostFlow",
        "attr": {
          "name": "PostFlow"
        },
        "content": [
          {
            "node": "Request",
            "content": ""
          },
          {
            "node": "Response",
            "content": ""
          }
        ]
      },
      {
        "node": "PreFlow",
        "attr": {
          "name": "PreFlow"
        },
        "content": [
          {
            "node": "Response",
            "content": ""
          },
          {
            "node": "Request",
            "content": [
              {
                "node": "Step",
                "content": [
                  {
                    "node": "Name",
                    "content": "rate-limiter"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "node": "DefaultFaultRule",
        "attr": {
          "name": "default-rule"
        },
        "content": [
          {
            "node": "Step",
            "content": [
              {
                "node": "Name",
                "content": "add-cors"
              }
            ]
          },
          {
            "node": "AlwaysEnforce",
            "content": true
          }
        ]
      },
      {
        "node": "HTTPProxyConnection",
        "content": [
          {
            "node": "BasePath",
            "content": "/booking"
          },
          {
            "node": "Properties",
            "content": ""
          },
          {
            "node": "VirtualHost",
            "content": "secure"
          }
        ]
      },
      {
        "node": "RouteRule",
        "attr": {
          "name": "no-route"
        },
        "content": [
          {
            "node": "Condition",
            "content": "request.verb == \"OPTIONS\""
          }
        ]
      },
      {
        "node": "RouteRule",
        "attr": {
          "name": "default"
        },
        "content": [
          {
            "node": "TargetEndpoint",
            "content": "default"
          }
        ]
      },
      {
        "node": "FaultRules",
        "content": ""
      }
    ],
    "additionalFlows": [
      {
        "node": "Flow",
        "attr": {
          "name": "pre-flight"
        },
        "content": [
          {
            "node": "Request",
            "content": ""
          },
          {
            "node": "Response",
            "content": [
              {
                "node": "Step",
                "content": [
                  {
                    "node": "Name",
                    "content": "add-cors"
                  }
                ]
              }
            ]
          },
          {
            "node": "Condition",
            "content": "request.verb == \"OPTIONS\""
          }
        ]
      },
      {
        "node": "Flow",
        "attr": {
          "name": "private-by-default"
        },
        "content": [
          {
            "node": "Description",
            "content": "Make any non-listed flow private"
          },
          {
            "node": "Response",
            "content": ""
          },
          {
            "node": "Request",
            "content": [
              {
                "node": "Step",
                "content": [
                  {
                    "node": "Name",
                    "content": "deny-external"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "info": {
    "description": "**Welcome to the On the dot Booking API Reference documentation.**\n\nThis documentation is currently in Beta and will be updated over the next few months. For assistance with using the APIs, please contact our Partner team.\n\n**All APIs require an `Authorization` header.**\n\nYou will need to register [here](https://developer.onthedot.com/getting-started) to obtain a token which is used in the request headers.\n",
    "version": "2.0.0.",
    "title": "Booking Service V2.0",
    "termsOfService": "https://www.onthedot.com/terms-and-conditions",
    "contact": {
      "email": "partners@onthedot.co.uk"
    }
  },
  "x-logo": {
    "url": "https://otd-static-content-prod.lastmilelink.eu/logos/onthedot-new.png"
  },
  "externalDocs": {
    "description": "Find out how to create Github repo for your OpenAPI spec.",
    "url": "https://github.com/Rebilly/generator-openapi-repo"
  },
  "tags": [
    {
      "name": "Timeslot",
      "description": "Everything about Timeslot"
    }
  ],
  "x-tagGroups": [
    {
      "name": "Timeslot",
      "tags": [
        "Timeslot"
      ]
    },
    {
      "name": "Order V2",
      "tags": [
        "orderV2"
      ]
    }
  ],
  "securityDefinitions": {
    "api_key": {
      "description": "API calls must provide `Authorization` header.\n",
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "x-servers": [
    {
      "url": "/localhost:8181",
      "description": "Default server"
    }
  ],
  "paths": {
    "/v2/accounts/{accountId}/timeslots": {
      "post": {
        "tags": [
          "Timeslot"
        ],
        "summary": "Get available timeslots for a booking",
        "description": "This API returns a list of available timeslots. Allows the options to be \npresented to an end-user for selection.\n",
        "operationId": "getTimeslotIDs",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "body",
            "name": "body",
            "description": "Timeslot parameters",
            "required": true,
            "schema": {
              "$ref": "#/definitions/TimeslotReq"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/TimeslotRes"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/v2/accounts/{accountId}/orders": {
      "post": {
        "tags": [
          "orderV2"
        ],
        "summary": "Create order",
        "description": "This API creates an order with the specified ID.\n\nThis API allows the caller to override all values (timeslots, stops) with their own values.\n\nIf the caller sends only timeslot ID or place ID, then the relevant services will be called to get the details.\n",
        "operationId": "createOrderV2",
        "x-apigee": {
          "included": true,
          "rootRules": [
            {
              "node": "Request",
              "content": [
                {
                  "node": "Step",
                  "content": [
                    {
                      "node": "Name",
                      "content": "platform-auth"
                    }
                  ]
                }
              ]
            }
          ]
        },
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "body",
            "name": "body",
            "description": "Order object that needs to be created",
            "required": true,
            "schema": {
              "$ref": "#/definitions/OrderV2"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/OrderResV2"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "409": {
            "description": "Conflict"
          }
        }
      }
    },
    "/v2/accounts/{accountId}/orders/{orderId}": {
      "get": {
        "tags": [
          "orderV2"
        ],
        "summary": "Get order",
        "description": "This API gets order with account ID and order ID.\n",
        "operationId": "getOrderV2",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "path",
            "name": "orderId",
            "type": "string",
            "maxLength": 140,
            "description": "order ID",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/OrderResV2"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          }
        }
      }
    },
    "/v2/accounts/{accountId}/orders/search": {
      "post": {
        "tags": [
          "orderV2"
        ],
        "summary": "Search order",
        "description": "This API returns a list of orders based on the provided search criteria.\n\n`createdAt`, `collectedBy` and `deliveredBy` are time ranges.  If there are multiple jobs in the order, then any job satisfying these will cause the order to be returned.\n\n`coordinates` can be any point on Earth.\n\nPaging is supported.  See request and response for details.\n",
        "operationId": "searchOrderV2",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "body",
            "name": "body",
            "description": "The search order parameters",
            "required": true,
            "schema": {
              "$ref": "#/definitions/SearchOrderV2"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/SearchOrderResV2"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/v2/accounts/{accountId}/orders/{orderId}/cancel": {
      "put": {
        "tags": [
          "orderV2"
        ],
        "summary": "Cancel order",
        "description": "This API can be used to cancel an order, under the following conditions:\n\n1. The order exists.\n\n2. None of the jobs of the order have the status `collected` yet.\n\nOnce an order is cancelled, it cannot be re-created or un-cancelled.  You will need to create a new order in this case.\n",
        "operationId": "cancelOrderV2",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "path",
            "name": "orderId",
            "type": "string",
            "maxLength": 140,
            "description": "order ID",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/OrderResV2"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      }
    },
    "/v2/accounts/{accountId}/orders/{orderId}/amend": {
      "put": {
        "tags": [
          "orderV2"
        ],
        "summary": "Amend order",
        "description": "This API amends an order and updates the corresponding jobs in COSMO.\n\nThe following rules apply:\n\n1. The order must already exist.\n\n2. For each job of the order:\n\n1) If only `items` is updated, then the job's progress status must be one of `created`, `allocated`, `arrived_at_collection` (i.e., amending is not allowed after collection).\n\n2) If any other field is changed (including `timeslot`, `metadata`), then the job's progress status must be `created` (i.e., amending is not allowed after allocation).\n\n3) Collection and delivery stop IDs cannot be changed.\n\n4) If stops corresponding to the job are changed, then rule 2) applies.\n\n> Note `customData` uses incremental update.  All other fields are full-replacement update.\n",
        "operationId": "amendOrderV2",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "type": "string",
            "maxLength": 140,
            "description": "account ID",
            "required": true
          },
          {
            "in": "path",
            "name": "orderId",
            "type": "string",
            "maxLength": 140,
            "description": "order ID",
            "required": true
          },
          {
            "in": "body",
            "name": "body",
            "description": "The cancel order parameters",
            "required": true,
            "schema": {
              "$ref": "#/definitions/AmendOrderV2"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/OrderResV2"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "422": {
            "description": "Unprocessable Entity"
          }
        }
      }
    }
  },
  "definitions": {
    "TimeslotReq": {
      "description": "Timeslot request",
      "type": "object",
      "required": [
        "serviceType",
        "collection",
        "delivery",
        "packageReadyAt"
      ],
      "properties": {
        "serviceType": {
          "$ref": "#/definitions/ServiceType"
        },
        "collection": {
          "description": "The collection place ID or address.\n",
          "$ref": "#/definitions/TimeslotPlace"
        },
        "delivery": {
          "description": "The delivery place ID or address.\n",
          "$ref": "#/definitions/TimeslotPlace"
        },
        "packageReadyAt": {
          "$ref": "#/definitions/PackageReadyAt"
        },
        "dates": {
          "description": "Used to override the opening/closing time of store for special dates.\n\nFormat:\n```\n{\n  \"<date>\": {\n    \"openTime\": \"<time>\",\n    \"closeTime\": \"<time>\"\n  },\n  ...\n}\n```\nwhere\n\n* `<date>` must have format `yyyy-MM-dd`, e.g., `2017-04-21`\n* `<time>` must have format `HH:mm`, e.g., `22:32`\n",
          "example": {
            "2018-08-09": {
              "openTime": "12:00",
              "closeTime": "17:00"
            },
            "2018-08-10": {
              "openTime": "12:00",
              "closeTime": "16:00"
            }
          }
        }
      }
    },
    "TimeslotPlace": {
      "description": "Place details in Timeslot request.  Must set one of `id` and `address`, but not both.\n",
      "type": "object",
      "properties": {
        "id": {
          "description": "If you pass a Place ID it must be already configured by On the dot.\n",
          "type": "string",
          "example": "myplaceID"
        },
        "address": {
          "description": "Address of the place.\n",
          "$ref": "#/definitions/Address"
        }
      }
    },
    "TimeslotRes": {
      "description": "Timeslots response.\n",
      "type": "object",
      "properties": {
        "timeslots": {
          "description": "'Timeslots' details.\n\n\nFormat:\n\n```\n\"timeslots\": {\n    {\n      \"<date>\": [\n        {\n          \"id\": \"<timeslot_id>\",\n          \"collectionSlot\": {\n            \"collectFrom\": \"<timestamp>\",\n            \"collectBy\": \"<timestamp>\"\n          },\n          \"deliverySlot\": {\n            \"deliverFrom\": \"<timestamp>\",\n            \"deliverBy\": \"<timestamp>\"\n          },\n          \"slotExpiresAt\": \"<timestamp>\"\n        },\n        ...\n      ],\n      ...\n    }\n}\n```\n\nwhere\n\n\n* `<date>` has format `yyyy-MM-dd`, e.g., `2017-04-21`\n\n* `<timestamp>` has format `2006-01-02T15:04:05.999Z` in Zulu timezone\nonly\n\n* `<timeslot_id>` is a string that should be used when creating orders\n",
          "type": "object"
        }
      },
      "example": {
        "timeslots": {
          "2018-01-11": [
            {
              "id": "NWZmNDZiNjMtMjg5NS00ZjYwLThiMDktNThjNzA5YzNhNTBifkxwNGQ1ZFd6Y1B3Tnd2R1NtMWQxUDFGYVl3WW1ZTH5FQzJBKzRQSH5XQzJOKzRFU34xNTE1NjkzODk5fjE1MTU2OTQ1MDB+MH4wfjQuMzAyMzAw",
              "collectionSlot": {
                "collectFrom": "2018-01-11T18:35:00.000Z",
                "collectBy": "2018-01-11T18:35:00.000Z"
              },
              "deliverySlot": {
                "deliverFrom": "2018-01-11T18:45:00.000Z",
                "deliverBy": "2018-01-11T18:45:00.000Z"
              },
              "slotExpiresAt": "2018-01-11T18:15:00.000Z"
            },
            {
              "id": "NWZmNDZiNjMtMjg5NS00ZjYwLThiMDktNThjNzA5YzNhNTBiflY5R2V5ZUF6aHhCQUJ3b0Y1N3c1MVpoOWRFOTNhTH5FQzJBKzRQSH5XQzJOKzRFU34xNTE1NjkzODk5fjE1MTU2OTQ1MDB+MH4wfjQuMzAyMzAw",
              "collectionSlot": {
                "collectFrom": "2018-01-11T18:40:00.000Z",
                "collectBy": "2018-01-11T18:40:00.000Z"
              },
              "deliverySlot": {
                "deliverFrom": "2018-01-11T18:50:00.000Z",
                "deliverBy": "2018-01-11T18:50:00.000Z"
              },
              "slotExpiresAt": "2018-01-11T18:15:00.000Z"
            },
            {
              "id": "NWZmNDZiNjMtMjg5NS00ZjYwLThiMDktNThjNzA5YzNhNTBifmtKYXAzcEpwSWJyd3JRcmZLZzVLbkJDeVlSeU1PTH5FQzJBKzRQSH5XQzJOKzRFU34xNTE1NjkzODk5fjE1MTU2OTQ1MDB+MH4wfjQuMzAyMzAw",
              "collectionSlot": {
                "collectFrom": "2018-01-11T18:45:00.000Z",
                "collectBy": "2018-01-11T18:45:00.000Z"
              },
              "deliverySlot": {
                "deliverFrom": "2018-01-11T18:55:00.000Z",
                "deliverBy": "2018-01-11T18:55:00.000Z"
              },
              "slotExpiresAt": "2018-01-11T18:15:00.000Z"
            }
          ]
        }
      }
    },
    "OrderV2": {
      "description": "An order object",
      "type": "object",
      "required": [
        "id",
        "metadata",
        "jobs",
        "stops"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/OrderId"
        },
        "metadata": {
          "$ref": "#/definitions/OrderMetadataV2"
        },
        "customData": {
          "$ref": "#/definitions/CustomData"
        },
        "contact": {
          "$ref": "#/definitions/Contact"
        },
        "notification": {
          "$ref": "#/definitions/Notification"
        },
        "jobs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/JobV2"
          }
        },
        "stops": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Stop"
          }
        },
        "instructions": {
          "type": "string",
          "maxLength": 500,
          "example": "Fragile items, be careful"
        }
      }
    },
    "OrderResV2": {
      "description": "An order object",
      "type": "object",
      "required": [
        "id",
        "metadata",
        "jobs",
        "stops"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/OrderId"
        },
        "accountId": {
          "$ref": "#/definitions/AccountId"
        },
        "metadata": {
          "$ref": "#/definitions/OrderMetadataResV2"
        },
        "customData": {
          "$ref": "#/definitions/CustomData"
        },
        "contact": {
          "$ref": "#/definitions/Contact"
        },
        "notification": {
          "$ref": "#/definitions/Notification"
        },
        "jobs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/JobResV2"
          }
        },
        "stops": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Stop"
          }
        },
        "instructions": {
          "type": "string",
          "example": "Fragile items, be careful"
        },
        "status": {
          "type": "object",
          "properties": {
            "status": {
              "$ref": "#/definitions/OrderStatusV2"
            },
            "updatedAt": {
              "$ref": "#/definitions/Timestamp"
            }
          }
        },
        "createdAt": {
          "$ref": "#/definitions/Timestamp"
        },
        "updatedAt": {
          "$ref": "#/definitions/Timestamp"
        }
      }
    },
    "SearchOrderV2": {
      "description": "All fields are optional, except `sortDirection`.\n\nThe different criteria are joined by \"and\" logic except in `places` where the condition can be explicitely specified (AND/OR).\n",
      "type": "object",
      "required": [
        "sortDirection"
      ],
      "properties": {
        "clientRefId": {
          "description": "Search by client ref ID.  If this parameter is set, then only the following parameters can be set:\n\n* `orderStatus`\n* `JobStatus`\n* `sortDirection`\n",
          "type": "string",
          "example": "myclientrefid1"
        },
        "createdAt": {
          "description": "The time when the order was created.\n",
          "$ref": "#/definitions/SearchParamTimeRange"
        },
        "collectedBy": {
          "$ref": "#/definitions/SearchParamTimeRange"
        },
        "deliveredBy": {
          "$ref": "#/definitions/SearchParamTimeRange"
        },
        "orderStatus": {
          "description": "Order status",
          "type": "array",
          "items": {
            "type": "string",
            "maxLength": 140,
            "example": "completed"
          }
        },
        "jobStatus": {
          "description": "Job status",
          "type": "array",
          "items": {
            "type": "string",
            "maxLength": 140,
            "example": "delivered"
          }
        },
        "sortDirection": {
          "description": "Results are sorted by `createdAt`.\n\nThis field controls whether the results are sorted in ascending or descending order.\n",
          "type": "string",
          "enum": [
            "asc",
            "desc"
          ],
          "example": "asc"
        },
        "offset": {
          "description": "The offset for paging.\n\nShould use the value in the previous response.\n",
          "type": "integer",
          "format": "int64",
          "example": 100
        },
        "length": {
          "description": "The number of orders to return.\n\nMust be between 1 and 1000.\n\nDefault to 1000.\n",
          "type": "integer",
          "format": "int64",
          "example": 100
        }
      }
    },
    "SearchOrderResV2": {
      "description": "Search response object",
      "type": "object",
      "required": [
        "offset"
      ],
      "properties": {
        "orders": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/OrderResV2"
          }
        },
        "failures": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "example": [
            "Failed to find order0",
            "Failed to find order1"
          ]
        },
        "offset": {
          "type": "integer",
          "format": "int64",
          "example": 5
        }
      }
    },
    "AmendOrderV2": {
      "description": "An amend order object",
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "customData": {
          "$ref": "#/definitions/CustomData"
        },
        "contact": {
          "$ref": "#/definitions/Contact"
        },
        "notification": {
          "$ref": "#/definitions/Notification"
        },
        "jobs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/AmendJobV2"
          }
        },
        "stops": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/AmendStopV2"
          }
        },
        "instructions": {
          "type": "string",
          "maxLength": 500,
          "example": "Fragile items, be careful"
        }
      }
    },
    "AmendJobV2": {
      "description": "An amend job object",
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/JobId"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Item"
          }
        },
        "timeslot": {
          "$ref": "#/definitions/TimeslotV2"
        }
      }
    },
    "AmendStopV2": {
      "description": "An amend stop object",
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "string",
          "maxLength": 140,
          "example": "mystop"
        },
        "contact": {
          "$ref": "#/definitions/Contact"
        },
        "place": {
          "$ref": "#/definitions/AmendPlaceV2"
        }
      }
    },
    "AmendPlaceV2": {
      "type": "object",
      "description": "An amend place object",
      "required": [
        "address"
      ],
      "properties": {
        "address": {
          "$ref": "#/definitions/Address"
        }
      }
    },
    "OrderStatusV2": {
      "description": "Order's status.\n\nNote this is different from job status, though they're related.  See beginning of doc for details.\n",
      "type": "string",
      "enum": [
        "incomplete",
        "created",
        "completed"
      ]
    },
    "OrderMetadataV2": {
      "type": "object",
      "required": [
        "serviceType"
      ],
      "properties": {
        "clientRefId": {
          "description": "Client reference ID.  This field can be reused for multiple orders.\n\nThis field is searchable.  This field is not amendable.\n",
          "type": "string",
          "example": "myclientrefid"
        },
        "serviceType": {
          "$ref": "#/definitions/ServiceType"
        },
        "isTest": {
          "description": "Mark the order as a test order.\n\nThe default value is dependent on the account state.\n\n| Account State | `isTest` |\n| ------------- | -------- |\n| `live` | `false` |\n| `onboarding | `true` |\n| `test` | `true` |\n\nNote setting this field to `false` is the same as setting to `null`.\n",
          "type": "boolean",
          "example": true
        }
      }
    },
    "OrderMetadataResV2": {
      "type": "object",
      "required": [
        "serviceType"
      ],
      "properties": {
        "sector": {
          "description": "The sector of the order.\n",
          "type": "string",
          "example": "Local"
        },
        "clientRefId": {
          "description": "Client reference ID.  This field can be reused for multiple orders.\n\nThis field is searchable.  This field is not amendable.\n",
          "type": "string",
          "example": "myclientrefid"
        },
        "serviceType": {
          "$ref": "#/definitions/ServiceType"
        },
        "isTest": {
          "description": "Mark the order as a test order.\n\nThe default value is dependent on the account state.\n\n| Account State | `isTest` |\n| ------------- | -------- |\n| `live` | `false` |\n| `onboarding | `true` |\n| `test` | `true` |\n",
          "type": "boolean",
          "example": true
        },
        "trackingUrl": {
          "description": "User can track an order once after parcels collected and before\ndelivery.\n",
          "type": "string",
          "example": "https://trackservice/myorder"
        }
      }
    },
    "JobV2": {
      "type": "object",
      "required": [
        "id",
        "metadata",
        "items",
        "timeslot",
        "collection",
        "delivery"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/JobId"
        },
        "metadata": {
          "$ref": "#/definitions/JobMetadata"
        },
        "requires": {
          "$ref": "#/definitions/Requires"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Item"
          }
        },
        "timeslot": {
          "$ref": "#/definitions/TimeslotV2"
        },
        "collection": {
          "$ref": "#/definitions/JobStop"
        },
        "delivery": {
          "$ref": "#/definitions/JobStop"
        }
      }
    },
    "JobResV2": {
      "type": "object",
      "required": [
        "id",
        "metadata",
        "items",
        "timeslot",
        "collection",
        "delivery"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/JobId"
        },
        "metadata": {
          "$ref": "#/definitions/JobMetadata"
        },
        "requires": {
          "$ref": "#/definitions/Requires"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Item"
          }
        },
        "timeslot": {
          "$ref": "#/definitions/TimeslotV2"
        },
        "collection": {
          "$ref": "#/definitions/JobStop"
        },
        "delivery": {
          "$ref": "#/definitions/JobStop"
        },
        "status": {
          "$ref": "#/definitions/JobStatus"
        },
        "eta": {
          "$ref": "#/definitions/Eta"
        }
      }
    },
    "JobStop": {
      "type": "object",
      "required": [
        "stopId"
      ],
      "properties": {
        "stopId": {
          "type": "string"
        },
        "instructions": {
          "type": "string"
        }
      }
    },
    "JobMetadata": {
      "type": "object",
      "required": [
        "journeyType"
      ],
      "properties": {
        "journeyType": {
          "$ref": "#/definitions/JourneyType"
        }
      }
    },
    "TimeslotV2": {
      "type": "object",
      "description": "Must specify either `id` or `collection` + `delivery`, but not both.\n",
      "properties": {
        "id": {
          "type": "string",
          "example": "NWZmNDZiNjMtMjg5NS00ZjYwLThiMDktNThjNzA5YzNhNTBifmtKYXAzcEpwSWJyd3JRcmZLZzVLbkJDeVlSeU1PTH5FQzJBKzRQSH5XQzJOKzRFU34xNTE1NjkzODk5fjE1MTU2OTQ1MDB+MH4wfjQuMzAyMzAw"
        },
        "collection": {
          "$ref": "#/definitions/TimeRange"
        },
        "delivery": {
          "$ref": "#/definitions/TimeRange"
        }
      }
    },
    "TimeRange": {
      "description": "A time range with from and to time.\n",
      "type": "object",
      "required": [
        "from",
        "to"
      ],
      "properties": {
        "from": {
          "$ref": "#/definitions/Timestamp"
        },
        "to": {
          "$ref": "#/definitions/Timestamp"
        }
      }
    },
    "JobStatus": {
      "type": "object",
      "description": "This contains the following status:\n\n* Job's progress status\n* Courier's status\n* Incident status\n",
      "properties": {
        "progressStatus": {
          "description": "Job's progress status\n",
          "type": "object",
          "properties": {
            "status": {
              "$ref": "#/definitions/JobProgressStatus"
            },
            "updatedAt": {
              "$ref": "#/definitions/Timestamp"
            }
          }
        },
        "courierStatus": {
          "$ref": "#/definitions/CourierLocationStatus"
        },
        "incidents": {
          "$ref": "#/definitions/Incidents"
        }
      }
    },
    "CancelOrderV2": {
      "description": "Cancel order parameters",
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "$ref": "#/definitions/OrderId"
        }
      }
    },
    "OrderId": {
      "type": "string",
      "maxLength": 140,
      "example": "myorder"
    },
    "AccountId": {
      "type": "string",
      "maxLength": 140,
      "example": "myotdaccount"
    },
    "JobId": {
      "type": "string",
      "maxLength": 140,
      "example": "myjob"
    },
    "ServiceType": {
      "description": "The service type required of an order. It must conform to service types agreed with On the dot.\n\n**Service type is mandatory only in the create delivery order API call.  For other types of create order call, this parameter is ignored.**\n",
      "type": "string",
      "enum": [
        "timeslot",
        "asap",
        "return",
        "2hour",
        "3hour",
        "4hour",
        "sameday",
        "2hour-later",
        "4hour-later"
      ],
      "example": "asap"
    },
    "JourneyType": {
      "description": "Whether the order journey is for a delivery (store to home) or a return (home to store)\n",
      "type": "string",
      "enum": [
        "delivery",
        "return"
      ],
      "example": "delivery"
    },
    "PackageReadyAt": {
      "description": "The time when the items are ready to be collected.\n\n## For create order APIs\n\nOnly used for asap order API.  Other create order API will ignore this field, because package ready time is encoded in the Timeslot ID.\n\nThe time when the items will be ready.\n\nIf not set, then downstream services will assume system time, and the response will not have this field set either.\n\nFormat `2006-01-02T15:04:05.999Z` in Zulu timezone only\n",
      "type": "string",
      "example": "2018-08-09T12:15:00.000Z"
    },
    "RequireTag": {
      "description": "Constraints on the booking.\n",
      "type": "string",
      "enum": [
        "ageVerification",
        "collectionSignOff",
        "deliverySignOff"
      ],
      "example": "ageVerification"
    },
    "Requires": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/RequireTag"
      }
    },
    "CustomData": {
      "description": "Arbitrary key:value pairs.  Value must be string.\n",
      "type": "object",
      "example": {
        "mykey1": "myvalue1",
        "mykey2": "myvalue2"
      }
    },
    "Contact": {
      "description": "This is where all order notifications are sent.\n",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "John Smith"
        },
        "mobile": {
          "type": "string",
          "example": "+447777777777"
        },
        "phone": {
          "type": "string",
          "example": "02077777777"
        },
        "email": {
          "type": "string",
          "example": "john.smith@gmail.com"
        }
      }
    },
    "Timestamp": {
      "description": "Format `2006-01-02T15:04:05.999Z` in Zulu timezone only\n",
      "type": "string",
      "format": "date-time",
      "example": "2018-08-09T12:15:00.000Z"
    },
    "Coordinates": {
      "type": "object",
      "required": [
        "longitude",
        "latitude"
      ],
      "properties": {
        "longitude": {
          "type": "number",
          "example": -0.1265741
        },
        "latitude": {
          "type": "number",
          "example": 51.5136986
        }
      }
    },
    "Postcode": {
      "type": "string",
      "example": "WC2E 9DD"
    },
    "Position": {
      "type": "object",
      "required": [
        "coordinates"
      ],
      "properties": {
        "coordinates": {
          "$ref": "#/definitions/Coordinates"
        }
      }
    },
    "Address": {
      "type": "object",
      "required": [
        "country",
        "town",
        "streets",
        "postcode"
      ],
      "properties": {
        "country": {
          "description": "ISO 3166-1 alpha-3 country code",
          "type": "string",
          "minLength": 3,
          "maxLength": 3,
          "example": "GBR"
        },
        "town": {
          "type": "string",
          "example": "London"
        },
        "streets": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "example": [
            "Royal Opera House",
            "Bow Street"
          ]
        },
        "postcode": {
          "$ref": "#/definitions/Postcode"
        }
      }
    },
    "Stop": {
      "type": "object",
      "required": [
        "id",
        "place"
      ],
      "properties": {
        "id": {
          "type": "string",
          "example": "mystop"
        },
        "contact": {
          "description": "If set to null, then\n\n\n* if order.metadata.journeyType = `delivery` and this is a collection stop, then the place's contact details configured in Place Service will be used.\n\n* if order.metadata.journeyType = `return` and this is a delivery stop, then the place's contact details configured in Place Service will be use.\n",
          "$ref": "#/definitions/Contact"
        },
        "place": {
          "$ref": "#/definitions/Place"
        },
        "instructions": {
          "type": "string",
          "example": "Please park in the courtyard"
        }
      }
    },
    "Place": {
      "type": "object",
      "description": "The following description applies to request body only (not response).\n\nWe define a `store stop` to be:\n\n* If `order.metadata.journeyType` is `delivery`, then for each item group, the collection stop is a \"store stop\"\n\n* If `order.metadata.journeyType` is `return`, then for each item group, the delivery stop is a \"store stop\"\n\n`store stop` must only have `place.id` and not `place.address` or `place.position`.\n\nThis means the place must have been created in place service.\n\nFor the other non-store stops, must set either `place.id` or `place.address`, but not both.\n\nIf `place.position` is set, then it is used for the coordinates information of `place.address`.\n",
      "properties": {
        "id": {
          "type": "string",
          "example": "myplace"
        },
        "position": {
          "$ref": "#/definitions/Position"
        },
        "addresss": {
          "$ref": "#/definitions/Address"
        }
      }
    },
    "SimplePlace": {
      "description": "In create order request, you must specify one of `id` or `address` or both.\n\nIf `address` is not supplied, then booking service will call place service with `id` to find the address and position.\n\nIf both `id` and `address` are supplied, then `address` will override the address from place service.\n\nIf `position` is not supplied, then booking service will get position from place service if `id` is present, otherwise booking service calls geocode service to find the position of `address`.\n\nIf `position` is supplied, it overrides.\n\nIn a word, values in the request have the highest priority.\n",
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "example": "myplace"
        },
        "position": {
          "$ref": "#/definitions/Position"
        },
        "addresss": {
          "$ref": "#/definitions/Address"
        },
        "instructions": {
          "type": "string",
          "example": "Please beware of foxes"
        }
      }
    },
    "OrderStatus": {
      "description": "Order's status.\n\nNote this is different from item groups status, though they're related.\n",
      "type": "string",
      "enum": [
        "incomplete",
        "created",
        "completed"
      ]
    },
    "JobProgressStatus": {
      "type": "string",
      "enum": [
        "created",
        "cancelled",
        "offline",
        "allocated",
        "arrived_at_collection",
        "collected",
        "arrived_at_delivery",
        "delivered"
      ],
      "example": "allocated"
    },
    "CourierStatus": {
      "description": "The courier's status.\n",
      "type": "string",
      "enum": [
        "idle",
        "busy"
      ],
      "example": "busy"
    },
    "Currency": {
      "description": "Must be ISO 4217 code\n",
      "type": "string",
      "example": "GBP"
    },
    "Dimension": {
      "type": "object",
      "required": [
        "width",
        "height",
        "length"
      ],
      "properties": {
        "width": {
          "description": "Unit must be centimeters.\n",
          "type": "number",
          "example": 10
        },
        "height": {
          "description": "Unit must be centimeters.\n",
          "type": "number",
          "example": 1
        },
        "length": {
          "description": "Unit must be centimeters.\n",
          "type": "number",
          "example": 20
        }
      }
    },
    "Webhook": {
      "description": "Webhook URL to send notifications to.\n",
      "type": "object",
      "required": [
        "endpoint",
        "methodType"
      ],
      "properties": {
        "endpoint": {
          "description": "URL you want to receive status update about your booking",
          "type": "string",
          "example": "https://my-notification/notification"
        },
        "methodType": {
          "type": "string",
          "enum": [
            "POST",
            "PUT"
          ],
          "example": "POST"
        },
        "headers": {
          "description": "Arbitrary key:value pairs. key and value must be string.\n",
          "type": "object",
          "example": {
            "authorization": "mykey",
            "company": "onthedot"
          }
        }
      }
    },
    "Incidents": {
      "description": "A list of incidents, sorted by `createdAt` in ascending order.\n",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Incident"
      }
    },
    "Incident": {
      "description": "Incident details.\n",
      "type": "object",
      "required": [
        "id",
        "status",
        "createdAt",
        "updatedAt",
        "impact",
        "reason"
      ],
      "properties": {
        "id": {
          "description": "The incident's ID.\n",
          "type": "string",
          "example": "9d0a8318-d16d-4893-bffa-cb6b5cb7cd4c"
        },
        "status": {
          "description": "The incident's status.  See incident status description section for details.\n",
          "type": "string",
          "enum": [
            "created",
            "deleted"
          ],
          "example": "created"
        },
        "createdAt": {
          "$ref": "#/definitions/Timestamp"
        },
        "updatedAt": {
          "$ref": "#/definitions/Timestamp"
        },
        "reason": {
          "description": "The reason of the incident.\n",
          "type": "object",
          "properties": {
            "code": {
              "description": "An incident code.\n",
              "type": "string",
              "example": "9A"
            },
            "description": {
              "description": "An incident description.\n",
              "type": "string",
              "example": "Partner Cancellation"
            }
          }
        },
        "impact": {
          "description": "The impact of the incident.\n",
          "type": "object",
          "properties": {
            "code": {
              "description": "An impact code.\n",
              "type": "string",
              "example": "7H"
            },
            "description": {
              "description": "An impact description.\n",
              "type": "string",
              "example": "Unable to Fulfil Order"
            }
          }
        }
      }
    },
    "Notification": {
      "description": "Notification endpoints where notifications will be sent to, together with the job status type to send.\n",
      "type": "object",
      "properties": {
        "emails": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NotificationEmail"
          }
        },
        "sms": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NotificationSms"
          }
        },
        "webhooks": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NotificationWebhook"
          }
        }
      }
    },
    "NotificationEmail": {
      "description": "Email for notification, together with the job status type to send.\n",
      "type": "object",
      "properties": {
        "email": {
          "description": "The email address to send notification to.\n",
          "type": "string",
          "example": "john.smith@gmail.com"
        },
        "statuses": {
          "description": "The list of job status to send.\n",
          "type": "array",
          "items": {
            "$ref": "#/definitions/JobStatus"
          }
        }
      }
    },
    "NotificationSms": {
      "description": "SMS for notification, together with the job status type to send.\n",
      "type": "object",
      "properties": {
        "number": {
          "description": "The number to send notification to.\n",
          "type": "string",
          "example": "+447777777777"
        },
        "statuses": {
          "description": "The list of job status to send.\n",
          "type": "array",
          "items": {
            "$ref": "#/definitions/JobStatus"
          }
        }
      }
    },
    "NotificationWebhook": {
      "description": "Webhook for notification, together with the job status type to send.\n",
      "type": "object",
      "required": [
        "endpoint",
        "methodType"
      ],
      "properties": {
        "endpoint": {
          "description": "URL you want to receive status update about your booking.\n",
          "type": "string",
          "example": "https://my-notification/notification"
        },
        "methodType": {
          "type": "string",
          "enum": [
            "POST",
            "PUT"
          ],
          "example": "POST"
        },
        "headers": {
          "description": "Arbitrary key:value pairs. key and value must be string.\n",
          "type": "object",
          "example": {
            "authorization": "mykey",
            "company": "onthedot"
          }
        },
        "statuses": {
          "description": "The list of job status to send.\n",
          "type": "array",
          "items": {
            "$ref": "#/definitions/JobStatus"
          }
        }
      }
    },
    "Item": {
      "type": "object",
      "required": [
        "id",
        "quantity"
      ],
      "properties": {
        "id": {
          "type": "string",
          "maxLength": 140,
          "example": "myitem"
        },
        "descriptions": {
          "type": "string",
          "maxLength": 500,
          "example": "Some awesome items"
        },
        "quantity": {
          "type": "integer",
          "format": "int64",
          "example": 2
        },
        "metrics": {
          "$ref": "#/definitions/ItemMetrics"
        }
      }
    },
    "ItemMetrics": {
      "type": "object",
      "properties": {
        "weight": {
          "description": "Unit must be grams.\n",
          "type": "number",
          "example": 500
        },
        "dimension": {
          "$ref": "#/definitions/Dimension"
        }
      }
    },
    "CourierLocationStatus": {
      "type": "object",
      "properties": {
        "location": {
          "$ref": "#/definitions/Coordinates"
        },
        "updatedAt": {
          "description": "The time when the courier's location was updated.\n\nFormat `2006-01-02T15:04:05.999Z` in Zulu timezone only\n",
          "type": "string",
          "example": "2018-08-09T12:15:15.123Z"
        }
      }
    },
    "SearchParamTimeRange": {
      "type": "object",
      "properties": {
        "from": {
          "description": "The start of the time range.\n\nFormat `2006-01-02T15:04:05.999Z` in Zulu timezone only\n",
          "type": "string",
          "example": "2018-08-08T12:13:14.123Z"
        },
        "to": {
          "description": "The end of the time range.\n\nFormat `2006-01-02T15:04:05.999Z` in Zulu timezone only\n",
          "type": "string",
          "example": "2018-08-09T12:13:14.123Z"
        }
      }
    },
    "Eta": {
      "description": "ETA for collection and/or delivery.\n",
      "type": "object",
      "properties": {
        "collection": {
          "description": "Collection ETA\n",
          "type": "object",
          "properties": {
            "courierId": {
              "description": "The courier unique identifier.\n",
              "type": "string",
              "example": "mycourier"
            },
            "time": {
              "$ref": "#/definitions/Timestamp"
            },
            "message": {
              "type": "string",
              "example": "unavailable"
            }
          }
        },
        "delivery": {
          "description": "Delivery ETA\n",
          "type": "object",
          "properties": {
            "courierId": {
              "description": "The courier unique identifier.\n",
              "type": "string",
              "example": "mycourier"
            },
            "time": {
              "$ref": "#/definitions/Timestamp"
            },
            "message": {
              "type": "string",
              "example": "unavailable"
            }
          }
        }
      }
    }
  }
}
    </code>
  </pre>
</details>

<aside class="success">
Illustration below is a high level view of our API features and integration features. Swagger files are downloadable from the corresponding section below
</aside>

 ![HLV](/images/OTD-API-HLV-slate.png)

* **Swagger 2.0 files**

      * Click [here](/swagger/v2_otd_public.yaml) to download the `v2_otd_public.yaml` file.
      * Click [here](/swagger/v2_otd_public.json) to download the `v2_otd_public.json` file.

            * `OAS3.0 coming soon`

      * [Find out how to create Github repo for your OpenAPI spec.](https://github.com/Rebilly/generator-openapi-repo)



# Quick Start
## Signup to OTD Sandbox

![Dev](/images/OTD_H_DEV.png)

* Signup to get access to our Sandbox [here](https://developer.onthedot.com/create).
    * Create an app and subcribe to the sandbox API product to obtain your `API Token`
          * Download and configure the Postman collection and build your app
                
<aside class="warning">
Sandbox <code>seed data</code> below allows developers to test their integration with orders <code>within configured SLA</code> and <code>outside configured SLA</code>.
</aside>

**Account**

* Sandbox seed data `accountID` is: **`sbx-partner`**


**Places**

* Sandbox has 1 place configured: **`sbx-place`**

      * Maximul allowed distance for `sbx-place` is: **`X miles`**


**SLA's**

* Sandbox account `sbx-partner` had the following `services` configured:`timeslot`,`timewindow`,`asap`,`return`,`2hour`,`3hour`,`4hour`,`sameday`,`2hour-later`,`4hour-later`

## Before you start

Please contact OTD partners team at [partners@onthedot.com](mailto:partners@onthedot.com) to set up the following:

* Account
* Service types
* Places (optional)

### Job Journey Type

Each job must have a `<order>.<job>.metadata.journeyType` defined.  The valid values are:

| `journeyType` values | Meaning |
| -- | -- |
| `delivery` | The job is a normal delivery job (usually from store to home) |
| `return` | The job is a return of some products (usually from home to store) |

> **Note**: regardless of `journeyType`, `collection` is always the pick up location, and `delivery` is always the drop off location.

### Service Type

A service type defines a set of pre-agreed constraints for orders.  A new user must have the service type set up before they can create orders.

Currently supported service types: `timeslot`, `asap`, `return`, `2hour`, `3hour`, `4hour`, `sameday`, `2hour-later`, `4hour-later`.

### Place

Each stop must contain a valid place(address), which represents a physical location.

The user can either contact OTD to set up places for them so they can use a place ID when creating orders, or use a valid address instead.

### Status

Both `order` and `job` have status.  They are updated with realtime events.

### Job Status

>Status representing a job's execution state.

```json
"status": {
  "progressStatus": {
    "status": "allocated",
    "updatedAt": "2019-01-02T13:18:53.087Z"
  },
  "courierStatus": {
    "location": {
      "longitude": 0.1701,
      "latitude": 51.5701
    },
    "updatedAt": "2019-01-02T13:18:53.087Z"
  },
  "incidents": [
    {
      "id": "85ad3dd6-05d3-4023-b1e6-74042b7ff138",
      "status": "created",
      "reason": {
        "code": "1B",
        "description": "Partner Cancellation"
      },
      "impact": {
        "code": "7H",
        "description": "Unable to Fulfil Order"
      },
      "createdAt": "2019-01-02T13:18:53.087Z",
      "updatedAt": "2019-01-02T13:18:53.087Z"
    }
  ]
}
```

Here is an example job status object.

* Job status is further divided into the following types.

### Progress Status

Example:
```
"progressStatus": {
  "status": "allocated",
  "updatedAt": "2019-01-02T13:18:53.087Z"
}
```
>`Nearby` is a new status trigger when a courier is xx metres from a stop.

| Status | Meaning |
| ------ | ------- |
| `created` | The job was created. |
| `allocated` | A courier has accepted the job. |
| `arrived_at_collection` | Courier has arrived at the collection address. |
| `collected` | Courier has collected the item. |
| `arrived_at_delivery` | Courier has arrived at the delivery address. |
| `delivered` | Courier has delivered the item. |
| `cancelled` | The job has been cancelled (this means the whole order has been cancelled too). |
| `returned_to_depot` | Courier failed to deliver the item and it has been returned to depot. |
| `offline` | The job is offline (this means an internal error, please contact OTD support). |

### Order Status

Order status is an aggregation of job statuses.

Example:

| Job 1 Status | Job 2 Status | Order Status |
| ----- | ----- | ----- |
| `created` | `created` | `created` |
| `allocated` | `created` | `in_progress` |
| `delivered` | `allocated` | `in_progress` |
| `delivered` | `offline` | `in_progress`, because `off_line` is not considered completed |
| `allocated` | `returned_to_depot` | `in_progress` |
| `delivered` | `returned_to_depot` | `completed` |
| `delivered` | `delivered` | `completed` |
| `cancelled` | `cancelled` | `cancelled` |
| `delivered` | `cancelled` | This never happens |
| `returned_to_depot` | `cancelled` | `cancelled`, this can only happen if customer cancelled the order and then returned to depot was called. |

### Courier Status

Example:
```
"courierStatus": {
  "location": {
    "longitude": 0.1701,
    "latitude": 51.5701
  },
  "updatedAt": "2019-01-02T13:18:53.087Z"
}
```
* This gives the realtime courier location data.

## Security
**All APIs require an `Authorization` header.**

* You will need to register [here](https://developer.onthedot.com/create) to obtain a token by creating an `app` and subscribing to our `Sandbox`.
* The `token`  must be used in the request headers as `Authorization:{{Token}}` header. 

### Authentication 
|apiKey|*API Key*|
|---|---| 



# Booking Service API's V2.0

## Create an order

Example:
```
{
  "id": "unique partner order number",

  "metaData": {
    "clientRefId": "unique partner order number",
    "serviceType": "4hour",
  },
  "customData": {
        "reference_1": "PartnerName",
        "reference_2": "PartnerStore - Staples Corner”,
        'reference_3": "4002”,
        'citytrak-department": "unique partner order number”
  },
  ...
      "requires": [
                "ageVerification",
                "collectionSignOff",
                "deliverySignOff"
      ],
  ...
}
```

Below you have specific examples for each of the order types you can create using our `booking service`.

* Consideration must be given to the following attributes shown left in `metaData`, `customData` and `requires` sections of request body depending on the agreed operations flow with us.

---

* `POST` /V2/ACCOUNTS/{ACCOUNTID}/ORDERS

---
<aside class="success">
  <strong>Summary:</strong> Create order
  <strong>Description</strong> This API creates an order with the specified ID.
</aside>

This API allows the caller to set all the job, stops, notifcations, timeslots, stops, items... with their own values.

If the caller sends only timeslot ID or place ID, then the relevant services will be called to get the details.

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| body | body | Order object that needs to be created | Yes |  |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |
| 409 | Conflict |

## Get it now

>`POST`  `URL`/v2/accounts/`myaccount`/orders

<aside class="success">
The <code>code</code> panel exemplifies how to send an <code>Express/ASAP</code> request
</aside>

![Express/ASAP](/images/OTD_H_GITN.png)


## Get it later 

<aside class="success">
The request in the <code>code pane</code> will create an order scheduled for later same day or another day in the future.
</aside>

![Scheduled](/images/OTD_H_GITL.png)

## Returns

<aside class="success">
The request sample in the left <code>code pane</code> will create a return to depot order.
</aside>

![Returns to Depot/Origin](/images/OTD_H_RTD.png)

## Real time tracking

<aside class="success">
  Real time tracking and dynamic ETA's : <code><strong>ETC</strong> ( estimated time of collection )</code> and <code><strong>ETD</strong> ( estimated time of delivery )</code>
</aside>

![Real Time Notifications](/images/OTD_H_RTTE.png)

## Real time notifications

   
      indented code (4 spaces + 2 spaces for the list 
      indentation, one blank line above, one below),


<aside class="notice">
  Real time notifications as `e-mail`, `sms` or `web-hooks` containing dynamic ETA's : <code><strong>ETC</strong> ( estimated time of collection )</code> and <code><strong>ETD</strong> ( estimated time of delivery )</code>, `courier name`, `proof of delivery and collection`, e.t.c.
</aside>

![Real Time Notifications](/images/OTD_H_RTN.png)

## Search an order

```

  code_sample

```

---

* `POST` /v2/accounts/{accountId}/orders/search

---

<aside class="success">
  <strong>Summary:</strong> Search an order
  <strong>Description</strong> This API returns a list of orders based on the provided search criteria.
</aside>

`createdAt`, `collectedBy` and `deliveredBy` are time ranges.  If there are multiple jobs in the order, then any job satisfying these will cause the order to be returned.

`coordinates` can be any point on Earth.

Paging is supported.  See request and response for details.


**HTTP Request**
`POST`` /v2/accounts/{accountId}/orders/search` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| body | body | The search order parameters | Yes |  |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |

## Get an order

```

code_sample

```

---

* `GET` /v2/accounts/{accountId}/orders/{orderId}

---
<aside class="success">
  <strong>Summary:</strong> <code>GET</code> order
  <strong>Description</strong> This API gets an order by <code>accountID</code> and <code>orderID</code>.
</aside>

**HTTP Request**
`GET` /v2/accounts/{accountId}/orders/{orderId}

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| orderId | path | order ID | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Not found |

##Amend an order

```
code:sample
```

---

* `PUT` /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/{ORDERID}/AMEND

---

<aside class="success">
  <strong>Summary:</strong> Amend order
  <strong>Description</strong> This API amends an order and updates the corresponding jobs in COSMO.
</aside>

The following rules apply:

1. The order must already exist.

2. For each job of the order:

1) If only `items` is updated, then the job's progress status must be one of `created`, `allocated`, `arrived_at_collection` (i.e., amending is not allowed after collection).

2) If any other field is changed (including `timeslot`, `metadata`), then the job's progress status must be `created` (i.e., amending is not allowed after allocation).

3) Collection and delivery stop IDs cannot be changed.

4) If stops corresponding to the job are changed, then rule 2) applies.

Note `customData` uses incremental update.  All other fields are full-replacement update.

>`PUT` /v2/accounts/`{accountId}`/orders/`{orderId}`/amend

**HTTP Request >>>>>**

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| orderId | path | order ID | Yes | string |
| body | body | The cancel order parameters | Yes |  |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |
| 422 | Unprocessable Entity |

Orders and jobs can be amended after they are created, subject to certain conditions:

* Job's stop and timing details cannot be amended after it has entered `allocated` state.
* Job's item details cannot be amended after it has entered `collected` state.

## Cancell an order

> **Request**   **`PUT`**

> <details><summary class="highlight plaintext">Expand for code</summary>
<pre>
  <code class="json">
{
  "code":"sample",
  "code":"sample",
  "code":"sample",
  "code":"sample"
}
  </code>
</pre>
</details>

```
{
  "code":"sample",
  "code":"sample",
  "code":"sample",
  "code":"sample"
}
```

---

* `PUT` /v2/accounts/`{accountId}`/orders/`{orderId}`/cancel

---

<aside class="success">
  <strong>Summary:</strong> Cancel order
  <strong>Description</strong> This API can be used to cancel an order, under the following conditions:
</aside>

Orders can be cancelled if and only if all of the jobs are in `created` state.

1. The order exists.

2. None of the jobs of the order have the status `collected` yet.

Once an order is cancelled, it cannot be re-created or un-cancelled.  You will need to create a new order in this case.


**HTTP Request**
`PUT` /v2/accounts/{accountId}/orders/{orderId}/cancel

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| orderId | path | order ID | Yes | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |


## Http Error Codes

```js
//Sample error code response:

{
  "code": "booking:0203",
  "description": "job not found",
  "message": "more details"
}
```

`All error messages have the following format.`

Below is a table with all `error codes` and `http` response code.

| full code | http code | description |
|---|---|---|
| default:0000 | 500 | Unknown |
| default:0001 | 400 | Invalid request |
| default:0002 | 404 | Not found |
| booking:0101 | 500 | geocode service failed |
| booking:0102 | 500 | place service failed |
| booking:0103 | 500 | SLA service failed |
| booking:0104 | 500 | job service failed |
| booking:0105 | 500 | chronos service failed |
| booking:0106 | 500 | capacity service failed |
| booking:0107 | 500 | account service failed |
| booking:0108 | 500 | tracking service failed |
| booking:0108 | 500 | capacity service (zone API) failed |
| booking:0202 | 422 | invalid place. please create a support ticket to configure your account with otd |
| booking:0203 | 422 | invalid SLA. please create a support ticket to configure your account with otd |
| booking:0206 | 422 | invalid timeslot. please create a support ticket to configure your account with otd |
| booking:0207 | 422 | invalid capacity. please create a support ticket to configure your account with otd |
| booking:0208 | 422 | invalid account. please create a support ticket to configure your account with otd |
| booking:0210 | 422 | invalid zone. please create a support ticket to configure your account with otd |
| booking:0301 | 422 | order not cancellable |
| booking:0302 | 409 | concurrent modification |
| booking:0303 | 500 | failed to delete job |
| booking:0304 | 400 | order not amendable |
| booking:02XX | 500 | unknown server error with On the dot services |
| booking:401 | 401 | Invalid authentication credentials |
| booking:403 | 403 | Permission denied to access resource |

## Exceptions (Incidents)

```
"incidents": [
  {
    "id": "85ad3dd6-05d3-4023-b1e6-74042b7ff138",
    "status": "created",
    "reason": {
      "code": "1B",
      "description": "Partner Cancellation"
    },
    "impact": {
      "code": "7H",
      "description": "Unable to Fulfil Order"
    },
    "createdAt": "2019-01-02T13:18:53.087Z",
    "updatedAt": "2019-01-02T13:18:53.087Z"
  }
]
```
<aside class="success">
COSMO has an internal `Incident` service responsable of managing any job real time exceptions during:
</aside>
* `Collection`
* `Transit`
* `Delivery`

The service will log the `code, verbose reason` then trigger various notifcations if configured, for example send web-hooks, sms's or e-mails.

Incidents represents a list of exceptions that happened during the job's lifetime.

| Status | Meaning |
| ------ | ------- |
| `created` | An incident was created for the job. |
| `deleted` | An incident was deleted from the job. |


Code|Description|Apply to stops
-----|----------|---------------
1A|Partner Amendment|na
1B|Partner Cancellation|collection, delivery
1C|COA|collection| delivery
1D|Cannot Verify Age|na
1F|Collection too Far|na
8A|Outside Timeslot - Control|na
8B|Outside Timeslot - Courier|na
8C|Outside Timeslot - Short|na
8D|Traffic Incident – Notified|na
9A|Arrived On Time|collection, delivery
9B|Card Left|delivery
9C|Citytrakker Issues|na
9D|Consignment Damaged|collection, delivery
9E|Contact Unavailable|na
9G|Courier Broken Down|na
9I|Held Up On Previous Delivery|collection
9J|Delayed Onsite By Client|collection, delivery
9K|Collected/Delivered Early|collection, delivery
9L|Outside Timeslot (Client Req)|delivery
9M|Collected/Delivered Late|collection, delivery
9N|Delivery Refused|delivery
9O|Goods Not Ready|collection
9P|Incorrect Address|collection| delivery
9R|Late - Out Of Time|na
9S|Late - Unable To Deliver|na
9T|Nobody Home/No Answer|delivery
9U|Police Incident|na
9V|Redirected|na
9W|Rta/Traffic Conditions|na
9X|Unable To Locate/Company Moved|delivery
9Y|Weather Conditions|na

## Chronos

```

sample_code

```

---

`POST` /V2/ACCOUNTS/{ACCOUNTID}/TIMESLOTS

---

<aside class="success">
<strong>Summary:</strong> Get available timeslots for a booking

<strong>Description:</strong> This API returns a list of available timeslots. Allows the options to be 
presented to an end-user for selection.
</aside>

 **HTTP Request**
`POST` /v2/accounts/{accountId}/timeslots` 

**Parameters**

| Name | Located in | Description | Required | Type |
| ---- | ---------- | ----------- | -------- | ---- |
| accountId | path | account ID | Yes | string |
| body | body | Chronos parameters | Yes |  |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad request |
| 401 | Unauthorized |


# Web-hooks

```

sample_code

```

---

`POST` /V2/ACCOUNTS/{ACCOUNTID}/TIMESLOTS

---
<aside class="success">
<strong>Summary</strong> Get push notifcations on the endpoint of your choice

<strong>Description</strong> This API returns a push messages for a range of events or exceptions
</aside>

<!-- Converted with the swagger-to-slate https://github.com/lavkumarv/swagger-to-slate -->
