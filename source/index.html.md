--- 

title: Booking Service 

language_tabs: 
   - shell
   - ruby
   - phyton
   - curl
   - json
   - javascript
   - go
   - rust

toc_footers: 
   - <a href='#'>Sign Up for a Developer Key</a> 
   - <a href='https://github.com/lavkumarv'>Documentation Powered by lav</a> 

includes: 
   - errors 

search: true 

--- 

# Introduction 
![APIs](/images/OTD-APIs.png)

**Welcome to the On the dot Booking API Reference documentation.**

This documentation is currently in Beta and will be updated over the next few months. For assistance with using the APIs, please contact our Partner team.

**All APIs require an `Authorization` header.**

You will need to register with this site to receive a token which is used in the request headers. 

# Quick Start
![HLV](/images/OTD-API-HLV-slate.png)
# Core Concepts

An order comprises the following parts:

* **job**: a parcel to be collected and delivered.  A job has one collection stop and one delivery stop, together with timeslots (explained below).  An order can contain multiple jobs.

* **stop**: a geographical location.  Each job has one collection stop and one delivery stop.

* **timeslot**: a period of time where collection and delivery should happen.  A timeslot defines a start time and an end time.  The user can either specify the timeslot values in request, or get a timeslot ID from OTD and use it.
* **webhooks**: real time push requests to an endpoint of your choice for all supported events.
![Webhooks](/images/WebHooks.png)

## Creat a booking

Here is an example request to create an order.
**POST** `https://<[env]-lastmilelink.eu>/v2/accounts/myaccount/orders`
### Sending this request with the payload to the right will result in a booking.

### Consideration must be given to the following attributes:


`{

  "id": "unique partner order number",

  "metadata": {
    "clientRefId": "unique OfficeOutlet order number",
    "serviceType": "4hour",
  },
  "customData": {
        "reference_1": "PartnerName",
        "reference_2": " Office Outlet - Staples Corner”,
        "reference_3": “44002”
                "citytrak-department": "unique Schuh order number”,
  },
  ...
      "requires": [
                "ageVerification",
                "collectionSignOff",
                 "deliverySignOff"
      ],
  ...`


```shell
'POST https://<[env]-lastmilelink.eu>/v2/accounts/myaccount/orders`
```
> The above command returns JSON structured like this:

```shell


curl -X POST \
  'http://{{host}}/{{bookingService}}/v2/accounts/{{myaccount}}/orders' \
  -H 'authorization: <your_api_token>' \
  -H 'content-type: application/json' \
  -H 'x-trace-id: 79b6b8b6-d0df-4e12-8f4d-4b435162f4e7' \
  -d '

{
  "id": "myorder",
  "metadata": {
    "serviceType": "asap"
  },
  "jobs": [
    {
      "id": "job0",
      "metadata": {
        "journeyType": "delivery"
      },
      "items": [
        {
          "id": "itemgroup0:item0",
          "quantity": 1
        }
      ],
      "collection": {
        "stopId": "stop0"
      },
      "delivery": {
        "stopId": "stop1"
      },
      "timeslot": {
        "collection": {
          "from": "2019-01-02T13:30:00.000Z",
          "to": "2019-01-02T14:30:00.000Z"
        },
        "delivery": {
          "from": "2019-01-02T18:30:00.000Z",
          "to": "2019-01-02T19:30:00.000Z"
        }
      }
    }
  ],
  "stops": [
    {
      "id": "stop0",
      "place": {
        "address": {
          "country": "GBR",
          "town": "London",
          "streets": [
            "Royal Opera House",
            "Bow Street"
          ],
          "postcode": "WC2E 9DD"
        }
      }
    },
    {
      "id": "stop1",
      "place": {
        "address": {
          "country": "GBR",
          "town": "London",
          "streets": [
            "English National Opera",
            "St Martin's Lane"
          ],
          "postcode": "WC2N 4ES"
        }
      }
    }
  ]
}
```

And here is an example response when getting an order (or the response of creating an order)


```shell
GET https://TODO/v2/accounts/myaccount/orders/myorder

