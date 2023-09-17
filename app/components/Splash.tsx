const Splash = () =>{
    return (
        <>
            <video autoPlay muted loop>
                <source src="./treevideo.mp4" type="video/mp4" />
            
            </video>
            <div className="splash">
                <div className="text">
                    <div className="title">TREEHACK</div>
                    <div className="subtitle">Fight urban heat islands by visualizing a greener future</div>
                    <div className="btn-container">
                        <a href='#View'><button className="hero-button" id="to-start">Get Started</button></a>
                        <a href='#About'><button className="hero-button" id="to-about">Learn More</button></a>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Splash