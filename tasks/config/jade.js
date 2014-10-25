/**
 * Precompiles Underscore templates to a `.jst` file.
 *
 * ---------------------------------------------------------------
 *
 * (i.e. basically it takes HTML files and turns them into tiny little
 *  javascript functions that you pass data to and return HTML. This can
 *  speed up template rendering on the client, and reduce bandwidth usage.)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-jst
 *
 */

module.exports = function(grunt) {

  var globule = require('globule');
  var filesMapping = globule.findMapping({
    src : '**/*.jade',
    srcBase: 'views',
    destBase: '.tmp/public/views',
    ext: '.html',
    extDot: 'last'
  });

  grunt.config.set('jade', {
    dev: {
      options: {
        client: false,
        pretty: true
      },
      files: filesMapping
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
};
