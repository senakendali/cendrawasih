import { createStore } from 'vuex';
import auth from './modules/auth';  // Make sure the 'auth' module is imported

const store = createStore({
  modules: {
    auth,  // Register the 'auth' module here
  },
});

export default store;
