var https = require('https');
var url = require('url');

/**
 * Clone simple object to avoid references
 */
function clone(source){
    var target = {};
    for(var i in source){
        if(source.hasOwnProperty(i)){
            target[i] = source[i];
        }
    }
    return target;
}

/**
 * PeerIndex constructor
 *
 * @param {String} apiKey
 * @param {Object} [options] Override default values for protocol, host, port and version
 */
function PeerIndex(apiKey, options){
    options = options || {};
    if(!apiKey) throw new Error('Please provide an api key to constructor');
    this.apiKey = apiKey;
    this.protocol = options.protocol || 'https';
    this.host = options.host || 'api.peerindex.com';
    this.port = options.port || 443;
    this.version = options.version || '1';
}

/**
 * Fetch data from actor/basic endpoint
 *
 * @param {Object} parameters As per API spec one of the following: peerindex_id, twitter_screen_name or twitter_id
 * @param {Function} callback
 */
PeerIndex.prototype.actorBasic = function(parameters, callback){
    this.request('/actor/basic', parameters, callback);
};

/**
 * Fetch data from actor/extended endpoint
 *
 * @param {Object} parameters As per API spec one of the following: peerindex_id, twitter_screen_name or twitter_id
 * @param {Function} callback
 */
PeerIndex.prototype.actorExtended = function(parameters, callback){
    this.request('/actor/extended', parameters, callback);
};

/**
 * Fetch data from actor/topic endpoint
 *
 * @param {Object} parameters As per API spec one of the following: peerindex_id, twitter_screen_name or twitter_id
 * @param {Function} callback
 */
PeerIndex.prototype.actorTopic = function(parameters, callback){
    this.request('/actor/topic', parameters, callback);
};

/**
 * Fetch data from actor/graph endpoint
 *
 * @param {Object} parameters As per API spec one of the following: peerindex_id, twitter_screen_name or twitter_id
 * @param {Function} callback
 */
PeerIndex.prototype.actorGraph = function(parameters, callback){
    this.request('/actor/graph', parameters, callback);
};

/**
 * Fetch data from custom endpoint
 *
 * @param {String} endpoint
 * @param {Object} parameters
 * @param {Function} callback
 */
PeerIndex.prototype.request = function(endpoint, parameters, callback){

    // Prepare uri
    var query = clone(parameters || {});
    query.api_key = this.apiKey;
    var uri = url.format({
        protocol: this.protocol,
        hostname: this.host,
        port: this.port,
        pathname: this.version + endpoint,
        query: query
    });

    // Make call to API
    var rawData = '';
    var request = https.get(uri, function(response){

        // Collect returned data
        response.on('data', function(chunk){
            rawData += chunk.toString();
        });

        // Parse collected data
        response.on('end', function(){
            var data;
            try{
                data = JSON.parse(rawData);
            }catch(e){}

            if(data && response.statusCode === 200){
                callback(undefined, data);
            }else if(data && data.error){
                callback(new Error(data.error.code + ' ' + data.error.status + ', ' + data.error.detail));
            }else{
                callback(new Error(response.statusCode + ', Error requesting details'));
            }
        });
    });

    request.on('error', function(e){
        callback(e);
    });
};

module.exports = PeerIndex;
