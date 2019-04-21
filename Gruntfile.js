'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');  
    grunt.loadNpmTasks('grunt-exec');
    

    var SOURCE_DIR = '_book'

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            tmp: ['tmp/**/*'],
            deploy: [SOURCE_DIR + '/**/*']
        },
        exec: {
            buildContent: {
                cmd: "gitbook build",
            },
            // 部署代码到又拍云
            deployToUpyun:{
                cmd:function(){
                    //防止错误，不得为空
                    var storagepath=process.env.UPX_PATH;
                    if (!storagepath || storagepath===""){
                        return 'echo "empty path " && exit 1';
                    }
                    //将多个内容拼接到多条命令执行
                    return [
                        ['upx','login',process.env.UPX_BUCKET,process.env.UPX_OP,process.env.UPX_PWD].join(" "),
                        ['upx','sync','-w 10 -q ',SOURCE_DIR,storagepath].join(" ") 
                    ].join('&&');
                },
            }
        },
        htmlmin: {                                          // Task
            dist: {                                         // Target
                options: {                                  // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: SOURCE_DIR,      // Src matches are relative to this path.
                        src: ['**/*.html'], // Actual pattern(s) to match.
                        dest: SOURCE_DIR,   // Destination path prefix.
                    }],
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0, 
            },
            target: {
                 files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: SOURCE_DIR,      // Src matches are relative to this path.
                        src: ['**/*.css'], // Actual pattern(s) to match.
                        dest: SOURCE_DIR,   // Destination path prefix.
                    }],
            }
        }, 
        uglify: {
            my_target: {
              files: [{
                expand: true,
                cwd: SOURCE_DIR+"/gitbook",
                src: '**/*.js',
                dest: SOURCE_DIR+"/gitbook",
                rename: function (dst, src) { 
                    return src;
                  }
              }]
            }
        },
        
    });

    // get a formatted commit message to review changes from the commit log
    // github will turn some of these into clickable links
    function getDeployMessage() {
        var ret = '\n\n';
        if (process.env.TRAVIS !== 'true') {
            ret += 'missing env vars for travis-ci';
            return ret;
        }
        ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
        ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
        ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
        ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID + '\n';
        ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
        return ret;
    }

    grunt.registerTask('check-deploy', function () {
        // need this
        this.requires(['build']);

        // only deploy under these conditions
        if (process.env.TRAVIS === 'true' && process.env.TRAVIS_SECURE_ENV_VARS === 'true' && process.env.TRAVIS_PULL_REQUEST === 'false') {
            grunt.log.writeln('executing deployment');
            // queue deploy
            grunt.task.run('exec:deployToUpyun');
        }
        else {
            grunt.log.writeln('skipped deployment');
        }
    });

    grunt.registerTask('prep', 'Clean-up project', [
        'clean',
    ]);

    grunt.registerTask('build', 'Rebuild locally', [
        'prep',
        "exec:buildContent",
        'htmlmin:dist',
        'cssmin', 
    ]);
 
    grunt.registerTask('deploy', 'Deploy from Travis', [
        'build',
        'exec:deployToUpyun'
    ]);

    // per convention set a test task
    grunt.registerTask('test', ['build']);

    grunt.registerTask('default', ['test']);
};
