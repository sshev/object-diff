var Jasmine = require('jasmine');
var jasmine = new Jasmine();
// var jasmine = new require('jasmine');

// jasmine.loadConfigFile('spec/support/jasmine.json');

jasmine.loadConfig({
  // spec_dir: 'spec',
  spec_files: [
    // './objDiff.js',
    './objDiff.spec.js'
  ]
  //,
  // helpers: [
  //   'helpers/**/*.js'
  // ]
});

jasmine.onComplete(function(passed) {
  if(passed) {
    console.log('All specs have passed');
  }
  else {
    console.log('At least one spec has failed');
  }
});

jasmine.configureDefaultReporter({
  showColors: false
});

jasmine.execute();

// console.log('zxcsdfsdsd');