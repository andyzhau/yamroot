var del = require('del');
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');

var node;

gulp.task('watch', ['server'], () => {
  gulp.watch('server/**/*', ['server']);
});

gulp.task('server', ['build'], () => {
  if (node) {
    node.kill();
  }

  node = spawn('node', ['dist/server/server.js'], {
    stdio: 'inherit'
  });
  node.on('close', code => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('build', ['resources'], () => {
  var tsResult = gulp
    .src('server/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult
    .pipe(
      sourcemaps.write('.', {
        sourceRoot: file => {
          return file.cwd + '/server';
        },
      }),
    )
    .pipe(gulp.dest('dist/server'));
});

gulp.task('resources', ['clean'], () => {
  gulp
    .src(['server/**/*.json', 'server/**/*.pug', 'server/**/*.js', 'server/**/*.yaml'])
    .pipe(gulp.dest('dist/server'));
});

gulp.task('clean', () => {
  return del(['dist/server/**/*']);
});
