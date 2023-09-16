import bg from '../assets/splash.png'

const Splash = () =>{
    return (
        <>
            <video autoPlay muted loop>
                <source src="./treevideo.mp4" type="video/mp4" />
            
            </video>
            <div className="splash">
                <div className="text">
                    <div className="title">TREEHACK</div>
                    <div className="subtitle">blah blah blah</div>
                    <a href='#Start'><button className="hero-button">Begin Your Journey</button></a>
                </div>
            </div>
        </>
    )
}


export default Splash