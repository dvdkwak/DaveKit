const { src, dest, parallel, watch, series } = require("gulp");
const fs = require("fs");
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglifyEs = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const htmlbeautify = require('gulp-html-beautify');

// Static Server
function gulpServer(cb)
{
  browserSync.init({
    server:{
      baseDir: "./app"
    }
  });
}

// updating all the javascript models
function updateModels()
{
  return src("./models/**/*.js")
    .pipe(concat("models.js"))
    .pipe(uglifyEs())
    .pipe(dest("app/js/"));
}

// updateing all the js functions
function updateFunctions()
{
  return src("./functions/**/*.js")
    .pipe(concat("functions.js"))
    .pipe(uglifyEs())
    .pipe(dest("app/js/"));
}

// update the core.js file
function updateCore()
{
  return src("./core.js")
    .pipe(concat("core.js"))
    .pipe(uglifyEs())
    .pipe(dest("app/js/"));
}

// update the html file
function updateHtml()
{
  let options = {indentSize: 1};
  return src('./index.html')
    .pipe(htmlbeautify(options))
    .pipe(dest('app/'));
}

// update and compile the Sass
function updateSass()
{
  return src('./src/container.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('app/src'));
}

function updateLibJs()
{
  return src('./lib/**/*.js')
    .pipe(dest('app/lib'));
}

function updateLibCss()
{
  return src('./lib/**/*.css')
    .pipe(dest('app/lib'));
}

// reloadBrowsers to reload all connected browsers
function reloadBrowsers(cb)
{
  browserSync.reload();
  cb();
}

// message the display the update has been finished
function messageUpdate(cb)
{
  console.log(" ____ ** FINISHED UPDATE ** ____");
  cb();
}

// default function
function container(cb)
{
  watch(["./core.js",
         "./models/**/*.js",
         "./functions/**/*.js",
         "./index.html",
         "./lib/**/*.js",
         "./lib/**/*.css",
         "./src/**/*.sass"
       ],
         series(
           updateSass,
           updateHtml,
           updateModels,
           updateFunctions,
           updateCore,
           updateLibJs,
           updateLibCss,
           messageUpdate,
           reloadBrowsers
         )
       );
  cb();
}

// function to do in default

// default to crop and compile all files
exports.update = parallel( updateHtml,
                           updateSass,
                           updateModels,
                           updateFunctions,
                           updateLibJs,
                           updateLibCss,
                           updateCore,
                           messageUpdate
                          );
exports.serve = gulpServer;
exports.watcher = container;
exports.default = parallel( gulpServer, container);
