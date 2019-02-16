import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(Vuex);

const apiUrl = 'https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en';

export const store = new Vuex.Store({
    state: {
        searchResults: {}
    },
    getters: {
        userStatus: state => state.user
    },
    actions: {
        getResults ({ commit }, payload) {
            return new Promise(resolve =>
            {
                axios.get(apiUrl, {
                    params: {
                        solrRows: 6,
                        solrTerm: payload.searchTerm
                    }
                }).then((response) =>
                {
                    if(response.data.results.hasOwnProperty('docs'))
                    {
                        commit('SEARCH_RESULTS', response.data.results.docs);

                        resolve(response.data.results.docs);
                    }
                }).catch(error =>
                {
                    commit('SEARCH_RESULTS', error);
                    resolve(error);
                });
            })
        }
    },
    mutations: {
        SEARCH_RESULTS (state, searchResults) {
            state.searchResults = searchResults
        },
    }
});
