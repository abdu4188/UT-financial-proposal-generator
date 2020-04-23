import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {auth} from '@/firebase/init'
import VueProgressBar from 'vue-progressbar'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.config.productionTip = false
Vue.use(VuejsDialog);
Vue.use(VueProgressBar, options)

let app = null

auth.onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})