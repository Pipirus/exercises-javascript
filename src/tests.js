// TODO switch to the jest when it will works with modules

import expect from 'expect';
import chalk from 'chalk';
import cleanStack from 'clean-stack';

const getPathToIndex = () => `${process.cwd()}/index.js`;

const expectOutput = async (expected, run = (f) => f()) => {
  const logs = [];
  const oldLog = console.log;
  global.console.log = (...args) => {
    oldLog(...args);
    logs.push(args);
  };
  try {
    const { default: f } = await import(getPathToIndex());
    if (typeof f === 'function') {
      run(f);
    }
    const content = logs.join('\n').toString().trim();
    expect(content).toBe(expected.toString());
    console.log();
    console.log(chalk.green('Tests have passed!'));
  } catch (e) {
    console.log(cleanStack(e.stack));
    process.exit(1);
  }
};

const test = async (run) => {
  try {
    const { default: f } = await import(getPathToIndex());
    run(f);
    console.log();
    console.log(chalk.green('Tests have passed!'));
  } catch (e) {
    console.log(cleanStack(e.stack));
    process.exit(1);
  }
};

export { expectOutput, expect, test };
