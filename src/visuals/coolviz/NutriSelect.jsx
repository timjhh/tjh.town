import React, { useEffect, useState } from 'react';


function NutriSelect(props) {




useEffect(() => {




}, [])








  function handleChange(e) {

    console.log(e.target)
    props.setSelected(e.target.value);

  }



  return (




{/* <Paper sx={{ m: 2, p: 2, background: 'primary.main', elevation: 24 }}>

<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>



    <FormControl sx={{ m:2 }}>
      <InputLabel id="country-select-label">Nutrient</InputLabel>
      <Select
        labelId="mcountry-select-label"
        id="country-select"
        value={props.nutrient}
        label="Nutrient"
        onChange={(e) => { props.setNutrient(e.target.value) }}
      >
      {props.nutrients.map(d => (
        <MenuItem key={d} value={d}>{d}</MenuItem>
        ))}
      </Select>


    </FormControl>
    <FormControl sx={{ m:2 }}>
      <InputLabel id="country-select-label">Second Nutrient</InputLabel>
      <Select
        labelId="mcountry-select-label"
        id="country-select"
        value={props.nutrientTwo}
        label="Second Nutrient"
        onChange={(e) => { props.setNutrientTwo(e.target.value) }}
      >
      {props.nutrients.map(d => (
        <MenuItem key={d} value={d}>{d}</MenuItem>
        ))}
      </Select>


    </FormControl>
    <FormControl sx={{ m:2 }}>

      <InputLabel id="method-select-label">Method</InputLabel>
      <Select
        labelId="method-select-label"
        id="method-select"
        value={props.method}
        label="Method"
        onChange={(e) => { props.setMethod(e.target.value) }}
      >
      {props.methods.map(d => (
        <MenuItem key={d} value={d}>{d}</MenuItem>
        ))}
      </Select>

    </FormControl>


</Box>
</Paper> */}

  );
}

export default NutriSelect;
