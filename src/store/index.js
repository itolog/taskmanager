import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [createPersistedState()],
  state: {
    name: '',
    tasks: []
  },
  getters: {

  },
  mutations: {
    nameSet (state, payload) {
      state.name = payload;
		},
		nameClear(state) {
			state.name = '';
			state.tasks = [];
		},
		addTask(state, tsk) {
			let key = (state.tasks.length + 3) + tsk;
			state.tasks.push({
				id: key,
				plan: tsk,
				done: false
			})
		},
		doneTask(state, e) {
			let ident = e.target.parentElement.parentElement.id;
			let checked = e.target.checked;
			console.log(checked);
			let a = state.tasks.filter((val) => {
				if (val.id == ident) {
					state.tasks.splice(state.tasks.indexOf(val), 1);
				}
			})
		}
  }
})