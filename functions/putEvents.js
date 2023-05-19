const EventBridge = require("aws-sdk/clients/eventbridge"); // in aws lambda environment we already have aws-sdk dependency so no need to add it in package.json file

const EVENT_BUS_NAME = process.env.EventBusName; // we get this from environment variable defined in lambda handler
let eventBridge = new EventBridge();

module.exports.handler = async (event) => {
  let body = JSON.parse(event.body);
  // putEvents to EventBridge
  let entry = {
    EventBusName: EVENT_BUS_NAME,
    Detail: JSON.stringify({
      vehicleNo: body.vehicleNo, //"CAX-1000",
      NIC: body.nic, //"123456789V"
    }),
    Source: "fuel-app",
    DetailType: "user-signup",
  };
  try {
    let output = await eventBridge.putEvents({ Entries: [entry] }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (err) {
    console.log(err);
  }
};
