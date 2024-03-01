/* eslint-disable */

import axios from 'axios';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import IProduct from '@/interfaces/IProduct';
import ITag from '@/interfaces/ITag';
import { GET_DATA, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_PRODUCT_PRICE, EDIT_TAG } from './action-types';
import { DEFINE_DATA } from './mutation-types';

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
    }
  },
  actions: {
    async [GET_DATA]({ commit }) {
      const url = `${BASE_URL}/data`
      await axios.get(url)
        .then(response => commit(DEFINE_DATA, response.data))
    },
    [ADD_PRODUCT](context, newProduct) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products`
        axios.post(url, newProduct)
          .then(response => {
            // commit(DEFINE_PRODUCTS, response.data);
            //console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error)
            reject(error)
          });

      })
    },
    [EDIT_PRODUCT](context, updatedProduct: IProduct) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products/edit/${updatedProduct.id}`;
        axios.put(url, updatedProduct)
          .then(response => {
            // commit(DEFINE_PRODUCTS, response.data);
            // console.log(response.data.message)
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error)
          });
      })
    },
    [UPDATE_PRODUCT_PRICE](context, updatedProduct: IProduct) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/products/update_price/${updatedProduct.id}`;
        axios.put(url, updatedProduct)
          .then(response => {
            // commit(DEFINE_PRODUCTS, response.data);
            // console.log(response.data.message)
            resolve(response.data)
          })
          .catch(error => {
            console.error('Error:', error);
            reject(error)
          });
      })
    },
    [EDIT_TAG](context, editedTag: ITag) {
      return new Promise((resolve, reject) => {
        const url = `${BASE_URL}/tags/edit/${editedTag.id}`;
        axios.put(url, editedTag)
          .then(response => {
            // commit(DEFINE_PRODUCTS, response.data);
            // console.log(response.data.message)
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