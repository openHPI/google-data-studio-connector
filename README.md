# google-data-studio-connector

This Google Data Studio connector makes it possible to implement a server-side connector. It works by passing `getSchema` and `getData` calls to configured HTTP endpoints. Therefore, the server must provide two endpoints accepting HTTP-GET requests, which implement these functions as described in the [docs](https://developers.google.com/datastudio/connector/reference). Arguments are provided as URL parameters in [Ruby on Rails style](http://guides.rubyonrails.org/action_controller_overview.html#hash-and-array-parameters).

Configuration of the endpoint URLs takes place when adding the connector to a Google Data Studio report.

## Limitations
* OAuth is not supported
