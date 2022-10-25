import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#e91e63',
        secondary: '#9c27b0',
        accent: '#ffeb3b',
        error: '#4caf50',
        warning: '#2196f3',
        info: '#00bcd4',
        success: '#009688'
        /* primary: colors.pink.darken4,
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base */ // #3F51B5
      }
    }
  }
}

export default new Vuetify(opts)
