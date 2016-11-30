module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'scripts/vendor.min.js': [
            'bower_components/jquery/jquery.min.js',
            'bower_components/Eventable/eventable.js',
            'bower_components/jquery-oembed-all/jquery.oembed.js',
            'bower_components/sir-trevor-js/sir-trevor.js'
            //'bower_components/sir-trevor-generator/block.js'
          ]
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'styles/vendor.min.css': [
            'bower_components/jquery-oembed-all/jquery.oembed.css',
            'bower_components/sir-trevor-js/sir-trevor.css',
            'bower_components/sir-trevor-js/sir-trevor-icons.css',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', [
    'uglify',
    'cssmin'
  ]);

};