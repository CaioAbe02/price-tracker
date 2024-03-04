/* eslint-disable */

import axios from 'axios';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import IProduct from '@/interfaces/IProduct';
import ITag from '@/interfaces/ITag';
import { GET_DATA, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_PRODUCT_PRICE, ADD_TAG, EDIT_TAG } from './action-types';
import { DEFINE_DATA, DEFINE_PRODUCT } from './mutation-types';

const BASE_URL = process.env.VUE_APP_API_URL

interface State {
  products: IProduct[],
  tags: ITag[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    products: [],
    tags: []
  },
  mutations: {
    [DEFINE_DATA](state, data: State) {
      state.products = data.products
      state.tags = data.tags
    },
    [DEFINE_PRODUCT](state, product: IProduct) {
      state.products[product.id] = product
    }
  },
  actions: {
    async [GET_DATA]({ commit }) {
      const url = `${BASE_URL}/data`
      await axios.get(url)
        .then(response => commit(DEFINE_DATA, response.data))
    },
    [ADD_PRODUCT]({ commit }, new_product) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products`
        axios.post(url, new_product)
          .then(response => {
            commit(DEFINE_PRODUCT, response.data.product)
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error)
            reject(error)
          });

      })
    },
    [EDIT_PRODUCT](context, updated_product: IProduct) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products/edit/${updated_product.id}`;
        axios.put(url, updated_product)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error)
          });
      })
    },
    [UPDATE_PRODUCT_PRICE]({ commit }, updated_product: IProduct) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products/update_price/${updated_product.id}`;
        axios.put(url, updated_product)
          .then(response => {
            commit(DEFINE_PRODUCT, response.data.product)
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error)
          });
      })
    },
    [ADD_TAG](context, new_tag: ITag) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/tags`
        axios.post(url, new_tag)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error)
            reject(error)
          });

      })
    },
    [EDIT_TAG](context, edited_tag: ITag) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/tags/edit/${edited_tag.id}`;
        axios.put(url, edited_tag)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error)
          });
      })
    },
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}