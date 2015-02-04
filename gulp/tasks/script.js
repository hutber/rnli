var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require("gulp-concat");

// Basic usage
gulp.task('script', function() {
    // Single entry point to browserify
    gulp.src('src/site/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true,
            shim: {
                jquery: {
                    path: 'node_modules/jquery/dist/jquery.min.js',
                    exports: ['jQuery']
                },
                'slider': {
                    path: 'src/site/js/libs/jquery.royalslider',
                    exports: 'jQuery.fn.royalslider',
                    depends: {
                        jquery: 'jquery'
                    }
                }
            }
        }))
        .pipe(gulp.dest('public/js'))


    //single entry point to browserify
    //gulp.src('src/site/js/app.js')
    //    .pipe(browserify({
    //        insertGlobals : true,
    //        debug : !gulp.env.production
    //        //shim: {
    //        //    jquery: {
    //        //        path: 'node_modules/jquery/dist/jquery.min.js',
    //        //        exports: ['$','jQuery']
    //        //    },
    //        //    'slider': {
    //        //        path: 'src/site/js/libs/jquery.royalslider',
    //        //        exports: 'jquery.fn.royalslider',
    //        //        depends: {
    //        //            jquery: 'jquery'
    //        //        }
    //        //    }
    //        //}
    //    }))
    //    .pipe(concat('main.js'))
    //    .pipe(gulp.dest('public/js'))
});

//,
//"browserify": {
//    "transform": [
//        "browserify-shim"
//    ]
//},
//"browser": {
//    "jquery": "./src/site/js/libs/jquery.min.js",
//    "slider": "./src/site/js/libs/jquery.royalslider",
//    "globals": "./src/site/js/global",
//    "viewsTemplates": "./src/site/js/views.min",
//    "//": "Directives",
//    "resultDirective": "./src/site/js/directive/results/results",
//    "newsDirective": "./src/site/js/directive/news/news",
//    "fixturesDirective": "./src/site/js/directive/fixtures/fixtures"
//},
//"browserify-shim": {
//    "jquery": "jQuery"
//}