import { mount, createLocalVue } from '@vue/test-utils'
import AppHeader from '../../src/components/app-header.vue'
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify)

let localVue = createLocalVue()

localVue.use(Vuex, VueRouter)

describe('app-header', () => {
  let actions
  let store
  let vuetify
  let $route = {
    path: '/',
    name: 'home'
  }

  let router = new VueRouter()
  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      retrieveUsers: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('вызов метода загрузки пользователей при нажатии на кнопку поиска', () => {
    const wrapper = mount(AppHeader, {
      store,
      localVue,
      router,
      vuetify,
      mocks: {
        $route
      }
    })
    wrapper.setData({searchValue: '123'})
    const btn = wrapper.find('.v-btn')
    btn.trigger('click')
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(actions.retrieveUsers).toHaveBeenCalled()
  })
})
