import { mount, createLocalVue } from '@vue/test-utils'
import Persons from '../../src/components/persons.vue'
import Vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify)

let localVue = createLocalVue()

localVue.use(Vuex)

describe('persons', () => {
    let store
    let getters
    let vuetify
    let users = []

    let error = {
        show: false,
        message: '',
        type: 'error'
    }
    beforeEach(() => {
        getters = {
            getUsers: () => users,
            getPage: () => 1,
            getError: () => error,
            isFetching: () => false
        }
        vuetify = new Vuetify()
        store = new Vuex.Store({
        })
    })

    it('dont render persons when state.users is empty', () => {
        const wrapper = mount(Persons, {
            store,
            localVue,
            vuetify,
        })
        expect(wrapper.find('table').exists()).toBe(false)
    })
})
