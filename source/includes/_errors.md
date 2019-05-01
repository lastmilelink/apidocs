# Errors

```json
Sample error code response:

{
  "code": "booking:0203",
  "description": "job not found",
  "message": "more details"
}
```

<aside class="notice">
General html error codes and the specific codes OTD V2 API will return.
</aside>

---
|General HTML Error Codes | Meaning|
|:----------:| -------|
400 | Bad Request -- Your request is invalid.
401 | Unauthorized -- Your API key is wrong.
403 | Forbidden -- The service requested is hidden for administrators only.
404 | Not Found -- The specified service could not be found.
405 | Method Not Allowed -- You tried to access a service with an invalid method.
406 | Not Acceptable -- You requested a format that isn't json.
410 | Gone -- The resource requested has been removed from our servers.
418 | Unexpected.
429 | Too Many Requests -- You're requesting too often! Slow down!
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarily offline for maintenance. Please try again later.
---

`All error messages have the following format.`

Below is a table with all `error codes` and `http` response code OTD COSMO V2 API's may return:

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

