/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* GULPFILE.JS
/******************************************/

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var sitemap     = require('gulp-sitemap');


/*******************************************
/              LOGIN PAGE
/******************************************/

// LOGIN CUSTOM SASS ======================
gulp.task('login-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/errormodal.scss',
        'resources/sass/login/login.scss',
        ])
        .pipe(concat('login.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// LOGIN CUSTOM JS ========================
gulp.task('login-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/errormodal.js',
        'resources/js/login/login.js',
        'resources/js/universal/images/photoupload.js',
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('login.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});

/*******************************************
/              REGISTER PAGE
/******************************************/

// REGISTER CUSTOM SASS ======================
gulp.task('register-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/errormodal.scss',
        'resources/sass/templates/footerlinks.scss',
        'resources/sass/templates/photoupload.scss',
        'resources/sass/register/register.scss',
        ])
        .pipe(concat('register.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// REGISTER CUSTOM JS ========================
gulp.task('register-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/errormodal.js',
        'resources/js/templates/footerlinks.js',
        'resources/js/templates/photoupload.js',        
        'resources/js/register/register.js',
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('register.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/              CLIENT PAGE
/******************************************/

// CLIENT CUSTOM SASS ======================
gulp.task('client-custom-sass', function() {
    gulp.src([
        'resources/sass/client/*.scss',
        'resources/sass/templates/errormodal.scss',        
        'resources/sass/templates/photoupload.scss',
    ])
        .pipe(concat('client.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// CLIENT CUSTOM JS ======================
gulp.task('client-custom-js', function() {
    return gulp.src([
        'resources/js/client/clientbase.js',
        'resources/js/templates/errormodal.js',                
        'resources/js/client/stylistprofile.js',
        'resources/js/client/clientadd.js',
        'resources/js/client/clientmenu.js',
        'resources/js/client/clientnav.js',
        'resources/js/client/clientprofile.js',
        'resources/js/client/clientlist.js',
        'resources/js/client/clientreport.js',
        'resources/js/templates/photoupload.js',
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('client.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/               PROFILE PAGE
/******************************************/

// PROFILE CUSTOM SASS ======================
gulp.task('profile-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/footerlinks.scss',
        'resources/sass/profile/profile.scss'
        ])
        .pipe(concat('profile.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// PROFILE CUSTOM JS ========================
gulp.task('profile-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/footerlinks.js',
        'resources/js/profile/profile.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('profile.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/               CONTACT PAGE
/******************************************/

// CONTACT CUSTOM SASS ======================
gulp.task('contact-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/footerlinks.scss',
        'resources/sass/contact/contact.scss'
        ])
        .pipe(concat('contact.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// CONTACT CUSTOM JS ========================
gulp.task('contact-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/footerlinks.js',
        'resources/js/contact/contact.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('contact.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/               RATING PAGE
/******************************************/

// RATING CUSTOM SASS ======================
gulp.task('rating-custom-sass', function() {
    gulp.src([
        'resources/sass/rating/rating.scss'
        ])
        .pipe(concat('rating.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// RATING CUSTOM JS ========================
gulp.task('rating-custom-js', function() {
    return gulp.src([
        'resources/js/rating/rating.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('rating.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/                MAP PAGE
/******************************************/

// MAP CUSTOM SASS ======================
gulp.task('map-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/map/searchbox.scss',
        'resources/sass/map/map.scss',
        ])
        .pipe(concat('map.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/'))
});

// MAP CUSTOM JS ========================
gulp.task('map-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/map/map.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('map.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});


/*******************************************
/               ABOUT PAGE
/******************************************/

// ABOUT CUSTOM SASS ======================
gulp.task('about-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/footerlinks.scss',
        'resources/sass/templates/motiongraphic.scss',
        'resources/sass/learn/about/about.scss',        
        'resources/sass/learn/about/banner.scss',
        'resources/sass/learn/about/infoboxes.scss',
        'resources/sass/learn/about/stylistbox.scss' 
        ])
        .pipe(concat('about.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});

// ABOUT CUSTOM JS ========================
gulp.task('about-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/footerlinks.js',
        'resources/js/templates/motiongraphic.js',
        'resources/js/learn/about/about.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('about.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/learn/'))
});


/*******************************************
/               BLOG PAGE
/******************************************/

// BLOG CUSTOM SASS ======================
gulp.task('blog-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/learn/blog/blog.scss'
        ])
        .pipe(concat('blog.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});

// BLOG CUSTOM JS ========================
gulp.task('blog-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/learn/blog/blog.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('blog.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/learn/'))
});


/*******************************************
/             TUTORIALS PAGE
/******************************************/

// TUTORIALS CUSTOM SASS ======================
gulp.task('tutorials-custom-sass', function() {
    gulp.src([
        'resources/sass/templates/navmenu.scss',
        'resources/sass/templates/footerlinks.scss',
        'resources/sass/learn/tutorials/tutorials.scss'
        ])
        .pipe(concat('tutorials.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});

// TUTORIALS CUSTOM JS ========================
gulp.task('tutorials-custom-js', function() {
    return gulp.src([
        'resources/js/templates/navmenu.js',
        'resources/js/templates/footerlinks.js',
        'resources/js/learn/tutorials/tutorials.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('tutorials.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/learn/'))
});


/*******************************************
/                MISTAKE PAGE
/******************************************/

// MISTAKE CUSTOM SASS ======================
gulp.task('mistake-custom-sass', function() {
    gulp.src([
        'resources/sass/learn/mistake/mistake.scss'
        ])
        .pipe(concat('mistake.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});

// MISTAKE CUSTOM JS ========================
gulp.task('mistake-custom-js', function() {
    return gulp.src([
        'resources/js/learn/mistake/mistake.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('mistake.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/learn/'))
});

/*******************************************
/                PRIVACY PAGE
/******************************************/

// PRIVACY CUSTOM SASS ======================
gulp.task('privacy-custom-sass', function() {
    gulp.src([
        'resources/sass/learn/privacy/privacy.scss'
        ])
        .pipe(concat('privacy.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});

/*******************************************
/                TERMS PAGE
/******************************************/

// TERMS CUSTOM SASS ======================
gulp.task('terms-custom-sass', function() {
    gulp.src([
        'resources/sass/learn/terms/terms.scss'
        ])
        .pipe(concat('terms.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/app/styles/learn/'))
});


/*******************************************
/                VENDOR
/******************************************/

// VENDOR CSS ============================
gulp.task('vendor-css', function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/normalize-css/normalize.css',
        'node_modules/animate.css/animate.min.css',
        'resources/sass/universal/base.scss'
        ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/app/styles/'))
});

// VENDOR JS ============================
gulp.task('vendor-js', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/moment/moment.js',
        'node_modules/jquery.cookie/jquery.cookie.js',
        'node_modules/jquery-validation-dist/dist/jquery.validate.js',
        'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
        'resources/js/universal/images/resize.js',
        'resources/js/universal/google/analytics.js',
        'resources/js/universal/api/' + (gutil.env.api ? gutil.env.api : 'test') + 'api.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(gutil.env.api === 'prod' ? uglify() : gutil.noop())    // uglify with '--api prod'
    .pipe(gulp.dest('./public/app/js/'))
});

/*******************************************
/                SITEMAP
/******************************************/
gulp.task('sitemap', function () {
    gulp.src('public/**/*.html', { read: false })
    .pipe(sitemap({ siteUrl: 'https://www.hairbrain.ca' }))
    .pipe(gulp.dest('public/'));
});


/*******************************************
/                 TASKS
/******************************************/

// DEFAULT TASK ============================
gulp.task('default', [
    'login-custom-sass',     'login-custom-js',
    'register-custom-sass',  'register-custom-js',
    'client-custom-sass',    'client-custom-js', 
    'profile-custom-sass',   'profile-custom-js', 
    'contact-custom-sass',   'contact-custom-js',
    'rating-custom-sass',    'rating-custom-js',
    'map-custom-sass',       'map-custom-js',
    'about-custom-sass',     'about-custom-js',
    'blog-custom-sass',      'blog-custom-js',
    'tutorials-custom-sass', 'tutorials-custom-js',
    'mistake-custom-sass',   'mistake-custom-js',
    'privacy-custom-sass',   'terms-custom-sass',
    'vendor-css',            'vendor-js',
]);

// WATCH TASK ============================
gulp.task('watch', function() {
    gulp.watch([
        'resources/js/**/*.js',
        'resources/sass/**/*.scss'
    ], ['default']);
});