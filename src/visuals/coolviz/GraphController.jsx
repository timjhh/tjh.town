import React, { useEffect, useState } from 'react';
import Graph from './Graph.jsx';

import axios from 'axios';

import { Form } from 'react-bootstrap';
import * as d3 from "d3";


function GraphController(props) {

  // How many nodes will we display from each group
  const [numNodes, setNumNodes] = useState(50);

  // How to apply sizing scale
  const [sameScale, setSameScale] = useState(true);

  const [nutrient, setNutrient] = useState("Calories");

  const [nutrientTwo, setNutrientTwo] = useState("Zinc");

  const [bipartite, setBipartite] = useState(true);
  const [current, setCurrent] = useState([]);
  const [data, setData] = useState([]); // Raw data


  const [range, setRange] = useState([0,0]);
  const [label, setLabel] = useState("Click on a node for more information");

  //const [method, setMethod] = useState(props.methods[0]);

  async function getData() {
    //https://data.medicaid.gov/api/1/metastore/schemas/dataset/items/eec7fbe6-c4c4-5915-b3d0-be5828ef4e9d?show-reference-ids=false
      const response = await axios("https://data.medicaid.gov/api/1/datastore/query/dfa2ab14-06c2-457a-9e36-5cb6d80f8d93/0");

      let data = response.data.results;

      data.sort((a,b) => parseFloat(b.nadac_per_unit) - parseFloat(a.nadac_per_unit));
      setData(data);

      // Get highest otc / non-otc nodes
      let otc = data.filter(d => d.otc === "Y").filter((d,idx) => idx < numNodes/2);
      let notc = data.filter(d => d.otc === "N").filter((d,idx) => idx < numNodes/2);

      console.log(otc);

      // merge highest together
      let filtered = d3.merge([otc,notc]);

      console.log(d3.max(filtered, d => d.otc === "Y" && parseFloat(d.nadac_per_unit)))
      // Simply get 100 highest nodes
      //let filtered = data.filter((d,idx) => idx < 100)

      filtered.forEach(d => d.nadac_per_unit = parseFloat(d.nadac_per_unit));

      setCurrent(filtered);


      }
  useEffect(() => {


    getData();


  }, [])
  useEffect(() => {


      let bins = numNodes/2;

      // Get highest otc / non-otc nodes
      let otc = data.filter(d => d.otc === "Y").filter((d,idx) => idx < bins);
      let notc = data.filter(d => d.otc === "N").filter((d,idx) => idx < bins);

      // merge highest together
      let filtered = d3.merge([otc,notc]);

      // Simply get 100 highest nodes
      //let filtered = data.filter((d,idx) => idx < 100)

      filtered.forEach(d => d.nadac_per_unit = parseFloat(d.nadac_per_unit));

      setCurrent(filtered);

  }, [numNodes])

  return (

    <div className="mx-5">

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



      <h4 className='display-4' style={{"font-size": "3em"}}>Top Drugs Purchased by National Pharmacies - NADAC (National Average Drug Acquisition Cost) 2022</h4>
      
      <hr/>

      <p>{label}</p>

      <Form>
        <Form.Check 
          value={sameScale}
          onChange={(d) => setSameScale(!sameScale)}
          type="switch"
          id="custom-switch"
          label="Scale Nodes By Group?"
        />
      </Form>
      <Form.Select defaultValue={100} value={numNodes} onChange={(d,e) => {setNumNodes(d.target.value)}} className="mb-4" aria-label="Node Count">
        {[50,100,150,200].map(d => (
            <option key={d} value={d}>Display top {d} nodes</option>
          ))}

      </Form.Select>

      <Graph sameScale={sameScale} current={current} setLabel={setLabel} switch={bipartite} />



    </div>


  );
}

export default GraphController;