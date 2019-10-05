const { series, parallel,src,dest,task } = require('gulp');
const clean = require('gulp-clean');
const gulpif = require('gulp-if');
const fs = require('fs');
const watch = require('gulp-watch');

task('webpack',function () {
    const  webpack = require('webpack-stream');
    const config = require('./webpack.config.js');
    return src('./src/js/**/*.js')
        .pipe(webpack(config))
        .pipe(dest('./www/js'))
});

task('less',function () {
    const less = require('gulp-less');
    return src('./src/less/**/*.less')
        .pipe(less())
        .pipe(dest('./www/css'))
});

task('watch',function () {
    watch('./src/less/**/*.less',series('default'));
    watch('./src/js/**/*.js',series('default'));
});

function cleanJS(cb){
    if (fs.existsSync('./www/js')){
        return src('./www/js', {read: false})
            .pipe(clean({force: true}))
            // .pipe(dest('./www/js'));
    }else cb();
}

function cleanCSS(cb){
    if (fs.existsSync('./www/css')){
        return src('./www/css', {read: false})
            .pipe(clean({force: true}))
            // .pipe(dest('./www/css'));
    }else cb();
}
task('clean',parallel(cleanJS,cleanCSS));


exports.default = series('clean','webpack','less');
