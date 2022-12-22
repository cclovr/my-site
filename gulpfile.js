var
gulp         = require('gulp'),
sourcemaps   = require('gulp-sourcemaps'),
sass         = require('gulp-sass')(require('sass'));
minify       = require('gulp-minify'),
cssnano      = require('gulp-cssnano'),
autoprefixer = require('gulp-autoprefixer'),
concat       = require('gulp-concat'),
preprocess   = require('gulp-preprocess'),
replace      = require('gulp-replace'),
uglify       = require('gulp-uglify'),
intercept    = require('gulp-intercept');

browserSync  = require('browser-sync').create(),
del          = require('del'),
panini       = require('panini');

function css() {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano()) // Use cssnano to minify CSS
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg|ico|webp|webmanifest)')
    .pipe(gulp.dest('public/assets/img/'));
}

function fonts() {
    return gulp.src('src/assets/fonts/**/*.+(eot|woff|ttf|otf)')
    .pipe(gulp.dest('public/assets/fonts'))
    .pipe(browserSync.stream());
}

function html() {
    return gulp.src('src/pages/**/*.html')
    .pipe(panini({
        root: 'src/pages/',
        layouts: 'src/layouts/',
        partials: 'src/partials/',
        helpers: 'src/helpers/',
        data: 'src/data/'
    }))
    .pipe(gulp.dest('public'));
}

function scriptsIndex() {
    return gulp.src('src/assets/*.js')
    .pipe(gulp.dest('public/assets'))
    .pipe(browserSync.stream());
}

function scripts() {
    let stream = gulp.src('src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(minify());

    stream = stream
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(browserSync.stream());
    return stream;
}

function reset(done){
    console.log('Reset Panini cache');
    panini.refresh();
    done();
}

function clean() {
    console.log('Removing old files from public');
    return del([ 'public' ]);
}

function watch(done) {
    console.log('Watching for changes');

    // Live reload with BrowserSync
    browserSync.init({
        server: "./public"
    });

    const run = (...tasks) => {
        return gulp.series(...tasks, (done) => {
            browserSync.reload();
            done();
        })
    };

    gulp.watch(['src/assets/scss/**/*'], css);
    gulp.watch(['src/assets/js/**/*.js'], run(scripts));
    gulp.watch(['src/assets/*.js'], run(scriptsIndex));
    gulp.watch(['src/assets/img/**/*'], run(images));
    gulp.watch(['src/**/*.html'], run(reset, html));

    done();
}

exports.watch = watch;

exports.default = gulp.series(clean, gulp.parallel(css, scripts, scriptsIndex, images, fonts, reset, html), watch);

exports.build = gulp.series(clean, gulp.parallel(css, scripts, scriptsIndex, images, fonts, html, function(done){
    console.log('Building production ready assets');
    done();
}));
