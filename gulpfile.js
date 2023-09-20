// Импортируем необходимые модули и функции Gulp
import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';

// Импортируем функции для обработки стилей и других задач из других файлов
import {compileStyles, compileMinStyles} from './gulp/compileStyles.mjs';
import {copy, copyImages, copySvg} from './gulp/copyAssets.mjs';
import {compileMainMinScripts, compileMainScripts, compileVendorScripts} from './gulp/compileScripts.mjs';
import {optimizeSvg, sprite, createWebp, optimizePng, optimizeJpg} from './gulp/optimizeImages.mjs';

// Создаем экземпляр сервера BrowserSync
const server = browserSync.create();

// Функция для обновления стилей без перезагрузки страницы
const streamStyles = () => compileStyles().pipe(server.stream());

// Функция для удаления директории 'build'
const clean = () => del('build');

// Функция для настройки и запуска локального сервера
const syncServer = () => {
  server.init({
    server: 'build/',
    index: 'sitemap.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  // Наблюдение за файлами и выполнение соответствующих задач при изменениях
  gulp.watch('source/**.html', gulp.series(copy, refresh));
  gulp.watch('source/sass/**/*.{scss,sass}', streamStyles);
  gulp.watch('source/js/**/*.{js,json}', gulp.series(compileMainScripts, compileVendorScripts, refresh));
  gulp.watch('source/data/**/*.{js,json}', gulp.series(copy, refresh));
  gulp.watch('source/img/**/*.svg', gulp.series(copySvg, sprite, refresh));
  gulp.watch('source/img/**/*.{png,jpg,webp}', gulp.series(copyImages, refresh));

  gulp.watch('source/favicon/**', gulp.series(copy, refresh));
  gulp.watch('source/video/**', gulp.series(copy, refresh));
  gulp.watch('source/downloads/**', gulp.series(copy, refresh));
  gulp.watch('source/*.php', gulp.series(copy, refresh));
};

// Функция для обновления страницы
const refresh = (done) => {
  server.reload();
  done();
};

// Функция для сборки проекта
const build = gulp.series(clean, copy, sprite, gulp.parallel(compileMinStyles, compileMainMinScripts, compileVendorScripts, optimizePng, optimizeJpg, optimizeSvg));

// Функция для разработки
const dev = gulp.series(clean, copy, sprite, gulp.parallel(compileMinStyles, compileMainMinScripts, compileVendorScripts, optimizePng, optimizeJpg, optimizeSvg), syncServer);

// Функция для старта разработки
const start = gulp.series(clean, copy, sprite, gulp.parallel(compileStyles, compileMainScripts, compileVendorScripts), syncServer);

// Экспортируем функции для использования в Gulp
export {createWebp as webp, build, start, dev};
