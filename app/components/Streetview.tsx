import { useState } from 'react';

const Streetview = () =>{
    const [isToggled, setIsToggled] = useState(false);

    function togglePanel(){
        const panel = document.getElementById("panel")
        
        if(panel && !isToggled){
            setIsToggled(true)
            console.log("toggled")
            panel.style.display = "block"
            // panel.style.opacity = "1"
        }
        else if(panel && isToggled){
            setIsToggled(false)
            console.log("untoggled")
            panel.style.display = "none"
            // panel.style.opacity = "0"
        }
    }

    return (
      <>
        <div className="streetview" id="panel">
        </div>
        <button id="toggle-button" onClick={togglePanel}>Click Me</button>
      </>
    )
}


export default Streetview