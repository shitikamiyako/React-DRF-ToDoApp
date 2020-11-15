import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  UserListChangeReset,
  addTask,
  TaskListChangeReset,
  addGroup,
  GroupListChangeReset,
  addMember,
  MemberListChangeReset,
  LikeReaction,
  UnlikeReaction,
  Apply_Category_filter,
  Apply_is_Completed_filter,
  Unfiltered,
  selectUserListChange,
  selectTaskListChange,
  selectGroupListChange,
  selectMemberListChange,
  selectLike,
  selectCategoryFilterApply,
  selectIs_Completed_FilterApply,
} from "../Store/changeFlagSlice";

function useTodo() {
  const dispatch = useDispatch();

  return {
    userListChange: useSelector(selectUserListChange),
    taskListChange: useSelector(selectTaskListChange),
    groupListChange: useSelector(selectGroupListChange),
    memberListChange: useSelector(selectMemberListChange),
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
    addGroup: () => dispatch(addGroup()),
    GroupListChangeReset: () => dispatch(GroupListChangeReset()),
    addMember: () => dispatch(addMember()),
    MemberListChangeReset: () => dispatch(MemberListChangeReset()),
    LikeReaction: () => dispatch(LikeReaction()),
    UnlikeReaction: () => dispatch(UnlikeReaction()),
  };
}

export default useTodo;
