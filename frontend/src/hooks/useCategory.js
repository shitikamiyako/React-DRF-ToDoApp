import { useSelector, useDispatch } from 'react-redux';
import { getCategoryList, resetCategoryList, selectCategory } from '../Store/categorySlice';

function useCategory() {
    const dispatch = useDispatch();

    return {
        category: useSelector(selectCategory),
        getCategoryList: (category) => dispatch(getCategoryList(category)),
        resetCategoryList: () => dispatch(resetCategoryList()),
    };
}

export default useCategory;