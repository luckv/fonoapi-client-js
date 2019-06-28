// eslint-disable-next-line no-unused-vars
const FonoApiClient = (() => {

    /**
     * Remove keys with undefined values
     * @param {object} obj The object to operate on
     * @param {boolean} clone True if modify a copy of the object
     * @returns {object} The object without undefined values
     */
    function removeUndefinedValues(obj, clone = false) {

        let temp = clone ? Object.assign({}, obj) : obj

        Object.keys(temp).forEach(key => {
            if (typeof temp[key] === "undefined") {
                delete temp[key]
            }
        })

        return temp
    }

    const fonoApiEndpoint = "https://fonoapi.freshpixl.com/"

    /**
     * Make a GET request that expect a JSON response
     * @param {string} absoluteUrl Absolute path to an api endpoint
     * @param {URLSearchParams} queryParams URL query parameters. Optional
     * @returns {Promise<any>} A promise that resolves to a javascript object decoded from the json response body
     */
    function sendGETRequest(absoluteUrl, queryParams = undefined) {

        const url = absoluteUrl + (typeof queryParams == "undefined" ? "" : "?" + queryParams.toString())

        return fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(body => body.json())
    }

    /**
     * Make a POST request with an optional body that expect a JSON response
     * @param {string} absoluteUrl Absolute path to an api endpoint
     * @param {URLSearchParams} queryParams URL query parameters. Optional
     * @param {object} body Body of the request. Optional
     * @returns {Promise<any>} A promise that resolves to a javascript object decoded from the json response body
     */
    function sendPOSTRequest(absoluteUrl, queryParams = undefined, body = undefined) {

        const url = absoluteUrl + (typeof queryParams == "undefined" ? "" : "?" + queryParams.toString())

        return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: typeof body == "undefined" ? JSON.stringify({}) : JSON.stringify(body)
        })
            .then(body => body.json())
    }

    /**
        * @type {string}
        */
    let _token = null

    /**
     * SEt the token to make http requests
     * @param {string} token 
     */
    function setClientToken(token) {
        _token = token
    }

    /**
     * Get the token to make http requests
     */
    function getClientToken() {
        return _token
    }

    const getDeviceEndpoint = new URL("/v1/getdevice", fonoApiEndpoint).href
    /**
     * 
     * @param {string} token Token to make requests
     * @param {string} brand Brand that produces the device
     * @param {string} device Name or part of the name of the phone to device
     * @param {number} offsetPosition When a set of results is returned you can get a specific device by passing the position of your device on the result set. Starts from 0
     * @returns {Promise<object[]>} An array of devices
     */
    function getDevice_resourceUrl(brand, device, offsetPosition = undefined) {
        return sendGETRequest(
            getDeviceEndpoint,
            new URLSearchParams(
                removeUndefinedValues(
                    {
                        token: _token,
                        brand: brand,
                        device: device,
                        offsetPosition: offsetPosition
                    })
            )
        )
    }

    const getLatestEndpoint = new URL("/v1/getlatest", fonoApiEndpoint).href

    /**
     * 
     * @param {strng} token Token to make requests
     * @param {string} brand Brand that produces the phone
     * @param {number} limit Limit the result count. Depending on server implementation, may returns a reduced number of devices than expected
     * @returns {Promise<object[]>} An array of devices
     */
    function getLatest_resourceUrl(brand, limit = undefined) {
        return sendGETRequest(
            getLatestEndpoint,
            new URLSearchParams(
                removeUndefinedValues(
                    {
                        token: _token,
                        brand: brand,
                        limit: limit
                    })
            )
        )
    }

    return {
        getToken: getClientToken,
        setToken: setClientToken,
        getLatest: getLatest_resourceUrl,
        getDevice: getDevice_resourceUrl,
    }
})()