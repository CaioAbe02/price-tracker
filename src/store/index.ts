/* eslint-disable */

import axios from 'axios';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import IProduct from '@/interfaces/IProduct';
import { GET_PRODUCTS } from './action-types';
import { DEFINE_PRODUCTS } from './mutation-types';

interface State {
  products: IProduct[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    products: []
  },
  mutations: {
    [DEFINE_PRODUCTS](state, products: IProduct[]) {
      state.products = products
    }
  },
  actions: {
    [GET_PRODUCTS]({ commit }) {
      const url = "https://preco-bom-ddcc1-default-rtdb.firebaseio.com/.json"
      axios.get(url)
        .then(response => commit(DEFINE_PRODUCTS, response.data.products))
    }
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}