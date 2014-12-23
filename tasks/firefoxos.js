'use strict';

module.exports = function (grunt) {
  var ffos = require('node-firefoxos-cli');
  var path = require('path');
  var Promise = require('promise');

  grunt.registerMultiTask('ffospush', 'Pushes an app to the device',
  function () {
    var done = this.async();
    var src = path.join(process.cwd(), this.data.zip);
    console.log("Please accept the prompt in your device".blue)

    ffos.installPackagedApp(this.data.appId, src).then(function(){
      console.log("Application Installed".green)
      done();
    }, function(err){
      console.log("Error Installing App".red);
      console.log(err.red);
      done(false);
    });
  });

  grunt.registerTask('ffosreset', 'Resets B2G', function () {
    var done = this.async();
    ffos.resetB2G(function () {
      console.log('B2G process reseted');
      done();
    });
  });

  grunt.registerTask('ffoslog', 'Outputs the log', function () {
    this.async();
    ffos.logcat();
  });

  grunt.registerMultiTask('ffosstop', 'Stops an application', function () {
    var done = this.async();

    console.log("Please accept the prompt in your device".blue)
    ffos.closeApp(this.data.appId).then(function(){
      console.log("Application Stopped".green)
      done();
    }, function(err){
      console.log("Error Stopping App".red);
      console.log(err.red);
      done(false);
    });
  });

  grunt.registerMultiTask('ffoslaunch', 'Launches an application', function () {
    var done = this.async();

    console.log("Please accept the prompt in your device".blue)
    ffos.launchApp(this.data.appId).then(function(){
      console.log("Application Launched".green)
      done();
    }, function(err){
      console.log("Error Launching App".red);
      console.log(err.red);
      done(false);
    });
  });
};

