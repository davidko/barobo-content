/**
 * Created by Adam on 5/31/2015.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/js/barobo-bridge.js', 'tmp/linkbot.js'],
                dest: 'dist/linkbot.js'
            }
        },
        clean: ['dist/'],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'apps/CopsVsRobbers/html', src: '**/*', dest: 'dist/cops-vs-robbers'},
                    {expand: true, cwd: 'apps/FactoringChallenge/html', src: '**/*', dest: 'dist/factoring-challenge'},
                    {expand: true, cwd: 'apps/LinkbotPythonCurriculum/html', src: '**/*', dest: 'dist/python'},
                    {expand: true, cwd: 'apps/Pianobot/html', src: '**/*', dest: 'dist/pianobot'},
                    {expand: true, cwd: 'apps/PoseTeachingApp/html', src: '**/*', dest: 'dist/pose-teaching'},
                    {expand: true, cwd: 'apps/linkbotjs/dist', src: '**/*', dest: 'dist/js/vendor/linkbotjs'},
                    {expand: true, cwd: 'apps/linkbotjs/dist', src: '**/*', dest: 'startup/js/linkbotjs'},
                    {expand: true, cwd: 'apps/jquery/dist', src: '**/*', dest: 'dist/js/vendor/jquery'},
                    {expand: true, cwd: 'src/js', src: '**/*.js', dest: 'dist/js'},
                    {expand: true, cwd: 'src/css', src: '**/*.css', dest: 'dist/css'},
                    {expand: true, cwd: 'src/html', src: '**/*', dest: 'dist/'},
                    {expand: true, cwd: 'src/img', src: '**/*', dest: 'dist/img'},
                    /*
                    {expand: true, cwd: 'src/css', src: 'linkbot.css', dest: 'dist/', filter: 'isFile'},
                    {expand: true, cwd: 'src/', src: ['img/**'], dest: 'dist/'}
                    */
                ]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy']);
};