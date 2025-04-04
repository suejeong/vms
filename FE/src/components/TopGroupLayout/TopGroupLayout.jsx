
import React from "react";

export default function TopGroupLayout({ children }) {
  return (
    <div className="flex items-center flex-wrap gap-y-4">
      {
        React.Children.map(children, (child, idx) => {
            let addStyles = null; 
            if(idx === 0) addStyles = 'flex-1 '
            if(idx === 1) addStyles = 'flex flex-wrap gap-y-4'  
            return React.cloneElement(child, {
                className: `${idx === 0 ? addStyles : ""} ${idx === 1 ? addStyles : ""}`});
        })
      }
    </div>
  );
}