Response:

{
  "id": "myorder",
  "metadata": {
    "vehicleType": "bicycle",
    "serviceType": "asap",
    "trackingUrl": "https://trackmydriver-prod.lastmilelink.eu/myaccount::myorder?token=7%2FI9ZlUZ7rnNBUkKORI2fGrPdEIaMV%2BNkrYbLFSQQW4%3D"
  },
  "jobs": [
    {
      "id": "job0",
      "metadata": {
        "journeyType": "delivery"
      },
      "items": [
        {
          "id": "itemgroup0:item0",
          "quantity": 1
        }
      ],
      "collection": {
        "stopId": "stop0"
      },
      "delivery": {
        "stopId": "stop1"
      },
      "timeslot": {
        "collection": {
          "from": "2019-01-02T13:30:00.000Z",
          "to": "2019-01-02T14:30:00.000Z"
        },
        "delivery": {
          "from": "2019-01-02T18:30:00.000Z",
          "to": "2019-01-02T19:30:00.000Z"
        }
      },
      "status": {
        "progressStatus": {
          "status": "created",
          "updatedAt": "2019-01-02T13:30:00.048Z"
        }
      }
    }
  ],
  "stops": [
    {
      "id": "stop0",
      "place": {
        "position": {
          "coordinates": {
            "longitude": -0.1265741,
            "latitude": 51.5136986
          }
        },
        "address": {
          "country": "GBR",
          "town": "London",
          "streets": [
            "Royal Opera House",
            "Bow Street"
          ],
          "postcode": "WC2E 9DD"
        }
      }
    },
    {
      "id": "stop1",
      "place": {
        "id": "place2",
        "position": {
          "coordinates": {
            "longitude": -0.1288661,
            "latitude": 51.5098553
          }
        },
        "address": {
          "country": "GBR",
          "town": "London",
          "streets": [
            "English National Opera",
            "St Martin's Lane"
          ],
          "postcode": "WC2N 4ES"
        }
      }
    }
  ],
  "status": {
    "status": "created",
    "updatedAt": "2019-01-02T13:30:00.048Z"
  },
  "createdAt": "2019-01-02T13:30:00.048Z",
  "updatedAt": "2019-01-02T13:30:00.048Z"
}
```

## Before You Start

Please contact OTD support to set up the following:

* Account
* Service types
* Places (optional)

# Job Journey Type

Each job must have a `<order>.<job>.metadata.journeyType` defined.  The valid values are:

| `journeyType` values | Meaning |
| -- | -- |
| `delivery` | The job is a normal delivery job (usually from store to home) |
| `return` | The job is a return of some products (usually from home to store) |

> **Note**: regardless of `journeyType`, `collection` is always the pick up location, and `delivery` is always the drop off location.

# Service Type

A service type defines a set of pre-agreed constraints for orders.  A new user must have the service type set up before they can create orders.

Currently supported service types: `timeslot`, `asap`, `return`, `2hour`, `3hour`, `4hour`, `sameday`, `2hour-later`, `4hour-later`.

# Place

A stop must contain a valid place, which represents a physical location.

The user can either contact OTD support to set up places for them (so they can use a place ID when creating orders), or use a valid address when creating orders.

# Status

Both order and job have status.  They are updated with realtime events.

## Job Status

>Status representing a job's execution state.

```
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
This gives the realtime courier location data.

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

## Order Status

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

## Exceptions (Incidents)

COSMO has an `Incident` service responsable of managing any job real time exceptions during:
* `Collection`
* `Transit`
* `Delivery`

The service will log the reason and code and trigger various notifcations, for example webhooks messages.

Example:
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

Incidents represents a list of exceptions that happened during the job's lifetime.

