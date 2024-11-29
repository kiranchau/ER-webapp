import React from 'react'
import { ColorRing } from "react-loader-spinner";
const Progress = () => {
  return (
    <div className="flex items-center justify-center">
      <ColorRing
        visible={true}
        height="80"
        width="40"
        colors={["#4F46E5", "#4F46E5", "#4F46E5", "#4F46E5", "#4F46E5"]}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
      />
    </div>
  )
}

export default Progress