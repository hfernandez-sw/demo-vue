import Vuex from 'vuex';
import _ from 'lodash';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import { routes } from '@/router/index.js';
import actions from './actions';
import getters from './getters';
import state from './state';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({ routes });

let mountedElement = null;
let defaultStoreConfig = {};

const customizer = (objValue, srcValue) => Object.assign({}, objValue, srcValue);

const createStore = (overrides) => {
  if (!defaultStoreConfig) {
    defaultStoreConfig = overrides;
  }
  return new Vuex.Store(_.mergeWith(defaultStoreConfig, overrides, customizer));
};

export default function factory(element, props = {}) {
  const { store, data, computed, propsData, attachTo, slots, mocks } = props;

  const elementToMount = element;
  const defaultMountingOptions = {
    localVue,
    router,
    store: createStore(
      store
        ? {
            state: { ...state, ...store.state },
            getters: { ...getters, ...store.getters },
            actions: { ...actions, ...store.actions }
          }
        : {
            state,
            getters,
            actions
          }
    ),
    data,
    computed,
    propsData,
    attachTo,
    slots,
    mocks
  };

  this.shallowMount = () => {
    mountedElement = shallowMount(elementToMount, defaultMountingOptions);
    return mountedElement;
  };

  this.destroy = () => {
    mountedElement = null;
    return mountedElement;
  };

  this.updateStore = (prop) => {
    if (!elementToMount) return false;

    const overrides = {
      store: createStore(prop.store)
    };

    mountedElement = shallowMount(
      elementToMount,
      _.mergeWith(defaultMountingOptions, overrides, customizer)
    );

    return mountedElement;
  };
}
