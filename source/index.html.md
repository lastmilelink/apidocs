--- 

title: OTD V2.0 Booking Service 

language_tabs: 

- shell
- curl
- json
- 

toc_footers:
   - Documentation Typography conventions 
   - <a href='https://onthedot-bookingdraft.apigee.io/api-menu' target="_blank">Sign Up for a Developer Key</a> 
   - <a href='https://github.com/lord/slate'>Powered by SLATE</a> 

includes: 
   - errors 

search: true 

--- 

<style>
.flex-container {
    display: flex;
    flex-direction:row;
    max-width:70%;
  }

.flex-container > div {
    background-color: #f1f1f1;
    margin: 10px;
  }

  .flex-container div a {
    height:30px;
  }
</style>

# Introduction 

**Welcome to the On the dot Booking Service V2.0 API's Reference documentation.**

This documentation is currently in `Beta` and will be updated over the next few months. Should you require further assistance using our API's, please contact our Partner team **partners@onthedot.com**

<body>
<div class="flex-container">
  <div><a href="#get-it-now" id="close-image"><img src="/images/OTD_GITN.png"></a></div>
  <div><a href="#get-it-later" id="close-image"><img src="/images/OTD_GITL.png"></a></div>
  <div><a href="#return-to-depot" id="close-image"><img src="/images/OTD_RTD.png"></a></div>
  <div><a href="#real-time-tracking" id="close-image"><img src="/images/OTD_RTTE.png"></a></div>
  <div><a href="#real-time-notifications" id="close-image"><img src="/images/OTD_RTN.png"></a></div>
</div>
</body>

* The illustrates below is a high level view of our API features. Swagger files are downloadable from the corresponding section below
 
 ![HLV](/images/OTD-API-HLV-slate.png)

* **Swagger 2.0**

      * [Click to download the `version2.0 .yaml` files](#) .
            * `OAS3.0 coming soon`

      * [Find out how to create Github repo for your OpenAPI spec.](https://github.com/Rebilly/generator-openapi-repo)



# Quick Start
## Before You Start

Please contact OTD support to set up the following:

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

A stop must contain a valid place, which represents a physical location.

The user can either contact OTD support to set up places for them (so they can use a place ID when creating orders), or use a valid address when creating orders.

### Status

Both order and job have status.  They are updated with realtime events.

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

* You will need to register [here](apigee address) to obtain a token by creating an `app` and subscribing to our `Sandbox`.
* The `token`  must be used in the request headers as `Authorization:{{Token}}` header. 

### Authentication 
|apiKey|*API Key*|
|---|---| 

# Booking Service API's V2.0

## Create an order

```json
{
  "id": "unique partner order number",

  "metaData": {
    "clientRefId": "unique partner order number",
    "serviceType": "4hour",
  },
  "customData": {
        "reference_1": "PartnerName",
        "reference_2": " PartnerStore - Staples Corner”,
        "reference_3": “44002”
                "citytrak-department": "unique partner order number”,
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
<aside class="notice">
  <strong>Summary:</strong> Create order
  <strong>Description</strong> This API creates an order with the specified ID.
</aside>



(Express/ASAP)


This API allows the caller to override all values (timeslots, stops) with their own values.

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
---
### Get it now

<aside class="notice">
(Express/ASAP)
</aside>


>`POST`  ***`URL`/v2/accounts/`myaccount`/orders***

```json
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
> ***Note*** The above command returns JSON structured like this: here is an example response

```json
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

![Express/ASAP](/images/OTD_H_GITN.png)

* This booking type will allow you to create express/asap orders. Those deliveries will always start from `Now` 

---
### Get it later 

<aside class="notice">
(Scheduled)
</aside>

![Scheduled](/images/OTD_H_GITL.png)

---
### Return to depot

<aside class="notice">
(Scheduled)
</aside>

![Returns to Depot/Origin](/images/OTD_H_RTD.png)

---
### Real time tracking

<aside class="notice">
  Real time tracking and dynamic ETA's : <code>ETC ( estimated time of collection )</code> and <code>ETD ( estimated time of delivery )</code>
</aside>

![Real Time Notifications](/images/OTD_H_RTTE.png)

---
### Real time notifications
![Real Time Notifications](/images/OTD_H_RTN.png)

## Search an order

```json

  code_sample

```

---

* `POST` /v2/accounts/{accountId}/orders/search

---

<aside class="notice">
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

```json

code_sample

```

---

* `GET` /v2/accounts/{accountId}/orders/{orderId}

---
<aside class="notice">
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

```json
code:sample
```

---

* `PUT` /V2/ACCOUNTS/{ACCOUNTID}/ORDERS/{ORDERID}/AMEND

---

<aside class="notice">
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


** HTTP Request **
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

Orders and jobs can be amended after they are created, subject to certain conditions:

* Job's stop and timing details cannot be amended after it has entered `allocated` state.
* Job's item details cannot be amended after it has entered `collected` state.

## Cancell an order

```json

  code_sample

```

---

* `PUT` /v2/accounts/{accountId}/orders/{orderId}/cancel

---

<aside class="notice">
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

```json
Sample error code response:

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

```json
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
<aside class="notice">
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

TODO: incident codes and meaning

|Code|Description|Applytostops:|
|1A|	PartnerAmendment|	na
|1B	|PartnerCancellation|	collection,delivery
|1C|	COA|	collection,delivery
|1D	|CannotVerifyAge|	na
|1F|	CollectiontooFar|	na
|8A|	OutsideTimeslot-Control|	na
|8B|	OutsideTimeslot-Courier|	na
|8C	|OutsideTimeslot-Short|	na
|8D|	TrafficIncident–Notified|	na
|9A|	ArrivedOnTime|	collection,delivery
|9B|	CardLeft	delivery|
|9C|	CitytrakkerIssues|	na
|9D	|ConsignmentDamaged|	collection,delivery
|9E	|ContactUnavailable|	na
|9G|	CourierBrokenDown|	na
|9I|	HeldUpOnPreviousDelivery|	collection
|9J|	DelayedOnsiteByClient|	collection,delivery
|9K|	Collected/DeliveredEarly|	collection,delivery
|9L|	OutsideTimeslot(ClientReq)|	delivery
|9M	|Collected/DeliveredLate|	collection,delivery
|9N|	DeliveryRefused|	delivery
|9O|	GoodsNotReady|	collection
|9P|	IncorrectAddress|	collection,delivery
|9R|	Late-OutOfTime|	na
|9S|	Late-UnableToDeliver|	na
|9T|	NobodyHome/NoAnswer|	delivery
|9U	|PoliceIncident|	na
|9V|	Redirected|	na
|9W|	Rta/TrafficConditions|	na
|9X|	UnableToLocate/CompanyMoved|	delivery
|9Y|	WeatherConditions|	na

## Chronos

```json

sample_code

```

---

`POST` /V2/ACCOUNTS/{ACCOUNTID}/TIMESLOTS

---

<aside class="notice">
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


## Web-hooks

```json

sample_code

```

---

`POST` /V2/ACCOUNTS/{ACCOUNTID}/TIMESLOTS

---
<aside class="notice">
<strong>Summary</strong> Get push notifcations on the endpoint of your choice

<strong>Description</strong> This API returns a push messages for a range of events or exceptions
</aside>

<!-- Converted with the swagger-to-slate https://github.com/lavkumarv/swagger-to-slate -->
