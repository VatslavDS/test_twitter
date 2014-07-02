# PeerIndex API client for Node.js

This library allows you to easily access all API endpoints for PeerIndex.
Refer to the [PeerIndex API documentation](https://developers.peerindex.com/docs/read/Home) for more details.

## Requirements

Request a free API key at https://developers.peerindex.com/

## Usage

Use the API key to create a PeerIndex instance

    var PeerIndex = require('peerindex');
    var pi = new PeerIndex(API_KEY);
    
Default configuration can be overriden by providing a config object

    var pi = new PeerIndex(API_KEY, {
        protocol: 'https',
        host: 'api.peerindex.com',
        port: 443,
        version: '1'
    });
    
Call any of the four API methods `actorBasic`, `actorExtended`, `actorTopic`, `actorGraph` with a parameters object and a callback function

    var parameters = {twitter_screen_name: 'dirkbonhomme'};
    pi.actorBasic(parameters, function(error, actor){
        if(error){
            console.log('Something went wrong', error);
        }else{
            console.log('Results', actor);
        }
    });
or

    var parameters = {twitter_id: '14375479'};
    pi.actorBasic(parameters, callback);
    
or

    var parameters = {peerindex_id: '1684545e-ac66-3954-b9fe-a2ddc098db3f'};
    pi.actorBasic(parameters, callback);

## Developing

The library is published to NPM and can be installed with the following command:

    $ npm install peerindex

## Testing

Navigate to this module's repository and make sure you have the development modules installed:

    $ npm install


Run the tests:

    $ npm test

