module.exports.handler = async (event) => {
  let records = event.Records;
  let batchItemFailures = [];

  if (records.length) {
    // this function will execute even if there is 1 messages in queue. We defined batch number so that if there are many concurrent requests say for eg. 100 requests at same time then they are first stored in queue and we will process only 10 messages frome queue at a time in a single instance of lambda handler. In normal cases we defined the maximum number of lambda instance that can be created and each single request is processed by a single lambda function and that lambda will process next request once it completes its previous execution.
    for (const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);
        if (typeof parsedBody.detail.vehicleNo !== "string") {
          throw new Error("Vehicle Number Must be a String");
        }
        console.log(
          "processing vechile details " + parsedBody.detail.vehicleNo
        );
        console.log("processing is successful " + record.messageId);
      } catch (err) {
        batchItemFailures.push({
          itemIdentifier: record.messageId,
        });
      }
    }
  }
  return { batchItemFailures };
};
