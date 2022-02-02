import React, { useEffect, useState } from 'react';
import * as d3 from "d3";
import { Table } from 'react-bootstrap';



function Graph(props) {

const radius = 2;

const nutrients = ["Calories", "Protein", "Fat", "Carbohydrates", "Vitamin.C", "Vitamin.A", "Folate", "Calcium", "Iron", "Zinc", "Potassium", 
            "Dietary.Fiber", "Copper", "Sodium", "Phosphorus", "Thiamin", "Riboflavin", "Niacin", "B6", "Choline",
            "Magnesium", "Manganese", "Saturated.FA", "Monounsaturated.FA", "Polyunsaturated.FA", "Omega.3..USDA.only.", "B12..USDA.only."];


// Update margin once size ref is created
const margin = {top: 50, right: 20, bottom: 30, left: 30},
width = 700 - margin.right - margin.left,
height = 400 - (margin.top+margin.bottom);

const MIN_RADIUS = 1;
const MAX_RADIUS = 30;



const [parsedData, setParsedData] = useState([]);
//const [nodes, setNodes] = useState([]);
//const [links, setLinks] = useState([]);


useEffect(() => {

    if(props.current && props.current.length > 0) {
      genGraph(props.current);
    }



}, [props.current]);


useEffect(() => {


    let otcmax = d3.max(props.current, d => d.otc === "Y" && parseFloat(d.nadac_per_unit));
    let notcmax = d3.max(props.current, d => d.otc === "N" && parseFloat(d.nadac_per_unit));


    //let svg = d3.select("#graph").select("svg").select("g");
    let svg = d3.selectAll(".nodes").selectAll("circle")
    .attr("r", function(d) {
      if(props.sameScale) {
        let max = d3.max(props.current, d => parseFloat(d.nadac_per_unit));
        return ((d.nadac_per_unit / max) * MAX_RADIUS) + MIN_RADIUS;
      } else return 3;
    });


//.attr("r", d =>  ((d.nadac_per_unit / max) * MAX_RADIUS) + MIN_RADIUS)
}, [props.sameScale]);


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

  // var forceX = d3.forceX().strength(0.5);
  var forceX = d3.forceX((d,idx) => {

    let otcmax = d3.max(props.current, d => d.otc === "Y" && parseFloat(d.nadac_per_unit));
    let notcmax = d3.max(props.current, d => d.otc === "N" && parseFloat(d.nadac_per_unit));
    
    return d.otc === "N" ? width-((parseFloat(d.nadac_per_unit)/notcmax)*width/2) : 
      (parseFloat(d.nadac_per_unit)/otcmax)*width/2;

  }).strength(0.6);

  var forceY = d3.forceY().strength(0.5);


    const simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("repel", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(4))
    .force("x", forceX)
    .force("y", forceY);


    var node = g.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g");


        // setExtent(d3.extent(filtered, d => d.nadac_per_unit));
        // setMax();
    let max = d3.max(props.current, d => parseFloat(d.nadac_per_unit));


    var circles = node.append("circle")
    .attr("r", d =>  ((d.nadac_per_unit / max) * MAX_RADIUS) + MIN_RADIUS)
    .attr("fill", d => (d.otc === "N" ? "rgba(70,130,180,0.8)" : "red")) // rgba is steelblue at 80% opacity
    .on("click", (d,e) => {
      console.log(e)
      props.setLabel((e.ndc_description) + " | $" + e.nadac_per_unit);
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));


    simulation
    .nodes(nodes)
    .on("tick", ticked);



    var labels = node.append("text")
    .text((d) => d.ndc_description)
        .attr('x', 2)
        .style("cursor", "pointer")
        .style("font-weight", "bold")
        .style("font-size", "0.2em")
        .attr('y', 0);

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
    <div id={"graph"}>
      
    </div>
    <Table className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Price Per Unit</th>
          <th>Unit</th>
          <th>OTC?</th>
        </tr>
      </thead>
      <tbody>

      {props.current.map((d,idx) => (

        <tr>
          <td>{idx}</td>
          <td>{d.ndc_description}</td>
          <td>{d.nadac_per_unit}</td>
          <td>{d.pricing_unit}</td>
          <td>{d.otc}</td>
        </tr>

        ))}
      </tbody>
    </Table>
    </>

  );
}

export default Graph;
