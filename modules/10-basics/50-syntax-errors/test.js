const childProcess = require('child_process');

test('test', () => {
  const stdout = childProcess.execSync(`node ${__dirname}/index.js`);
  expect(stdout.toString().trim()).toBe('What Is Dead May Never Die');
});
