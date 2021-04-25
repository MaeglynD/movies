/* eslint-disable no-undef */
import Vuex from 'vuex';
import axios from 'axios';
import { createLocalVue } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

describe('store/movies', () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  let NuxtStore;
  let store;
  let mock;

  beforeAll(async () => {
    const storePath = `${process.env.buildDir}/store.js`;
    NuxtStore = await import(storePath);
  });

  beforeEach(async () => {
    store = await NuxtStore.createStore();
    store.$axios = axios;
    mock = new MockAdapter(store.$axios);
  });

  describe('Action methods', () => {
    //
  });
});
