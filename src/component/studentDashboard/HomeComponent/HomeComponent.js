import React from 'react'

function WorkComponent() {
    return (
        <>
        <div className="xsom"></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 style={{ fontFamily: "BPG Arial Caps" }}>მთავარი კომპონენტი</h1>
        </div>
      </>
    )
}

export default WorkComponent;
