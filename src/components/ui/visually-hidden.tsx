"use client";

import * as React from "react";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ asChild = false, ...props }, ref) => {
    const visuallyHiddenStyle = {
      position: "absolute" as const,
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap" as const,
      wordWrap: "normal" as const,
    };

    if (asChild) {
      const child = React.Children.only(props.children) as React.ReactElement<
        React.HTMLAttributes<HTMLElement>
      >;
      return React.cloneElement(child, {
        ...child.props,
        style: { ...child.props.style, ...visuallyHiddenStyle },
      });
    }

    return <span ref={ref} style={visuallyHiddenStyle} {...props} />;
  },
);
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
