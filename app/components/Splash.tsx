const Splash = () =>{
    return (
        <>
            <video autoPlay muted loop>
                <source src="./treevideo.mp4" type="video/mp4" />
            
            </video>
            <div className="splash">
                <div className="text">
                    <div className="title">TREEHACK</div>
                    <div className="subtitle">Fight the urban heat island effect by visualizing a greener future</div>
                    <a href='#Start'><button className="hero-button">Get Started</button></a>
                </div>
            </div>
        </>
    )
}


export default Splash