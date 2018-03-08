function getAuthType() {
  return {
    "type": "NONE",
  };
}

function isAdminUser() {
  return true;
}

function getConfig(request) {
  return {
    configParams: [
      {
        name: 'schemaUrl',
        displayName: 'Schema HTTP endpoint',
        helpText: 'Enter the URL of the endpoint that implements the getSchema function.',
      },
      {
        name: 'dataUrl',
        displayName: 'Data HTTP endpoint',
        helpText: 'Enter the URL of the endpoint that implements the getData function.',
      }
    ],
    dateRangeRequired: true,
  };
}

function getSchema(request) {
  return fetchData(request.configParams.schemaUrl, request);
}

function getData(request) {
  return fetchData(request.configParams.dataUrl, request);
}

function fetchData(url, request) {
  url = addQueryString(url, buildQueryString(request));
  var response = UrlFetchApp.fetch(url);

  return JSON.parse(response.getContentText());
}

function buildQueryString(params) {
  return Object.keys(params).map(function(key) {
  	return buildSingleQueryString(key, params[key]);
  }).join('&');
}

function buildSingleQueryString(key, value, encodedKey) {
  if(!encodedKey) {
    key = encodeURIComponent(key);
  }

  // Builds simple query string, if value is primitive
  if(Object(value) !== value) {
    return key + '=' + encodeURIComponent(value);
  }

  // Builds query string for each item in value, if it is an array
  if(Array.isArray(value)) {
    return value.map(function(item) {
      return buildSingleQueryString(key + '[]', item, true);
    }).join('&');
  }

  // Builds nested query string since value is hash
  return Object.keys(value).map(function(innerKey) {
    var newKey = key + '[' + encodeURIComponent(innerKey) + ']';
  	return buildSingleQueryString(newKey, value[innerKey], true);
  }).join('&');
}

function addQueryString(uri, queryString) {
  // Removes the hash part before operating on the uri
  var i = uri.indexOf('#');
  var hash = i === -1 ? ''  : uri.substr(i);
  uri = i === -1 ? uri : uri.substr(0, i);

  // Adds query string
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  uri = uri + separator + queryString;

  // Appends hash part again
  return uri + hash;
}
