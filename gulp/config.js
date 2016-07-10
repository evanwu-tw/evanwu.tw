// *************************************
//
//   Config for gulp tasks
//
// *************************************

import path from 'path';
import fs from 'fs';

export default {

    // -------------------------------------
    //   Server Port
    // -------------------------------------

    browserPort: 8888,
    UIPort: 8080,
    testPort: 8101,

    // -------------------------------------
    //   Stylesheets
    // -------------------------------------

    // Sass with libsass
    sass: {
        src: ['src/scss/**/*.+(sass|scss)'],
        sourcemap: true,
        opt: {
            outputStyle: 'compact',
            includePaths: [
                path.join(__dirname, 'node_modules')
            ]
        },
        autoprefixer: {
            browsers: ['last 2 versions'],
            cascade: false
        },
        cssnano: {
            reduceIdents: false
        },
        dest: 'www/css'
    },


    // -------------------------------------
    //   Scripts
    // -------------------------------------

    scripts: {
        src: ['src/js/**/*.js'],
        output: false,
        dest: 'www/js'
    },


    // -------------------------------------
    //   HTML
    // -------------------------------------

    // Pug Templates
    pug: {
        src: ['src/views/**/*.+(pug|jade)'],
        underscore: false,  // Render underscore file
        locals: false,
        dest: 'www/'
    },


    // -------------------------------------
    //   Static Sources
    // -------------------------------------

    // Images
    images: {
        src: ['src/img/**/*.+(jpg|jpeg|gif|png|svg)'],
        filter: [],
        imagemin: {},
        dest: 'www/img'
    },

    // Fonts
    fonts: {
        src: ['src/fonts/**/*.+(woff|woff2|ttf|eot|svg)'],
        dest: 'www/fonts'
    },

    // -------------------------------------
    //   Vendor
    // -------------------------------------

    vendor: {
        scripts: {
            src: [],
            output: 'vendor.bundle.js',
            dest: 'www/js'
        },
        styles: {
            src: [],
            output: 'vendor.bundle.css',
            cssnano: {
                reduceIdents: false
            },
            dest: 'www/css'
        }
    },

    // -------------------------------------
    //   Utils
    // -------------------------------------

    srcDir: './src/',
    buildDir: 'www',

    assetExtensions: [
        'js',
        'css',
        'png',
        'jpe?g',
        'gif',
        'svg',
        'eot',
        'otf',
        'ttc',
        'ttf',
        'woff2?'
    ],

    gzip: {
        src: 'www/**/*.+(html|xml|json|css|js|js.map|css.map)',
        options: {},
        dest: 'www/'
    },

    // Banner
    banner: {
        header: fs.readFileSync('copyright.txt', 'utf8')
    },

    // -------------------------------------
    //   Tasks Runner (Dev, Prod, Watch)
    // -------------------------------------

    tasks: {
        dev: ['sass', 'pug', 'scripts', 'images'],
        prod: ['sass', 'pug', 'scripts', 'images'],
        watch: ['sass', 'pug', 'scripts', 'images']
    }

};
