const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('should return a string', () => {
    const result = deterministicPartitionKey({});
    expect(typeof result).toBe('string');
  });


  it('should use the given partition key if it is provided', () => {
    const result = deterministicPartitionKey({ partitionKey: 'my-partition-key' });
    expect(result).toBe('my-partition-key');
  });

  it('should generate a partition key from the event data if no partition key is given', () => {
    const result1 = deterministicPartitionKey({ foo: 'bar' });
    const result2 = deterministicPartitionKey({ foo: 'baz' });
    expect(typeof result1).toBe('string');
    expect(typeof result2).toBe('string');
    expect(result1).not.toBe(result2);
  });

  it('should generate the same partition key for the same input', () => {
    const input = { foo: 'bar' };
    const result1 = deterministicPartitionKey(input);
    const result2 = deterministicPartitionKey(input);
    expect(result1).toBe(result2);
  });

  it('should generate a hash if the partition key is too long', () => {
    const longString = 'a'.repeat(300);
    const result = deterministicPartitionKey({ partitionKey: longString });
    expect(typeof result).toBe('string');
    expect(result).not.toBe(longString);
  });
});
