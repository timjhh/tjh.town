import React, { useEffect, useState } from 'react';
import * as d3 from "d3";



function Graph(props) {

const radius = 2;

const nutrients = ["Calories", "Protein", "Fat", "Carbohydrates", "Vitamin.C", "Vitamin.A", "Folate", "Calcium", "Iron", "Zinc", "Potassium", 
            "Dietary.Fiber", "Copper", "Sodium", "Phosphorus", "Thiamin", "Riboflavin", "Niacin", "B6", "Choline",
            "Magnesium", "Manganese", "Saturated.FA", "Monounsaturated.FA", "Polyunsaturated.FA", "Omega.3..USDA.only.", "B12..USDA.only."];


// Update margin once size ref is created
const margin = {top: 50, right: 20, bottom: 30, left: 30},
width = 700 - margin.right - margin.left,
height = 400 - (margin.top+margin.bottom);

const minRad = 5;
const maxRad = 50;



const [parsedData, setParsedData] = useState([]);
//const [nodes, setNodes] = useState([]);
//const [links, setLinks] = useState([]);


  useEffect(() => {
    console.log(props.current);
    if(props.current && props.current.length > 0) {
      genGraph(props.current);
    }

  }, [props.current])


    // Consider adding async back
    // haha wait
    async function genGraph(data) {


    d3.select("#graph").select("svg").remove();

    const nodes = data;

    //console.log(nodes);
    //console.log(links);

    const svg = d3.select("#graph")
    .append("svg")
    .attr("class", "svg-content-responsive svg-container")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .style("border", "1px solid black")
    //.style("position", "absolute")
    .attr("viewBox", "0 0 " + (width) + " " + (height))
    .on("click", (event, item) => {
        console.log(event.srcElement.tagName === "svg");

        if(event.srcElement.tagName === "svg") {
          node.attr("opacity", 1);
        }

    });

    const g = svg.append("g")
    .attr("class", "content");


    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .extent([[0, 0], [width, height]])
        .on("zoom", (d) => {
          g.attr("transform", d.transform)
        });
    
    svg.call(zoom);

  var forceX = d3.forceX().strength(1);

  var forceY = d3.forceY().strength(1);


    const simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("repel", d3.forceManyBody().strength(-50))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(4))
    .force("x", forceX)
    .force("y", forceY);


    var node = g.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g");

    var labels = node.append("text")
    .text((d) => d.ndc_description)

        .attr('x', 4)
        .style("cursor", "pointer")
        .style("font-weight", "bold")
        .style("font-size", "0.2em")
        .attr('y', 0);





    var circles = node.append("circle")
    .attr("r", radius)
    // .on("click", (e, d) => {
    // })
    .attr("fill", d => (d.otc === "N" ? "steelblue" : "red"))
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));


    simulation
    .nodes(nodes)
    .on("tick", ticked);




  function dragstarted(d) {
    if (!d.active) simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  function dragged(d) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

  function dragended(d) {
    if (!d.active) simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }




    function ticked() {


      node
      .attr("transform", function(d) {
        return "translate(" + (d.x = Math.max(radius, Math.min(width - radius, d.x))) + "," + (d.y = Math.max(radius, Math.min(height - radius, d.y))) + ")"; 
      });

  }






      // Re-compute y force on graph
      simulation.force("y").initialize(nodes);

      // Restart simulation
      simulation
      .alpha(0.3)
      .alphaTarget(0)
      .restart();
  }



  return (
    <>
    <button onClick={() => {console.log("poop")}}>poop</button>
    <div id={"graph"}>
      
    </div>
    </>
  );
}

export default Graph;
