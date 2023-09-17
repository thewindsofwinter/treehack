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
                        The urban heat island effect refers to the phenomenon where metropolitan areas exhibit higher temperatures than surrounding rural regions. 
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
                        <h1 className="card-title">How Did We Build This?</h1>
                        <p className="card-text"> 
                            <b>Part I - Map:</b>
                            <br />For surface temperature: We used the Mateo Blus surface temperature API to render a heat map onto our base map.
                            <br />For canopy coverage: there are not any granular urban canopy dataset, so we bootstrapped with the Google Maps Satellite API. 
                            We scanned a 5-mile radius from a point of interest. To calculate canopy density, we built a lightweight computer vision algorithm from scratch to detect trees in aerial images.
                            <br />For air pollution: we used the Google Maps Air Quality API.
                            <br />tldr: Part I isolates specific small regions in a large radius that have potential to be improved via tree planting.
                            
                            <br /><br /><b>Part II - Identifying specific streets suitable for planting trees</b>
                            <br />First, we get a street view via the Google StreetView API. To assess whether a street (1) already has a canopy presence, or (2) if not, does it have space for trees to grow: 
                            we used the OpenAI CLIP API.

                            <br /><br /><b>Part III: Recommendations/details for planting trees on a street</b>
                            <br /> We integrated the OpenAI Dall-E API to generate a visualization of what the street could be like if it had canopy
                            <br /> We also used the GPT-3 API by OpenAI to find suitable trees to be planted in this region (soil, climate, maintenance, and we want to promote native species)
                            </p>  
                    </div>
                </div>
        </section>
    )
}

export default About