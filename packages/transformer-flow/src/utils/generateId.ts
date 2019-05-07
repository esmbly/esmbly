const candidates = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function generateId(usedIdentifiers: string[]): string {
  const identifier = candidates.find(
    (candidate: string) => usedIdentifiers.indexOf(candidate) < 0,
  );

  if (!identifier) {
    throw new Error('Could not generate a free identifier');
  }

  usedIdentifiers.push(identifier);
  return identifier;
}
