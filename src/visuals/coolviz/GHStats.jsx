import React, { useEffect, useState } from 'react';

import { Form, Button, Row, Container, Col, Image } from 'react-bootstrap';
import * as d3 from "d3";
import { Paper } from '@mui/material'
import * as d3Chromatic from 'd3-scale-chromatic';

var user;


function GHStats(props) {


  const [uname, setUname] = useState("");
  const [uData, setUData] = useState(null);
  const [age, setAge] = useState(null);
  const [repos, setRepos] = useState(null);
  //const [langs, setLangs] = useState([])

  function handleSubmit(event) {
    event.preventDefault();
    setUname(user);
  }

  function handleText(e) {
    user = e.target.value;
  }


  useEffect(() => {


    getData('https://api.github.com/users/' + uname, "u")
    getData("https://api.github.com/users/" + uname + "/repos", "r")

  }, [uname])

  function scrapeLangs(obj) {

    if(uname === "") return;

    let dist = d3.rollups(obj, v => v.length, d => d.language);
    
    return dist;

  }

  async function getData(call, fn) {

    if(uname === "") return;


    let req = await fetch(call)
      .then(
        response => response.text()
      ).then(
        text => {
          
          if(fn === "u") { // u for user
            setUData(JSON.parse(text));
            handleInfo(JSON.parse(text));
          }
          if(fn === "r") { // r for repos
            setRepos(JSON.parse(text));
            console.log(JSON.parse(text))
            let langs = scrapeLangs(JSON.parse(text));
            genChart(langs.filter(d => d[0] !== null).sort((a,b) => b[1] - a[1]));
          }
        }
      )
    return req;

    }



    function dateDiffInDays(a, b) {
      const MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }


    function handleInfo(obj) {

        if(!obj) return;
        var resp = obj
        console.log(resp)
        let created = resp.created_at.split("T")
        let dd = created[0];

        let date = new Date(dd)
        let now = new Date();
        let diff = dateDiffInDays(date, now);


        setAge(Math.floor((diff/365)) + " Years " + (Math.floor(diff%365) + " Days Old"))

        return 0;
      }

      function genChart(data) {


        d3.select("#d3lang")
        .selectAll("*")
        .remove();

        var width = 1000;
        var height = 800
        var margin = {top: 20, left: 60, right: 20, bottom: 20}

        var colors = (d) => (d3Chromatic.schemeCategory10[d%10])
        

        const svg = d3.select("#d3lang")
        .append("svg")
        .attr("class", "svg-content-responsive svg-container")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + (width+(margin.left*2)) + " " + (height+margin.bottom+margin.top))
        .append("g")
        .attr("class", "main")
        .attr("transform",
          "translate(" + (margin.left*2+margin.right) + "," + margin.top + ")");

        svg.append("text")
        .style("font-weight", "lighter")
        .style("font-size", "3em")
        .attr("x", (width/3)-margin.right-margin.left)
        .attr("y", margin.top)
        .text("Top Languages")

        let x = d3.scaleLinear()
          .domain([0,(d3.max(data, d => d[1])*1.125)])
          .range([0,width-margin.left-margin.right])
      
        let names = data.map(d => d[0])

        let y = d3.scaleBand()
          .domain(data.map(d => d[0]))
          .range([(height-margin.top-margin.bottom), 0])

        svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .style("font-size", "2em")
          .style("font-weight", "bold");
    
        svg.append("g")
          .call(d3.axisLeft(y))
          .selectAll("text")
            .style("font-size", "2em")
            .style("font-weight", "lighter")

        svg.select("g").selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(0); })
        .attr("width", 0)
        .attr("y", d => y(d[0])-(height - margin.bottom - margin.top-(y.bandwidth()/4))) 
        .attr("height", y.bandwidth()/2)
        .attr("fill", (d,idx) => colors(idx))
        .attr("opacity", 0.75);


        svg.selectAll("rect")
        .transition()
        .duration(600)
        .attr("x", d => x(0))
        .attr("width", d => x(d[1]))
        .delay((d,i) => (i*200))

      }


  return (

    <div className='gh'>
      <Container>
      <h1 className='display-4 mt-5'>Github User Stats</h1>
      <hr className='mb-5 w-50'/>
      <Row>
      <Paper elevation={12} className="p-4 mx-3">
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Github Username</Form.Label>
        <Form.Control placeholder="..." onChange={handleText} name="uname" />
        <Form.Text className="text-muted">
          Enter Github Username
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      </Paper>
      {uData && 
      <Paper elevation={12} className="p-4 mx-3">
        <Row>
        <Col xs={4}>


          <Image 
            fluid
            className='d-block w-75 h-100'
            src={uData.avatar_url}
          />
        

        </Col>
        <Col xs={8}>
        {uData &&
        <>
          <p>Link: <a href={uData.html_url} rel="noreferrer" target="_blank">{uname}</a></p>
          <p>{uData.public_repos} Public Repositories</p>
        </>
        }
        {age &&
          <p>{age}</p>
        }
        </Col>
        </Row>
      </Paper>
      }
      </Row>
      <Row>
        <Col xs={8}>
        {uData &&
        <Paper elevation={12} className="p-4 mt-3">

          <div id="d3lang"></div>

        </Paper>
        }
        </Col>
      </Row>
      </Container>
    
    </div>

  );
}

export default GHStats;