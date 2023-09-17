const About = () =>{
    return (
        <section id="About" className="section-container">
            <h1 className="section-title">Our Mission</h1>
                <div className="card">
                    <img src="./logo.jpg" alt="logo of a tree" className="card-img"/>
                    <div className="card-body">
                        <h1 className="card-title">What is Treehack?</h1>
                        <p className="card-text"> 
                        Global temperatures are rising - just this July was the hottest month ever on record. 
                        Cities are especially vulnerable to rising temperatures due to a phenomenon called the Urban Heat Island Effect. 
                        The solution? Planting trees (scroll down to read more!). 
                        But the bottleneck is knowing <em>specifically where</em> to plant trees. 
                        And that is what Treehack solves. 
                        <b> We present a solution to this problem by visualizing potential tree canopy coverage in urban areas.</b>
                        </p>  
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">How Does Treehack Work?</h1>
                        <p className="card-text"> 
                        After the user selects a location on the map, our platform performs three things:<br/>
                        <br/>1. Identify and outline urban heat islands in the neighborhood
                        <br/>2. Locate specific streets where temperature is high, trees are underutilized, and sidewalks are wide enough to plant trees
                        <br/>3. Propose a solution with visualization of what each street would look like with tree canopy, recommendations of native tree species that can be planted, and an estimates of the benefits of this course of action
                        </p>  
                    </div>
                    <img src="./urban-canopy.jpeg" alt="Urban Heat Island diagram" className="card-img"/>
                </div>

                <div className="card">
                <img src="./thermal-heat-island.png" alt="Urban Heat Island diagram" className="card-img"/>
                    <div className="card-body">
                        <h1 className="card-title">What is the Urban Heat Island Effect?</h1>
                        <p className="card-text"> 
                        * The urban heat island effect refers to the phenomenon where metropolitan areas exhibit higher temperatures than surrounding rural regions. 
                        This phenomenon is due to the absorption and radiation of solar energy by infrastructure, such as buildings, roads, and pavements. 
                        These materials have increased retention of heat by urban materials, particularly during the daytime, resulting in elevated nocturnal temperatures and prolonged heat exposure for residents. 
                        Urban heat islands manifest as distinct microclimates marked by elevated temperatures, altered heat flux patterns, and heightened energy demands, making them a subject of considerable concern in urban planning and climate mitigation strategies.
                        </p>  
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Why Trees?</h1>
                        <p className="card-text"> 
                            Peak air temperatures in tree groves are around 9˚F cooler than over open terrain. Cooling 
                            induced by urban trees is 2-4x more potent than that of treeless urban green spaces.
                            Trees that shade windows can save between 7% to 47% of the building’s energy use.
                            20% tree canopy around a house would result in annual cooling savings of 8 to 18%.
                        </p>  
                    </div>
                    <img src="./urban-trees.jpeg" alt="Tree in front of building" className="card-img"/>
                </div>

                <div className="card">
                    <img src="./sample-map.png" alt="heat map image" className="card-img"/>
                    <div className="card-body">
                        <h1 className="card-title">What Do the Stats Indicate?</h1>
                        <p className="card-text"> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                            essentially unchanged.
                        </p>  
                    </div>
                </div>
        </section>
    )
}

export default About