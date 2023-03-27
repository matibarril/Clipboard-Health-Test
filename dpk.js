const crypto = require("crypto");

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const extractPartitionKeyFromEvent = (event) => {
  let partitionKey;

  if (event.partitionKey && typeof event.partitionKey === 'string') {
    partitionKey = event.partitionKey;
  } else if (event.partitionKey) {
    partitionKey = JSON.stringify(event.partitionKey);
  } else {
    partitionKey = hash(JSON.stringify(event));
  }

  return partitionKey;
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidatePartitionKey;

  if (!event) return TRIVIAL_PARTITION_KEY;

  candidatePartitionKey = extractPartitionKeyFromEvent(event);

  return (candidatePartitionKey.length > MAX_PARTITION_KEY_LENGTH) ? hash(candidatePartitionKey) : candidatePartitionKey;
};