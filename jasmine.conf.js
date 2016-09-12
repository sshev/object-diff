const Jasmine = require('jasmine');
const jasmine = new Jasmine();

const JasmineConsoleReporter = require('jasmine-console-reporter');
jasmine.addReporter(new JasmineConsoleReporter({
  colors: 1,
  cleanStack: 1,
  verbosity: 4,
  listStyle: 'indent',
  activity: false
}));

jasmine.loadConfig({
  spec_files: ['./objDiff.spec.js'],
  stopSpecOnExpectationFailure: false,
  random: false,
  autotest: true
});

jasmine.execute();