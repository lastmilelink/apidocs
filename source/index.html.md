---

title: OTD V2.0 Booking Service 

language_tabs: 
  - shell: cURL
  - ruby: Ruby
  - python: Python
  - javascript: JS

toc_footers:
   - <a href='https://onthedot-bookingdraft.apigee.io' target="_blank">Sign Up for a Developer Key</a>

includes: 

search: true 

---

# Introduction 

**Welcome to the On the dot Booking Service V2.0 API's Reference documentation.**

This documentation is currently in `Beta` and will be updated over the next few months. Should you require further assistance using our API's, please contact our Partner team **partners@onthedot.com**.


<body>
<div class="flex-container">
  <div><a href="#get-it-now" id="close-image"><img src="/images/OTD_GITN.png"></a></div>
  <div><a href="#get-it-later" id="close-image"><img src="/images/OTD_GITL.png"></a></div>
  <div><a href="#return-to-depot" id="close-image"><img src="/images/OTD_RTD.png"></a></div>
  <div><a href="#real-time-tracking" id="close-image"><img src="/images/OTD_RTTE.png"></a></div>
  <div><a href="#real-time-notifications" id="close-image"><img src="/images/OTD_RTN.png"></a></div>
</div>
</body>

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

          * Child

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

<aside class="success">
The <code>code</code> panel exemplifies how to send an <code>Express/ASAP</code> request
</aside>

>`POST`  `URL`/v2/accounts/`myaccount`/orders

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

> <details><summary>Expand for code</summary>
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

```
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
