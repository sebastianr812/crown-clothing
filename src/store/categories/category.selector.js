import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

// this is NOT using re seelct and memoization

// // export const selectCategoriesMap = (state) => {
// //     console.log('selector fired');
// //     return state.categories.categories
// //         .reduce((total, category) => {
// //             const { title, items } = category;

// //             total[title.toLowerCase()] = items;
// //             return total;
// //         }, {});
// // }

// using re select and memoization

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((total, category) => {
        const { title, items } = category;

        total[title.toLowerCase()] = items;

        return total;
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)