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
  const [label, setLabel] = useState("Click a Country To See Nutrient Data");

  //const [method, setMethod] = useState(props.methods[0]);

  async function getData() {
    //https://data.medicaid.gov/api/1/metastore/schemas/dataset/items/eec7fbe6-c4c4-5915-b3d0-be5828ef4e9d?show-reference-ids=false
      const response = await axios("https://data.medicaid.gov/api/1/datastore/query/dfa2ab14-06c2-457a-9e36-5cb6d80f8d93/0");
      console.log(response);

      let data = response.data.results;

      data.sort((a,b) => b.nadac_per_unit - a.nadac_per_unit);
      console.log(data);
      let filtered = data.filter((d,idx) => idx < 400)
  
      setCurrent(filtered);
      //return await response.data;

      }
  useEffect(() => {


    getData();
    //setCurrent(getData().results);



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



      <p>Note: Consider Including Country Codes in Filename. This will allow all countries to be found</p>
      <p>{label}</p>

      <Graph current={current} switch={bipartite} />



    </>


  );
}

export default GraphController;