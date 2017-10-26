module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),


        // all of our configuration will go here

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'js/**/*.js']
        },

        uglify: {
            options: {
                banner: '/\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/\n'
            },
            dev: {
                files: { 'dist/js/custom.min.js': ['js/custom.js'] }
            },
            production: {
                files: { 'dist/js/custom.min.js': 'js/**/*.js' }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': 'css/style.css'
                }
            }
        },

        watch: {
            // for stylesheets, watch css files 
            // only run cssmin stylesheets: { 
            files: ['css/**/*.css'],
            tasks: ['cssmin']
        },

        // for scripts, run jshint and uglify 
        scripts: {
            files: 'js/**/*.js', tasks: ['jshint', 'uglify']
        },

        responsive_images: {
            dev: {
                options: {
                    sizes: [
                        {
                            width: 320,
                            name: 'small'
                        },
                        {
                            width: 640,
                            name: 'medium'
                        },
                        {
                            width: 800,
                            name: 'large'
                        }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpg,gif,png}'],
                    cwd: 'img/',
                    dest: 'dist/'
                }]
            }
        },
        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: './dist/'
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: ['**/*', '!assets/img/**/*.*'],
                    cwd: './',
                    dest: 'dist/'
                }]
            }
        },



    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('default', ['copy', 'responsive_images', 'connect', 'watch']);
    //grunt.registerTask('default', ['uglify', 'cssmin']);

    // this task will only run the dev configuration 
    grunt.registerTask('dev', [/* 'jshint:dev', */ 'uglify:dev'/* , 'cssmin:dev', 'less:dev' */]);

    // only run production configuration 
    grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

};