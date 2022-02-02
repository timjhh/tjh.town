import React, { useEffect, useState } from 'react';
import Graph from './Graph.jsx';

import axios from 'axios';


import * as d3 from "d3";


function GraphController(props) {

  const [nutrient, setNutrient] = useState("Calories");

  const [nutrientTwo, setNutrientTwo] = useState("Zinc");

  const [bipartite, setBipartite] = useState(true);
  const [current, setCurrent] = useState([]);

  const [range, setRange] = useState([0,0]);
  const [label, setLabel] = useState("Click on a node for more information");

  //const [method, setMethod] = useState(props.methods[0]);

  async function getData() {
    //https://data.medicaid.gov/api/1/metastore/schemas/dataset/items/eec7fbe6-c4c4-5915-b3d0-be5828ef4e9d?show-reference-ids=false
      const response = await axios("https://data.medicaid.gov/api/1/datastore/query/dfa2ab14-06c2-457a-9e36-5cb6d80f8d93/0");

      let data = response.data.results;

      data.sort((a,b) => parseFloat(b.nadac_per_unit) - parseFloat(a.nadac_per_unit));
      
      // Get highest otc / non-otc nodes
      let otc = data.filter(d => d.otc === "Y").filter((d,idx) => idx < 50);
      let notc = data.filter(d => d.otc === "N").filter((d,idx) => idx < 50);

      // merge highest together
      let filtered = d3.merge([otc,notc]);

      // Simply get 100 highest nodes
      //let filtered = data.filter((d,idx) => idx < 100)

      filtered.forEach(d => d.nadac_per_unit = parseFloat(d.nadac_per_unit));

      setCurrent(filtered);


      }
  useEffect(() => {


    getData();


  }, [])

  useEffect(() => {

    console.log(current);

  }, [current]);

  return (

    <>

      {/* <NutriSelect
        methods={props.methods} 
        nutrients={props.nutrients}
        nutrient={nutrient}
        setNutrient={setNutrient}
        nutrientTwo={nutrientTwo}
        setNutrientTwo={setNutrientTwo}  
        method={method}
        setMethod={setMethod}
        {...props} /> */}



      <h4 className='display-4'>Top 100 Drugs Purchased by Pharmacy - NADAC (National Average Drug Acquisition Cost) 2022</h4>
      <p>{label}</p>

      <Graph current={current} setLabel={setLabel} switch={bipartite} />



    </>


  );
}

export default GraphController;