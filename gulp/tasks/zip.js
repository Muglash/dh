import del from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
	del(`./${app.path.rootFolder}.zip`)
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "IMG",
			message: "Error: <%= erorr.message %>"
		})
	))
	.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
	.pipe(app.gulp.dest('./'))
}