| Status | Meaning |
| ------ | ------- |
| `created` | An incident was created for the job. |
| `deleted` | An incident was deleted from the job. |

TODO: incident codes and meaning

# ETA

Example:
```
{
  "id": "myorder",
  "jobs": [
    {
      "id": "job0",
      //...
      "eta": {
        "collection": {
          "courierId": "mycourier",
          "time": "2019-01-30T15:16:17.540Z"
        },
        "delivery": {
          "courierId": "mycourier",
          "time": "2019-01-30T15:19:27.546Z"
        }
      }
    }
  ],
  //...
}
```

`collection` shows ETA to collection, `delivery` shows ETA to delivery.

Note `collection` is only available after the job has entered state `allocated`, and `delivery` is only available after `collected`.

##Amend and Cancellation

Orders and jobs can be amended after they are created, subject to certain conditions:

* Job's stop and timing details cannot be amended after it has entered `allocated` state.
* Job's item details cannot be amended after it has entered `collected` state.

Orders can be cancelled if and only if all of the jobs are in `created` state.

# Search

Orders can be searched using the search API.  The API supports paging using a `length` and `offset` concept.

Please see API for details.

# Error Codes

All error messages have the following format.

```
{
  "code": "booking:0203",
  "description": "job not found",
  "message": "more details"
}
```

A list of all error codes and HTTP response code.
| full code | http code | description |
| --- | --- | --- |
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

# Advanced Features

## Timeslots

> Note: this feature only works if you have places configured in OTD.  Please contact OTD support to set them up.

Users might want to get a list of available timeslots for their delivery, and then choose the ones they like.

This is implemented by a timeslot API.  Here is an example request:

```
POST https://TODO/v2/accounts/myaccount/timeslots

{
  "serviceType": "timeslot",
  "collection": {
    "id": "myplace"
  },
  "delivery": {
    "address": {
      "streets": [
        "Royal Opera House",
        "Bow Street"
      ],
      "town": "London",
      "country": "GBR",
      "postcode": "WC2E 9DD"
    }
  },
  "packageReadyAt": "2019-01-30T16:25:00.000Z",
  "additionalNoOfDays": 0 // TODO this is not yet changed, since we don't have time to implement it
}
```

And here is an example response:
```
{
  "chronos": {
    "2019-01-30": [
      {
        "id": "YTZkOWNjN2QtMWJkNS00MDkyLWFiZGItNGM4YmM0OWJkMDBlfjRwdkVNMEdrY3p3RDdQbWNCYWJOd2t0ck5ua2FtMX5FQzJBKzRQSH5XQzJFKzlERH4xNTQ4ODYzNTEzfjE1NDg4NjQwNjB+MH4wfjQuOTEyMDAwfnRpbWVzbG90fmZhbHNlfmZhbHNl",
        "collectionSlot": {
          "collectFrom": "2019-01-30T16:25:00.619Z",
          "collectBy": "2019-01-30T16:25:00.619Z"
        },
        "deliverySlot": {
          "deliverFrom": "2019-01-30T16:40:00.619Z",
          "deliverBy": "2019-01-30T16:40:00.619Z"
        },
        "slotExpiresAt": "2019-01-30T16:01:00.000Z"
      },
      {
        "id": "YTZkOWNjN2QtMWJkNS00MDkyLWFiZGItNGM4YmM0OWJkMDBlfjhPeGtZNXFuaHdlWExwT2hkMzVNTFJIdjJMbm9OMX5FQzJBKzRQSH5XQzJFKzlERH4xNTQ4ODYzNTEzfjE1NDg4NjQwNjB+MH4wfjQuOTEyMDAwfnRpbWVzbG90fmZhbHNlfmZhbHNl",
        "collectionSlot": {
          "collectFrom": "2019-01-30T16:30:00.619Z",
          "collectBy": "2019-01-30T16:30:00.619Z"
        },
        "deliverySlot": {
          "deliverFrom": "2019-01-30T16:45:00.619Z",
          "deliverBy": "2019-01-30T16:45:00.619Z"
        },
        "slotExpiresAt": "2019-01-30T16:01:00.000Z"
      },
      //...
    ]
  }
}
```

