import React from "react";
// import PropTypes from "prop-types";

const singleTask = ({ onClick, is_Completed, text }) => {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: is_Completed ? "line-through" : "none",
      }}
    >
      {text}
    </li>
  );
};

// Todo.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
// }

export default singleTask;
