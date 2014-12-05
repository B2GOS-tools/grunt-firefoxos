'use strict';

module.exports = function (grunt) {
  var ffos = require('node-firefoxos-cli');
  var path = require('path');

  grunt.registerMultiTask('ffospush', 'Pushes an app to the device',
  function () {
    var done = this.async();
    var src = path.join(process.cwd(), this.data.zip);

    ffos.installPackagedApp(this.data.appId, src, function (err) {
      if (err) {
        console.log('ERROR installing app'.red);
      }
      else {
        console.log('App installed');
      }
      done();
    });
  });

  grunt.registerTask('ffosreset', 'Resets B2G', function () {
    var done = this.async();
    ffos.resetB2G(function () {
      console.log('B2G process reseted');
      done();
    });
  });

  grunt.registerTask('ffosstopb2g', 'Stops B2G', function () {
    var done = this.async();
    ffos.stopB2G(function () {
      console.log('B2G process stopped');
      done();
    });
  });

  grunt.registerTask('ffosstartb2g', 'Starts B2G', function () {
    var done = this.async();
    ffos.startB2G(function () {
      console.log('B2G process started');
      done();
    });
  });

  grunt.registerTask('ffoslog', 'Outputs the log', function () {
    this.async();
    ffos.logcat();
  });

  grunt.registerMultiTask('ffosgetprefs', 'Get FirefoxOS prefs file', function () {
    var done = this.async();
    ffos.pullPrefs(function onRead(error, data){
      if (error != null)
        console.log("error retrieving prefs.js " + error);
      else
        console.log("prefs.js retrieved from the device");
      done();
    });
  });

  grunt.registerMultiTask('ffossetprefs', 'Set FirefoxOS prefs file', function () {
    var done = this.async();
    ffos.pushPrefs(function onRead(error, data){
      if (error != null)
        console.log("error writing prefs.js " + error);
      else
        console.log("prefs.js pushed to the device");
      done();
    });
  });

  grunt.registerMultiTask('ffosstop', 'Stops an application', function () {
    var done = this.async();
    ffos.closeApp(this.data.appId, function (err) {
      if (err) {
        console.log('ERROR stopping app'.red);
      }
      else {
        console.log('App stopped');
      }
      done();
    });
  });

  grunt.registerMultiTask('ffoslaunch', 'Launches an application', function () {
    var done = this.async();
    ffos.launchApp(this.data.appId, function (err) {
      if (err) {
        console.log('ERROR launching app'.red);
      }
      else {
        console.log('App launched');
      }
      done();
    });
  });
};

