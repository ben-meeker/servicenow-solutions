# Add Custom Task Table Records to My Requests

### Request Filter

### Creator: [@ben-meeker](https://github.com/ben-meeker)

When creating a custom task table, records will not show under "My Items" or "My Requests" in the ServiceNow service portal. To overcome this, a request filter record needs to be created.

## Getting Started

* Create a new Request Filter record (`request_filter.do`)
* Give the record a relevant title
* Ensure `Active` is `True`
* Set `Applies to` to `Desktop/Service Portal`
* Set the table to your custom table
* Customize filter (change as needed)
    - Set `Opened by` `is (dynamic)` `Me`, etc.
* Set `Primary field to display` to a relevant field
* Set secondary display fields as needed