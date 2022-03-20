export default {
    install (app, option) {
        app.config.globalProperties.$message = function (html) {
            M.toast({html})
        }

        app.config.globalProperties.$error = function (html) {
            M.toast({html: `[Ошибка] ${html}`})
        }
    }
}