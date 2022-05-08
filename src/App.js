import './App.css';
import React, { useState } from "react"
import Display from './Display';

function App() {

  // data-set for Post call
  const [sympArr, setSympArr] = useState([]);
  const [person, setPerson] = useState({
    name: "",
    temperature: "",
    symptoms: "",
    contact: "",
  })

  // data-set for Display
  const [sympArrDisplay, setSympArrDisplay] = useState([]);
  const [personDisplay, setPersonDisplay] = useState({
    name: "",
    temperature: "",
    symptoms: "",
    contact: "",
  })

  // toggle conditional rendering to show Display
  const [toggle, setToggle] = useState(false);

  // indicate fetch error
  const [err, setErr] = useState(false);

  // behavior for submit action
  const handleSubmit = (event) => {
    // windows prompt to inform user of form submission in process
    event.preventDefault();
    alert(`Thank you, submitting your health declaration...`);

    // // logging
    // console.log(person);
    // console.log(personDisplay);

    // Post call
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person),
    };
    fetch('http://localhost:8080/api/saveFormData/', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        console.log(data);
        setToggle(true);
        setErr(false);
      })
      .catch(error => {
        console.error("Error in fetch call");
        setToggle(false);
        setErr(true);
      });
  }

  // behavior for text field input controls
  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    })
    setPersonDisplay({
      ...personDisplay,
      [e.target.name]: e.target.value,
    })
  }

  // behavior for checkbox input controls
  const handleCheckboxes = (e) => {
    // data arrays to process symptoms for both Post call and Display
    let newArr = sympArr; //name
    let newArrDisplay = sympArrDisplay; //id
    if (!newArr.includes(e.target.name)) {
      newArr.push(e.target.name);
      newArrDisplay.push(e.target.id);
    }
    else {
      newArr = newArr.filter(s => s !== e.target.name);
      newArrDisplay = newArrDisplay.filter(s => s !== e.target.id);
    }
    setSympArr(newArr);
    setSympArrDisplay(newArrDisplay);
    // string manipulation to concat symptoms for Post call
    // outcome: s1,s2,s3
    let sympString = "";
    if (newArr.length > 0) {
      sympString = newArr.reduce((result, item) => {
        return `${result}${item},`
      }, "");
    }
    sympString = sympString.replace(/(^,)|(,$)/g, "");
    setPerson({
      ...person,
      symptoms: sympString,
    })
    // string manipulation to concat symptoms for Display
    // outcome: Cough, Smell/Taste Impairment, Fever
    let sympStringDisplay = "";
    if (newArrDisplay.length > 0) {
      sympStringDisplay = newArrDisplay.reduce((result, item) => {
        return `${result}${item}, `
      }, "");
    }
    sympStringDisplay = sympStringDisplay.replace(/(^, )|(, $)/g, "");
    setPersonDisplay({
      ...personDisplay,
      symptoms: sympStringDisplay,
    })
  }

  // behavior for radio button input controls
  const handleRadioButtons = (e) => {
    let selection = 'No';
    if (e.target.id === 'yesradio') {
      selection = 'Yes';
    }
    setPerson({
      ...person,
      contact: selection,
    })
    setPersonDisplay({
      ...personDisplay,
      contact: selection,
    })
  }

  // behavior for back button on Display
  const handleBack = (e) => {
    setToggle(false);
  }

  // toggle between App and Display
  if (toggle) {
    return (
      <Display personDisplay={personDisplay} toggle={toggle} handleBack={handleBack} />
    );
  }
  else {
    return (
      <div className='container'>
        {err ? <div className="alert alert-danger" role="alert" style={{ width: '500px' }}><span style={{ color: '#b22222' }}><h2><b>Sorry</b></h2>There is some processing issue but the team has been notified.<br />Please try again later.</span></div> : ""}
        <h1>Covid-19 Health Declaration</h1>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="form-group" style={{ width: '300px' }}>
            <p>
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required onChange={handleChange} />
            </p>
          </div>
          <div className="form-group" style={{ width: '300px' }}>
            <p>
              <label htmlFor="temperature">Temperature (°C)</label>
              <input type="text" className="form-control" id="temperature" name="temperature" placeholder="Enter your temperature e.g. 36.7" required onChange={handleChange} />
            </p>
          </div>
          <div className="customblock">
            <label htmlFor="symptoms">Do you have any of the following symptoms now or within the last 14 days, even if your symptoms are mild?</label>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Cough" name="s1" onChange={handleCheckboxes} />
              <label htmlFor="s1" style={{ marginLeft: '5px' }}>Cough</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Smell/Taste Impairment" name="s2" onChange={handleCheckboxes} />
              <label htmlFor="s2" style={{ marginLeft: '5px' }}>Smell/Taste Impairment</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Fever" name="s3" onChange={handleCheckboxes} />
              <label htmlFor="s3" style={{ marginLeft: '5px' }}>Fever</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Breathing Difficulties" name="s4" onChange={handleCheckboxes} />
              <label htmlFor="s4" style={{ marginLeft: '5px' }}>Breathing Difficulties</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Body Aches" name="s5" onChange={handleCheckboxes} />
              <label htmlFor="s5" style={{ marginLeft: '5px' }}>Body Aches</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Headaches" name="s6" onChange={handleCheckboxes} />
              <label htmlFor="s6" style={{ marginLeft: '5px' }}>Headaches</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Fatigue" name="s7" onChange={handleCheckboxes} />
              <label htmlFor="s7" style={{ marginLeft: '5px' }}>Fatigue</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Sore Throat" name="s8" onChange={handleCheckboxes} />
              <label htmlFor="s8" style={{ marginLeft: '5px' }}>Sore Throat</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Diarrhoea" name="s9" onChange={handleCheckboxes} />
              <label htmlFor="s9" style={{ marginLeft: '5px' }}>Diarrhoea</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Runny Nose" name="s10" onChange={handleCheckboxes} />
              <label htmlFor="s10" style={{ marginLeft: '5px' }}>Runny Nose</label>
            </div>
          </div>
          <div className="form-group">
            <div className="customblock">
              Have you been in contact with anyone who is suspected to have or/has been diagnosed with Covid-19 within the last 14 days?
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="yesradio" name="customRadio" className="custom-control-input" required onChange={handleRadioButtons} />
                <label className="custom-control-label" htmlFor="yesradio" style={{ marginLeft: '5px' }}>Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="noradio" name="customRadio" className="custom-control-input" required onChange={handleRadioButtons} />
                <label className="custom-control-label" htmlFor="noradio" style={{ marginLeft: '5px' }}>No</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    );
  }
}

export default App;
