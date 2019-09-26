# FonoAPI for javascript, only with modern web apis (NO jQuery)
A javascript client for **FonoApi - Mobile Device Description API** https://github.com/shakee93/fonoapi written without **JQuery**  and using only **modern web javascript apis**:

- promises https://caniuse.com/#feat=promises
- fetch https://caniuse.com/#feat=fetch
- URL https://caniuse.com/#feat=url
- URLSearchParams https://caniuse.com/#feat=urlsearchparams

All these apis are covered (at the time I'm writing, *June 2019*) by **90%** approximately of all the browsers installed worldwide. On [caniuse.com](https://caniuse.com/) you can find more information about api availability on browsers. Anyway you can use a wrapper for these features.

#### Why modern web apis and not a framework?

I write a similar api because I think that modern features of javascript, like **promises** and the **fetch api** should be used by developers more frequently. So we motivate browser developers to implement these new features more quickly! Modern apis make writing code more **simple** and intuitive, and make it run without downloading external, sometimes heavy in terms on **network bandwith**, libraries like jQuery. 

------

## Library

The library expose the object **FonoApiClient** wich contains all the methods to make requests.

#### Library import and initialization

```html
<script src="fonoapi_client.js"></script>
<script>
	FonoApiClient.setToken("XXXX") //Put your token here
	var token = FonoApiClient.getToken() //Get token
</script>
```

#### Endpoints

Every endpoint is associated to a method of the same name. The data returned from these methods are arrays of objects containing devices information, as described [here](https://github.com/shakee93/fonoapi/blob/master/resultset.md).

###### Method: getDevice() - endpoint /getdevice (go to [specification](https://github.com/shakee93/fonoapi#method-getdevice-httpsfonoapifreshpixlcomv1getdevice))

Search for a device with the specified brand and name.

Accepts the following arguments:

- **device** - A string. It's **not** optional. Name or part of the name of the device to search.
- **brand** - A string. It's optional. The brand that produces the device to search.
- **offsetPosition** - A positive integer. It's optional. When a set of results is returned you can get a specific device by passing the position of your device on the result set. Starts from 0. Default returns all possible results.

Returns: A promise that resolves to an array of devices.

```javascript
//Declaration
function getDevice(device: string, brand?: string, offsetPosition?: number) => Promise<object[]>

//Examples
//Obtain all google pixel phones and print them to console.log
var promiseA = FonoApiClient.getDevice("pixel", "google").then(console.log)

//Obtain the second google pixel phone (as we have the previous request) and print it to console.log
var promiseB = FonoApiClient.getDevice("pixel", "google", 2)
	.then(devices => device[0]) //Pick the first device, we have only one
	.then(console.log)
```

###### Method: getLatest() - endpoint /getlatest (go to [specification](https://github.com/shakee93/fonoapi#method-getlatest-httpsfonoapifreshpixlcomv1getlatest))

Return the latest phones of one brand. Can limit the result.

Accepts the following arguments:

- **brand** - A string. It's **not** optional. The brand that produces the device to search.
- **limit** - A positive integer. It's optional. Limit the result length. Depending on server implementation, may returns a reduced number of devices than expected.

Returns: A promise that resolves to an array of devices.

```javascript
//Declaration
function getLatest(brand: string, limit?: number) => Promise<object[]>
    
//Examples
//Obtain all the latest google phones usign the server limit and print them to console.log
var promiseA = FonoApiClient.getLatest("google").then(console.log)

//Obtain the 10 latest google phones (as we have the previous request) and print them to console.log
var promiseB = FonoApiClient.getLatest("google", 10).then(console.log)

```

