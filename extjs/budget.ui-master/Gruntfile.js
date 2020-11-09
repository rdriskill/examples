(function () {
    "use strict";

    module.exports = function (grunt) {
        // Project configuration.
        grunt.initConfig({
            // Read in the project settings from the package.json file into the pkg property.
            pkg: grunt.file.readJSON("package.json"),

            extjs_dependencies: {
                dist: {
                    options: {
                        src: [
                            "./src/js"
                        ],
                        excludeClasses: [
                            "Ext.*"
                        ],
                        resolveFrom: "./src/js/app.js"
                    }
                }
            },

            concat: {
                options: {
                    // Define a string to put between each file in the concatenated output.
                    separator: "\n"
                },
                dist: {
                    // The files to concatenate.
                    src: [
                        "<%= extjs_dependencies_dist %>"
                    ],
                    // The location of the resulting concatenated JS file.
                    dest: "dist/<%= pkg.name %>.js"
                }
            },

            // The uglify plugin minifies JS files.
            uglify: {
                options: {
                    // The banner is inserted at the top of the output.
                    banner: "/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n"
                },
                dist: {
                    files: { // Minifiy the concatenated file from earlier.
                        "dist/<%= pkg.name %>.min.js": [
                            "<%= concat.dist.dest %>"
                        ]
                    }
                }
            },

            qunit: {
                all: [
                    "test/*.html"
                ]
            },

            jshint: {
                // Define the files to lint.
                files: [
                    "gruntfile.js", "src/**/*.js", "test/**/*.js"
                ],
                options: {
                    jshintrc: true
                }
            },

            "git-describe": {
                options: {
                    failOnError: false
                },
                me: {}
            },

            "jsbeautifier": {
                files: ["src/**/*.js", "src/**/*.json", "test/**/*.js", "*.js", "*.json", "*.css", "*.html"],
                options: {
                    config: ".jsbeautifyrc"
                }
            },

            "jscs": {
                src: ["src/**/*.js", "test/**/*.js", "*.js"],
                options: {
                    config: ".jscsrc"
                }
            },

            // Watch specified files for changes and run the specified tasks when they occur.
            watch: {
                files: [
                    "<%= jshint.files %>"
                ],
                tasks: [
                    "jshint", "jscs", "qunit", "jsbeautifier", "version"
                ]
            }
        });

        grunt.loadNpmTasks("grunt-contrib-concat");
        grunt.loadNpmTasks("grunt-extjs-dependencies");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-qunit");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-git-describe");
        grunt.loadNpmTasks("grunt-jsbeautifier");
        grunt.loadNpmTasks("grunt-jscs");

        grunt.registerTask("saveRevision", function () {
            grunt.event.once("git-describe", function (rev) {
                grunt.option("gitRevision", rev);
            });
            grunt.task.run("git-describe");
        });

        grunt.registerTask("tag-revision", "Tag the current build revision", function () {

            grunt.file.write("dist/build.js", "window.Build = " + JSON.stringify({
                version: grunt.config("pkg.version"),
                revision: grunt.option("gitRevision") ? grunt.option("gitRevision")[0] : "?",
                date: grunt.template.today("mm/dd/yyyy h:MM:ss TT Z")
            }));
        });

        grunt.registerTask("version", [
            "saveRevision", "tag-revision"
        ]);

        grunt.registerTask("test", [
            "jshint", "jsbeautifier", "jscs", "qunit"
        ]);

        grunt.registerTask("package", [
            "extjs_dependencies", "concat", "uglify", "version"
        ]);

        grunt.registerTask("default", [
            "test", "package"
        ]);
    };
})();
