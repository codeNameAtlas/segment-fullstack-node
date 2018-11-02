//Initialize the Segment SDK
var Analytics = require('analytics-node');
var analytics = new Analytics('GYX2IipQAEV6dlIGWpRXrVQdUye27E2p');


//Initialize Optimizely
var optimizely = require('@optimizely/optimizely-sdk');
var req = require('sync-request');
var defaultLogger = require("@optimizely/optimizely-sdk/lib/plugins/logger");
var LOG_LEVEL = require("@optimizely/optimizely-sdk/lib/utils/enums").LOG_LEVEL;

//hardcoding a datafile here, but you can use a different function to grab it
//var request = req("GET","https://cdn.optimizely.com/json/11535805463.json");
var datafile = {"version":"4","rollouts":[],"anonymizeIP":true,"projectId":"11535805463","variables":[],"featureFlags":[],"experiments":[{"status":"Running","key":"greenButton","layerId":"11579362804","trafficAllocation":[{"entityId":"11616320626","endOfRange":10000}],"audienceIds":[],"variations":[{"variables":[],"id":"11616320626","key":"control"},{"variables":[],"id":"11581280837","key":"treatment"}],"forcedVariations":{},"id":"11597361418"}],"audiences":[],"groups":[],"attributes":[{"id":"11810325105","key":"name"},{"id":"11887600106","key":"email"},{"id":"11934874771","key":"weight"},{"id":"11976322443","key":"tasty"}],"botFiltering":false,"accountId":"11498491013","events":[{"experimentIds":["11597361418"],"id":"11598232155","key":"Signup Event"}],"revision":"8"};

// create optimizely client instance
var optly = optimizely.createInstance({
    datafile,
    logger: defaultLogger.createLogger({
      logLevel: LOG_LEVEL.DEBUG
  })
});


// format a standard user object for customer data you are collecting
var user = {
	userId: "spookyGhost5678",
	name: "tom spooky",
	email: "spooky@boo.com",
	weight: 24,
	tasty: false
}


// format an identify call to segment
// this will be sent to all enabled and configured destinations in segment (GA, Mixpanel, data warehouse, etc)
analytics.identify({
  userId: user.userId,
  traits: {
    name: user.name,
    email: user.email,
    weight: user.weight,
    tasty: user.tasty
  }
});


//activate a user into an Optimizely experiment with attributes
//Note: you could pass this in the callback function of the segment identify call, but I wouldnt recommend that because
//if the identify call to segment fails then so would activate call to Optimizely. 
var variation = optly.activate("greenButton", user.userId, { 
	name: user.name,
    email: user.email,
    weight: user.weight,
    tasty: user.tasty
});


//user is bucketed into a variation
if (variation === "control") {
  // Execute code for "control" variation
} else if (variation === "treatment") {
  // Execute code for "treatment" variation
} else {
  // Execute code for users who don't qualify for the experiment
}

//send a track event to segment
//critical to pass the traits/attributes as context in the segment track event for Optimizely to attribute correctly
//properties are not relevant to optimizely, but customers who use segment may want to send that event level data to other enabled destinations

analytics.track({
  userId: user.userId,
  event: 'Signup Event',
  properties: {
    revenue: 39.95,
    shippingMethod: '2-day'
  },
  context: {
  	traits: { 
	name: user.name,
    email: user.email,
    weight: user.weight,
    tasty: user.tasty
   }

  }
});

//watch events flow to segment, all enabled downstream destinations, and Optimizely results page
