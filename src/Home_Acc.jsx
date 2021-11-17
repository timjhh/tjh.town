		<Col xs={8}>

			{/*<Dvd/>*/}

			<h3>Projects</h3>
			{/*<!--Begin Accordion-->*/}
			<div className="accordion accordion-flush">

				<div className="accordion-item" id="project-accordion">
					<h1 className="accordion-header">
					<Button className="accordion-Button collapsed" type="Button" data-bs-toggle="collapse" data-bs-target="#p1-collapse" aria-expanded="false" aria-controls="flush-collapseOne">
						Last.FM / Spotify Music Graph
					</Button>
					</h1>
				</div>
				{/*<!--Music Graph Accordion Item-->*/}
				<div id="p1-collapse" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#project-accordion">
				  <div className="accordion-body">
						<h4><a href="MusicGraph/MusicGraph.html">Music Graph</a></h4>
			      	<zero-md src="http://73.126.15.185:8080/MusicGraph/README.md"></zero-md>
			      </div>
			    </div>
			    {/*<!--Philosophize This! Accordion Item-->*/}
				<div className="accordion-item" id="project-accordion">
					<h1 className="accordion-header">
					<Button className="accordion-Button collapsed" type="Button" data-bs-toggle="collapse" data-bs-target="#p2-collapse" aria-expanded="false" aria-controls="p2-collapse">
						Philosophize This! Transcript Analysis
					</Button>
					</h1>
				</div>
				<div id="p2-collapse" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#project-accordion">
				  <div className="accordion-body">
						<h4><a href="WebScraping/index.html">Web Scraping</a></h4>
			      	<zero-md src="http://73.126.15.185:8080/WebScraping/README.md"></zero-md>
			      </div>
			    </div>

			    {/*<!--DVD Logo Accordion Item-->*/}
				<div className="accordion-item" id="project-accordion">
					<h1 className="accordion-header">
					<Button className="accordion-Button collapsed" type="Button" data-bs-toggle="collapse" data-bs-target="#p3-collapse" aria-expanded="false" aria-controls="p3-collapse">
						Bouncing DVD Logo(very cool!)
					</Button>
					</h1>
				</div>
				<div id="p3-collapse" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#project-accordion">
				  <div className="accordion-body">
						<h4><a href="dvd.html">Bouncing DVD Logo(very cool!)</a></h4>
			      </div>
			    </div>
				
				<br/><br/>{/*<!--Natural spacing between projects and Other Resources-->*/}
				<h3>Misc.</h3>

{/*<!--COMMITS TO THIS WEBSITE-->*/}
				<div className="accordion-item" id="changelog-accordion">
					<h1 className="accordion-header">
					<Button className="accordion-Button collapsed" type="Button" data-bs-toggle="collapse" data-bs-target="#c1-collapse" aria-expanded="false" aria-controls="c1-collapse">
						Commits To This Website
					</Button>
					</h1>
				</div>
				<div id="c1-collapse" className="accordion-collapse collapse" aria-labelledby="c1-collapse" data-bs-parent="#changelog-accordion">
				  <div className="accordion-body">
						<p>Coming soon!</p>
			      </div>
			    </div>
{/*<!--LIBRARIES USED ON THIS WEBSITE-->*/}
			    <div className="accordion-item" id="changelog-accordion">
					<h1 className="accordion-header">
					<Button className="accordion-Button collapsed" type="Button" data-bs-toggle="collapse" data-bs-target="#c2-collapse" aria-expanded="false" aria-controls="c2-collapse">
						Libraries Used In This Website
					</Button>
					</h1>
				</div>
				<div id="c2-collapse" className="accordion-collapse collapse" aria-labelledby="c2-collapse" data-bs-parent="#changelog-accordion">
				  <div className="accordion-body">
						<p><a href="https://github.com/zerodevx/zero-md">Zero-MD</a> - A ridiculously simple zero-config markdown displayer</p>
						<p><a href="https://www.last.fm/api">Last.fm</a> - For updating my current music</p>
						<p><a href="https://jquery.com/">JQuery</a></p>
						<p><a href="https://getbootstrap.com/">Bootstrap</a></p>

						
						
			      </div>
			    </div>


			</div>
{/*<!--End Accordion-->*/}
		</Col>
