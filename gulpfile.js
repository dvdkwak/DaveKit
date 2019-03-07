const { src, dest, parallel, watch, series } = require("gulp");
const fs = require("fs");
const browserSync = require('browser-sync').create();

// Static Server
function gulpServer(cb)
{
  browserSync.init({
    server:{
      baseDir: "./app"
    }
  });
}

// updating the javascript
function updateJavascript()
{
  return src("./javascript/**/*.js")
    .pipe(dest("app/js"));
}

// message the display the update has been finished
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
           updateJavascript,
           message
         )
       );
  cb();
}

// default to crop and compile all files
exports.update = parallel( updateJavascript
                          );
exports.serve = gulpServer;
exports.default = container;
