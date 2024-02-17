/* eslint-disable */

import axios from 'axios';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import IProduct from '@/interfaces/IProduct';
import { GET_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_PRODUCT_PRICE } from './action-types';
import { DEFINE_PRODUCTS } from './mutation-types';

const BASE_URL = process.env.VUE_APP_API_URL

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
    async [GET_PRODUCTS]({ commit }) {
      const url = `${BASE_URL}/products`
      await axios.get(url)
        .then(response => commit(DEFINE_PRODUCTS, response.data))
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
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}