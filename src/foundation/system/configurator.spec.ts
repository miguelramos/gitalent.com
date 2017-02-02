import { Configurator } from './configurator';

describe('> Configurator', () => {
  let configurator = new Configurator();

  it('# Initial empty options.', () => {
    expect(configurator.options).toEqual({});
  });

  it('# Set option and check value and existence.', () => {
    configurator.setOption('one.dot.notation', true);

    expect(configurator.hasOption('one.dot.notation')).toBeTruthy();
    expect(configurator.hasOption('no.option.declare')).toBeFalsy();
    expect(configurator.getOption('one.dot.notation')).toBeTruthy();
  });

  it('# Get option and convert to object', () => {
    expect(configurator.options).toEqual({ 'one.dot.notation': true });
    expect(configurator.getOptionTree('one')).toEqual({ one: { dot: { notation: true } } });
  });

  it('# Converts a tree to flat options.', () => {
    let option = {
      great: {
        name: 'joe'
      }
    };

    configurator.setOption(option);
    expect(configurator.getOptionTree('great')).toEqual(option);
  });
});
