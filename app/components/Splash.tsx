import bg from '../assets/splash.png'

const Splash = () =>{
    return (
        <div className="splash" style={{backgroundImage: `url(${bg.src})`}}>
            <div className="text">
                <div className="title">TREEHACK</div>
                <div className="subtitle">TREEHACK</div>
            </div>
        </div>
    )
}
export default Splash