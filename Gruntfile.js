"use strict";
const sass = require("node-sass");

module.exports = function (grunt) {
  // Define the configuration for all tasks
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          "css/style.css": "sass/main.scss",
        },
      },
    },

    watch: {
      files: "sass/*.scss",
      tasks: ["sass"],
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "*.html", "js/*.js"],
        },

        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
        },
      },
    },

    copy: {
      html: {
        files: [
          {
            // for Html
            expand: true,
            dot: true,
            cwd: "./",
            src: ["*.html"],
            dest: "dist",
          },
        ],
      },
    },

    clean: {
      build: {
        src: ["dist/"],
      },
    },

    imagemin: {
      dynamic: {
        files: [
          {
            expand: true, // Enable dynamic expansion
            cdw: "./", // Src matches are relative to this path
            src: [
              "images/*.{png,jpg,svg}",
              "images/desktop/*.{png,jpg,svg}",
              "images/mobile/*.{png,jpg,svg}",
            ], // Actual patterns to match
            dest: "dist/", // Destination path prefix
          },
        ],
      },
    },

    useminPrepare: {
      foo: {
        dest: "dist",
        src: ["index.html"],
      },
      options: {
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
          post: {
            css: [
              {
                name: "cssmin",
                createConfig: function (context, block) {
                  var generated = context.options.generated;
                  generated.options = {
                    keepSpecialComments: 0,
                    rebase: false,
                  };
                },
              },
            ],
          },
        },
      },
    },

    // Concat
    concat: {
      options: {
        separator: ";",
      },

      // dist configuration is provided by useminPrepare
      dist: {},
    },

    // Uglify
    uglify: {
      // dist configuration is provided by useminPrepare
      dist: {},
    },

    cssmin: {
      dist: {},
    },

    // Filerev
    filerev: {
      options: {
        encoding: "utf8",
        algorithm: "md5",
        length: 20,
      },

      release: {
        // filerev:release hashes(md5) all assets (images, js and css )
        // in dist directory
        files: [
          {
            src: ["dist/js/*.js", "dist/css/*.css"],
          },
        ],
      },
    },

    // Usemin
    // Replaces all assets with their reved version in html and css files.
    // options.assetDirs contains the directories for finding the assets
    // according to their relative paths
    usemin: {
      html: ["dist/index.html"],
      options: {
        assetsDirs: ["dist", "dist/css", "dist/js"],
      },
    },

    htmlmin: {
      // Task
      dist: {
        // Target
        options: {
          // Target options
          collapseWhitespace: true,
        },
        files: {
          // Dictionary of files
          "dist/index.html": "dist/index.html", // 'destination': 'source'
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-filerev");
  grunt.loadNpmTasks("grunt-usemin");

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("grunt-sass", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin",
  ]);
};
