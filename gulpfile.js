const gulp = require('gulp');   //o nome da const pode ser qq coisa
const sass = require('gulp-sass')(require('sass'));  //dps q baixou no terminal o gulp-sass
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');



// Função para comprimir imagens
function comprimeImagens() {
    console.log('Iniciando compressão de imagens...');
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .on('end', () => console.log('Compressão de imagens finalizada.'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function compilaSass( ) {
    return gulp.src ('./source/styles/main.scss')    //retorna a const gulp, pegando todos os arquivos da pasta source de extensao scss.
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss',{ignoreInitial:false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js',{ignoreInitial:false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*',{ignoreInitial:false}, gulp.series(comprimeImagens));
}
