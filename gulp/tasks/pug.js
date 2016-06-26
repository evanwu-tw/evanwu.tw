// *************************************
//
//   Pug Task
//
// *************************************

import config from '../config';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import gdata from 'gulp-data';
import pug from 'gulp-pug';
import filter from 'gulp-filter';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';

gulp.task('pug', () => {
    // Filtering out partials (folders and files starting with "_" )
    const f = filter((file) => {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }, { restore: true });

    return gulp.src(config.pug.src)
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(gulpif(
            config.pug.locals,
            gdata(() => require(`../../${config.pug.locals}`))
        ))
        .pipe(pug({
            pretty: global.isProd ? '' : '  '
        }))
        .pipe(gulpif(!config.pug.underscore, f)) // Filtering
        .pipe(gulp.dest(config.pug.dest))
        .pipe(gulpif(!config.pug.underscore, f.restore))
        .pipe(browserSync.stream({
            once: true
        }));
});
