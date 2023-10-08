import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGetCategories,
  fetchGetGroups,
  fetchGetProducts,
  fetchGetStores,
  fetchGetSubcategories,
} from '../async-thunk/filter-thunk';
import { TCategory, TGroup, TProduct, TStore, TSubcategory } from '../types';

interface IFilterSliceState {
  getStoresError: null | boolean;
  getStoresLoading: null | boolean;
  stores: Array<TStore>;
  getGroupsError: null | boolean;
  getGroupsLoading: null | boolean;
  groups: Array<TGroup>;
  getCategoriesError: null | boolean;
  getCategoriesLoading: null | boolean;
  categories: Array<TCategory>;
  getSubcategoriesError: null | boolean;
  getSubcategoriesLoading: null | boolean;
  subcategories: Array<TSubcategory>;

  getProductsError: null | boolean;
  getProductsLoading: null | boolean;
  products: Array<TProduct>;
  selectedStores: Array<string>;
  selectedGroups: Array<string>;
  selectedCategories: Array<string>;
  selectedSubcategories: Array<string>;
  selectedProducts: Array<string>;
}

export const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: {
    getStoresError: null,
    getStoresLoading: null,
    stores: [],
    getGroupsError: null,
    getGroupsLoading: null,
    groups: [],
    getCategoriesError: null,
    getCategoriesLoading: null,
    categories: [],
    getSubcategoriesError: null,
    getSubcategoriesLoading: null,
    subcategories: [],
    getProductsError: null,
    getProductsLoading: null,
    products: [],
    selectedStores: [],
    selectedGroups: [],
    selectedCategories: [],
    selectedSubcategories: [],
    selectedProducts: [],
  } as IFilterSliceState,
  reducers: {
    selectStores(state, action) {
      state.selectedStores = action.payload;
    },
    selectGroups(state, action) {
      state.selectedGroups = action.payload;
    },
    selectCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    selectSubcategories(state, action) {
      state.selectedSubcategories = action.payload;
    },
    selectProducts(state, action) {
      state.selectedProducts = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetStores.pending, (state) => {
        state.getStoresLoading = true;
        state.getStoresError = false;
      })
      .addCase(fetchGetStores.fulfilled, (state, action) => {
        state.getStoresError = false;
        state.getStoresLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchGetStores.rejected, (state) => {
        state.getStoresLoading = false;
        state.getStoresError = true;
      })
      .addCase(fetchGetGroups.pending, (state) => {
        state.getGroupsLoading = true;
        state.getGroupsError = false;
      })
      .addCase(fetchGetGroups.fulfilled, (state, action) => {
        state.getGroupsError = false;
        state.getGroupsLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGetGroups.rejected, (state) => {
        state.getGroupsLoading = false;
        state.getGroupsError = true;
      })
      .addCase(fetchGetCategories.pending, (state) => {
        state.getCategoriesLoading = true;
        state.getCategoriesError = false;
      })
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.getCategoriesError = false;
        state.getCategoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchGetCategories.rejected, (state) => {
        state.getCategoriesLoading = false;
        state.getCategoriesError = true;
      })
      .addCase(fetchGetSubcategories.pending, (state) => {
        state.getSubcategoriesLoading = true;
        state.getSubcategoriesError = false;
      })
      .addCase(fetchGetSubcategories.fulfilled, (state, action) => {
        state.getSubcategoriesError = false;
        state.getSubcategoriesLoading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchGetSubcategories.rejected, (state) => {
        state.getSubcategoriesLoading = false;
        state.getSubcategoriesError = true;
      })
      .addCase(fetchGetProducts.pending, (state) => {
        state.getProductsLoading = true;
        state.getProductsError = false;
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        state.getProductsError = false;
        state.getProductsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchGetProducts.rejected, (state) => {
        state.getProductsLoading = false;
        state.getProductsError = true;
      });
  },
});
