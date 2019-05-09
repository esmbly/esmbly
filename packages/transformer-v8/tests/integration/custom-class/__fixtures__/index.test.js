const { toInfoString } = require('./index');
const { Person } = require('./Person');

describe('toInfoString', () => {
  it('returns an information string about a person', () => {
    const personA = new Person('Olle', 28);
    const personB = new Person('Fredrik', 27);
    expect(toInfoString(personA)).toEqual(`Name: Olle, Age: 28`);
    expect(toInfoString(personB)).toEqual(`Name: Fredrik, Age: 27`);
  });
});
