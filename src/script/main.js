import { Router, Route, Layout } from '../../core/core.js'
import router from '../../routes/router.js'

Route.init({
    el: '#app',
    Layout,
    router,
})