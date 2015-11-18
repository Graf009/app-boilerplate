/**
 * Created by Oleg Orlov on 30.07.15.
 */

// gulp modules
import gulp from 'gulp';
import del from 'del';

// util
import pjson from './package.json';
const projectTitle = `${pjson.name}-${pjson.version}`;

// css lint
import stylelint from 'stylelint';
import reporter from'postcss-reporter';

// Load gulp plugins
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

const paths = {
  src: 'src',
  dest: 'public',
  arch: 'dist',
};

// Clean output directory
gulp.task('clean-dest', () => del(`${paths.dest}/`));

gulp.task('clean-arch', () => del(`${paths.arch}/`));

// zip output directory
gulp.task('zip', ['clean-arch'], () =>
  gulp.src(`${paths.dest}/*`)
    .pipe($.zip(`${projectTitle}.zip`))
    .pipe(gulp.dest(paths.arch))
    .pipe($.size({ title: 'zip' }))
);

// tag.gzip output directory
gulp.task('gzip', ['clean-arch'], () =>
  gulp.src(`${paths.dest}/*`)
    .pipe($.tar(`${projectTitle}.tar`))
    .pipe($.gzip())
    .pipe(gulp.dest(paths.arch))
    .pipe($.size({ title: 'gzip' }))
);

/**
 * Check Style command
 */

// Spellcheck markdown file
gulp.task('spellcheck', () =>
    gulp.src('*.md', { read: false })
        .pipe($.shell('yaspeller <%= file.path %>'))
);

// Javascript formatted
gulp.task('jscs', () =>
  gulp.src(`${paths.src}/**/*.js`)
    .pipe($.jscs())
    .pipe($.jscs.reporter())
);

// Javascript check style
gulp.task('eslint', () =>
  gulp.src(`${paths.src}/**/*.js`)
    .pipe($.eslint())
    .pipe($.eslint.format())
);

// CSS lint
gulp.task('csslint', () =>
  gulp.src(`${paths.src}/**/*.css`)
    .pipe($.postcss([
      stylelint(),
      reporter({
        clearMessages: true,
      }),
    ]))
);

/**
 * Gulp command
 */

// gulp clean
// description -- clean dest and arch path
gulp.task('clean', ['clean-dest', 'clean-arch']);

// gulp deploy
// description -- simply deploy
gulp.task('deploy', ['gzip']);

// gulp lint
// description -- check style code
gulp.task('lint', ['spellcheck', 'eslint', 'csslint', 'jscs']);
