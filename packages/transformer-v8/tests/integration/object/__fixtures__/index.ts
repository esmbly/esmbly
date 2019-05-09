function toKeyValueString(obj: object): string {
  return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
}

module.exports = { toKeyValueString };
