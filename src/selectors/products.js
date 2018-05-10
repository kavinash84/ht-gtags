import { createSelector } from 'reselect';

export const products = state => state.products.data;

export const getProducts = createSelector([products], items => items);
