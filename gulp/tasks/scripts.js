// *************************************
//
//   Scripts Task
//
// *************************************

import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import header from 'gulp-header';
import browserSync from 'browser-sync';
import handleErrors from '../util/handleErrors';

import pkg from '../../package.json';

gulp.task('scripts', () => {
    // Will Concat?
    let willConcat = false;
    if (config.scripts.output) {
        willConcat = true;
    }

    return gulp.src(config.scripts.src)
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            minified: global.isProd,
            comments: global.isProd
        }))
        .pipe(gulpif(
            willConcat,
            concat(config.scripts.output || './somethingfake')
        ))
        .pipe(gulpif(
            global.isProd,
            header(config.banner.header, { pkg })
        ))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(gulpif(
            global.isWatching,
            browserSync.stream({ once: true })
        ));
});
