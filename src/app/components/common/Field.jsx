// "use client";
// import React from "react";

// const Field = ({ label, children, htmlFor, error }) => {
//   const id = htmlFor || getChildId(children);
//   return (
//     <div className="form-control">
//       {label && (
//         <label className="auth-label" htmlFor={id}>
//           {label}
//         </label>
//       )}

//       {children}
//       {error && <span className="text-red-500">{error.message}</span>}
//     </div>
//   );
// };

// const getChildId = (children) => {
//   const child = React.Children.only(children);
//   if ("id" in child?.props) {
//     return child.props.id;
//   }
// };

// export default Field;



import React from "react";
import { useId } from "react";

const Field = ({ label, children, htmlFor, error }) => {
  const generatedId = useId();
  const id = htmlFor || getChildId(children) || generatedId;

  return (
    <div
      className={`form-control ${error ? "has-error" : ""}`}
      role="group"
      aria-labelledby={`${id}-label`}
    >
      {label && (
        <label className="auth-label" id={`${id}-label`} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-red-500" id={`${id}-error`} role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};

const getChildId = (children) => {
  // Handle cases where there are multiple children or no children
  if (!children || Array.isArray(children)) {
    const childrenArray = React.Children.toArray(children);
    for (const child of childrenArray) {
      if (React.isValidElement(child) && child.props.id) {
        return child.props.id;
      }
    }
    return undefined;
  }

  // Handle case where there's a single child
  if (React.isValidElement(children) && children.props.id) {
    return children.props.id;
  }

  return undefined;
};

export default Field;
