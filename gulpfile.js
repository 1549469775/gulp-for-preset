const {
    series,
    parallel,
    src,
    dest,
    task
} = require('gulp');
const clean = require('gulp-clean');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const fs = require('fs');
// process.env.NODE_ENV development
// 清理输出
task('clean', function (done) {
    // 选项read：false防止gulp读取文件的内容并使此任务快得多。如果在同一流中清洗后需要文件及其内容，请不要将read选项设置为false。
    // 对于当前工作目录之外的安全文件和文件夹，只有在将force选项设置为true的情况下才能删除。
    if (fs.existsSync('./dist')) {
        return src('./dist', {
                read: false
            })
            .pipe(clean({
                force: true
            }))
    }
    done();
})

task('minifyHTML', () => {
    return src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./dist'));
});
task('transform', function () {
    const config = require('./build/webpack.dev.config.js');
    const webpack = require('webpack-stream');
    return src('./src/js/**/*.js')
        .pipe(webpack(config)) //支持es6
        .pipe(dest("./dist/js"))
})


task('default', series('clean', parallel('transform', 'minifyHTML')))
