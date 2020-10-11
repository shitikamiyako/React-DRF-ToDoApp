import { useSelector, useDispatch } from "react-redux";
import {
  get_pageNationNext,
  get_pageNationPrevious,
  get_pageNationLastNumber,
  get_pageNationCurrent,
  get_contentsAllCount,
  resetItem,
  selectPageNationNext,
  selectPageNationPrevious,
  selectPageNationLastNumber,
  selectPageNationCurrent,
  selectPageNationAllCount,
} from "../store/pageNationSlice";

function useTodo() {
  const dispatch = useDispatch();

  return {
    // todos: useSelector(selectTodo),
    pageNationNext: useSelector(selectPageNationNext),
    pageNationPrevious: useSelector(selectPageNationPrevious),
    pageNationLastNumber: useSelector(selectPageNationLastNumber),
    pageNationCurrent: useSelector(selectPageNationCurrent),
    contentsAllCount: useSelector(selectPageNationAllCount),
    get_pageNationNext: (data) => dispatch(get_pageNationNext(data)),
    get_pageNationPrevious: (data) => dispatch(get_pageNationPrevious(data)),
    get_pageNationLastNumber: (data) =>
      dispatch(get_pageNationLastNumber(data)),
    get_pageNationCurrent: (data) => dispatch(get_pageNationCurrent(data)),
    get_contentsAllCount: (data) => dispatch(get_contentsAllCount(data)),
    resetItem: () => dispatch(resetItem()),
  };
}

export default useTodo;
