const gulp = require('gulp')
const jshint = require('gulp-jshint')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

// gulp --tasks

// // gulp task-name
// gulp.task('gulp-jshint', (done)=>{
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))

//     done()
// })

// // gulp
// gulp.task('default', (done)=>{
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))

//     done()
// })

// //  new syntax from v4

// function task_jshint_1(done){
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))

//     done()
// }
// // gulp task_jshint_1
// exports.task_jshint_1 = task_jshint_1;

// // gulp
// exports.default = task_jshint_1;

// // Series and parallel
// function task_jshint_1(done){
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))

//     done()
// }
// function task_jshint_2(done){
//     gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))

//     done()
// }
// // exports.default = gulp.parallel([task_jshint_1,task_jshint_2]);
// exports.default = gulp.series([task_jshint_1,task_jshint_2]);

// // gulp minify + rename css/js files
// const styleSrc = './src/css/style.css'
// const styleDest = './dist/css'

// gulp.task('styles', (done)=>{
//     gulp.src(styleSrc)
//         .pipe(cleanCSS({debug: true}, (details) => {
//             console.log(`${details.name}: ${details.stats.originalSize}`);
//             console.log(`${details.name}: ${details.stats.minifiedSize}`);
//         }))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest(styleDest))

//     done()
// })

// // sass compile + minify + rename files
// const styleSrc = './src/scss/style.scss'
// const styleDest = './dist/scss'

// gulp.task('styles', (done)=>{
//     gulp.src(styleSrc)
//         .pipe(sass({outputStyle: 'compressed'}))
//         .pipe(cleanCSS())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest(styleDest))

//     done()
// })

// // sass compile + minify + rename + autoprefixer + sourcemaps files
// const styleSrc = './src/scss/style.scss'
// const styleDest = './dist/scss'

// gulp.task('styles', (done)=>{
//     gulp.src(styleSrc)
//         .pipe(sourcemaps.init())
//         .pipe(sass({outputStyle: 'compressed'}))
//         .pipe(autoprefixer({
//             cascade:false
//         }))
//         .pipe(cleanCSS())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest(styleDest))

//     done()
// })

// // gulp image minification
// const styleSrc = './src/images/*'
// const styleDest = './dist/images'

// gulp.task('image', (done)=>{
//     gulp.src(styleSrc)
//         .pipe(imagemin())
//         .pipe(gulp.dest(styleDest))

//     done()
// })

// gulp transpile(babelify) + minify + rename + autoprefixer + sourcemaps files

const jsSRC = 'script.js';
const jsFolder = './src/js/';
const jsDEST = './dist/js/';

const jsFiles = [jsSRC]

gulp.task('js', function(done){
    jsFiles.map(function(entry){
        return browserify({
            entries:[jsFolder+entry]
        })
        .transform(babelify, {presets : ['env']})
        .bundle()
        .pipe(source(entry))
        .pipe(rename({extname:'.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDEST))
    });
    done();
})