var gulp = require('gulp');
const { src, dest, parallel, watch, series } = require("gulp");
const fs = require("fs");
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

// updating the index file
function updateRoutes(cb)
{
  return src("routes.php")
    .pipe(dest("app"));
}

// updating the models
function updateModels()
{
  return src("./models/**/*.php")
    .pipe(dest("app/sys/models"));
}

// updating the views
function updateViews()
{
  return src("./looks/**/*.php")
    .pipe(dest("app/sys/views"));
}

// updating the controllers
function updateControllers()
{
  return src("./controllers/**/*.php")
    .pipe(dest("app/sys/controllers"));
}

// updating the javascript
function updateJavascript()
{
  return src("./javascript/**/*.js")
    .pipe(dest("app/js"));
}

function message(cb)
{
  console.log("\n ____ ** FINISHED UPDATE ** ____\n");
  cb();
}

// default function
function container(cb)
{
  watch(["routes.php",
         "./models/**/*.php",
         "./looks/**/*.php",
         "./controllers/**/*.php",
         "./javascript/**/*.js"],
         series(
           parallel(
             updateRoutes,
             updateModels,
             updateViews,
             updateControllers,
             updateJavascript
           ),
           message
         )
       );
  cb();
}

exports.update = parallel( updateRoutes,
                           updateModels,
                           updateViews,
                           updateControllers,
                           updateJavascript
                          );
exports.default = container;
