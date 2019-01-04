# Node Response Rewritter
This is small node.js application for changing http response from the server using proxy server.

## How to install it
To install this app execute the following steps:
1. Install `node.js@10.10.0` (version 10.10.0 is optional but recommended)
2. Clone this repository to your computer.
3. In project folder execute following command: `npm i && npm run prepare && npm run start`
4. Check `config/config.json` and apply your own settings.

## How to setup `config.json`
To make the app actually work you have to apply custom settings in `config/config.json`.
1. Change the target domain to actual domain name where proxy server will send requests and rewrite response.
2. To rewrite response from server specify it in `"responses"` field.

## How to specify response to rewrite
First Add response to `"responses"` array field. For example:
```
"responses": [
    { "uri": "/api/get_something", "path": "something.json" }
]
```
Then create file in `place-for-your-responses`
that should have the same path as reponse you've added in `config.json`
and should contain a new response body.