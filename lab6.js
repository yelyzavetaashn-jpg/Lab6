class LargeDataStream {
  constructor(limit) {
    this.limit = limit;
  }

  async *generate() {
    for (let i = 1; i <= this.limit; i++) {
      yield {
        id: i,
        value: Math.floor(Math.random() * 1000)
      };
    }
  }
}
async function processStream(stream) {
  let processedCount = 0;
  let totalSum = 0;

  for await (const item of stream.generate()) {
    processedCount++;
    totalSum += item.value;

    if (processedCount % 1000 === 0) {
      console.log(
        `Processed ${processedCount} items`
      );
    }
  }

  return {
    processedCount,
    totalSum
  };
}
function calculateAverage(sum, count) {
  return count === 0
    ? 0
    : sum / count;
}
async function runExample() {
  const stream = new LargeDataStream(10000);

  console.log("Starting stream processing...");

  const result = await processStream(stream);

  console.log("Processing completed");
  console.log("Items processed:", result.processedCount);
  console.log("Total sum:", result.totalSum);

  const average = calculateAverage(
    result.totalSum,
    result.processedCount
  );

  console.log("Average value:", average);
}

runExample();