The user should use the `id` value in create order API as `<order>.<job>.timeslot.id`.

> Note: please ensure to use the same addresses for timeslot.


## Helpers

Jobs can have helper jobs attached to them.  A helper is a new job that is associated with a target item group/job, and shares the the same parameters (timing, stops, etc).

Helper jobs are created by specifying in the parent job the number of helpers required.

The limit of helpers per job is 10.

> Note: helper jobs cannot be amended

### Helpers and Status

Helper jobs have the same set of statuses as a normal job, but they **do not** contribute to order status.
 

**Version:** 2.0 

[Find out how to create Github repo for your OpenAPI spec.](https://github.com/Rebilly/generator-openapi-repo) 

# Authentication 

|apiKey|*API Key*|
|---|---| 

# /V2/ACCOUNTS/{ACCOUNTID}/TIMESLOTS
## ***POST*** 

**Summary:** Get available timeslots for a booking

**Description:** This API returns a list of available timeslots. Allows the options to be 
presented to an end-user for selection.


### HTTP Request 
`***POST*** /v2/accounts/{accountId}/timeslots` 

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

# /V2/ACCOUNTS/{ACCOUNTID}/ORDERS
## ***POST*** 

**Summary:** Create order

**Description:** This API creates an order with the specified ID.

This API allows the caller to override all values (timeslots, stops) with their own values.

If the caller sends only timeslot ID or place ID, then the relevant services will be called to get the details.


### HTTP Request 
`***POST*** /v2/accounts/{accountId}/orders` 

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

# /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/{ORDERID}
## ***GET*** 

**Summary:** Get order

**Description:** This API gets order with account ID and order ID.


### HTTP Request 
`***GET*** /v2/accounts/{accountId}/orders/{orderId}` 

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

# /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/SEARCH
## ***POST*** 

**Summary:** Search order

**Description:** This API returns a list of orders based on the provided search criteria.

`createdAt`, `collectedBy` and `deliveredBy` are time ranges.  If there are multiple jobs in the order, then any job satisfying these will cause the order to be returned.

`coordinates` can be any point on Earth.

Paging is supported.  See request and response for details.


### HTTP Request 
`***POST*** /v2/accounts/{accountId}/orders/search` 

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

# /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/{ORDERID}/CANCEL
## ***PUT*** 

**Summary:** Cancel order

**Description:** This API can be used to cancel an order, under the following conditions:

1. The order exists.

2. None of the jobs of the order have the status `collected` yet.

Once an order is cancelled, it cannot be re-created or un-cancelled.  You will need to create a new order in this case.


### HTTP Request 
`***PUT*** /v2/accounts/{accountId}/orders/{orderId}/cancel` 

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

# /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/{ORDERID}/AMEND
## ***PUT*** 

**Summary:** Amend order

**Description:** This API amends an order and updates the corresponding jobs in COSMO.

The following rules apply:

1. The order must already exist.

2. For each job of the order:

1) If only `items` is updated, then the job's progress status must be one of `created`, `allocated`, `arrived_at_collection` (i.e., amending is not allowed after collection).

2) If any other field is changed (including `timeslot`, `metadata`), then the job's progress status must be `created` (i.e., amending is not allowed after allocation).

3) Collection and delivery stop IDs cannot be changed.

4) If stops corresponding to the job are changed, then rule 2) applies.

Note `customData` uses incremental update.  All other fields are full-replacement update.


### HTTP Request 
`PUT /v2/accounts/{accountId}/orders/{orderId}/amend` 

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

<!-- Converted with the swagger-to-slate https://github.com/lavkumarv/swagger-to-slate -->
