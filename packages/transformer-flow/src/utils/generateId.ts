const candidates = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function generateId(usedIdentifiers: string[]): string {
  const identifier = candidates.find(
    (candidate: string) => usedIdentifiers.indexOf(candidate) < 0,
  );
  if (!identifier) {
    throw new Error('Could not generate a free identifier');
  }
  return identifier;
}
