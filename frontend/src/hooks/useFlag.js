import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  UserListChangeReset,
  addTask,
  TaskListChangeReset,
  LikeReaction,
  UnlikeReaction,
  Apply_Category_filter,
  Apply_is_Completed_filter,
  Unfiltered,
  selectUserListChange,
  selectTaskListChange,
  selectLike,
  selectCategoryFilterApply,
  selectIs_Completed_FilterApply,
} from "../store/changeFlagSlice";

function useTodo() {
  const dispatch = useDispatch();

  return {
    userListChange: useSelector(selectUserListChange),
    taskListChange: useSelector(selectTaskListChange),
    like: useSelector(selectLike),
    category_filter_apply: useSelector(selectCategoryFilterApply),
    is_Completed_filter_apply: useSelector(selectIs_Completed_FilterApply),
    Apply_Category_filter: () => dispatch(Apply_Category_filter()),
    Apply_is_Completed_filter: () => dispatch(Apply_is_Completed_filter()),
    Unfiltered: () => dispatch(Unfiltered()),
    addUser: () => dispatch(addUser()),
    UserListChangeReset: () => dispatch(UserListChangeReset()),
    addTask: () => dispatch(addTask()),
    TaskListChangeReset: () => dispatch(TaskListChangeReset()),
    LikeReaction: () => dispatch(LikeReaction()),
    UnlikeReaction: () => dispatch(UnlikeReaction()),
  };
}

export default useTodo;
