import { SET_PACKAGES } from './mutation-types';
import axios from 'axios';

export default {
    state: {
        packages: null,
    },
    getters: {
        packages: state => state.packages?.objects.map(p => ({
            name: p.package.name,
            version: p.package.version,
            author: p.package?.author?.name || ''
        })) || [],
        totalItems: state => Number(state.packages?.total) || 0,
    },
    actions: {
        async fetchPackages({ commit }, {page = 1, query}) {
            const size = 10;
            const from = (page - 1) * size;
            const text = query;
            
            let response;
            try {
                response = await axios.get(`https://registry.npmjs.org/-/v1/search`, {
                    params: {
                        text,
                        size,
                        from
                    }
                });
            } catch (e) {
                console.error(e);
                return;
            }

            commit(SET_PACKAGES, response.data);
        }
    },
    mutations: {
        [SET_PACKAGES](state, packages) {
            state.packages = packages;
        },
    }
}