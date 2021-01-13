import React, { useState, useEffect } from "react";
import Button from "../components/Button/button";
//import { Link } from "react-router-dom";
import API from "../utils/API";
import "./style.css";
import CreateSurvey from "../components/createSurvey/createSurvey";
import NavigationSurvey from "../components/NavBarSurvey/navbarSurvey";
import { Line } from "react-chartjs-2";
import SurveyList from "../components/SurveyList/surveyList"
import { Container, Grid, Row, Col } from "react-bootstrap";
import Input from "../components/Input/input";
import Radio from "../components/RadioButton/radio";
import Answer from "../components/Answer/answer";

function Admin() {
    const [survey, setSurvey] = useState({});
    const [curSurvey, setCurSurvey] = useState({});
    const [formCred, setFormCred] = useState({});
    

    let token;
    let selectedSurvey; 
    useEffect(() => {
        uploadSurveys()
        console.log(token);
        console.log(survey);
    }, [])

    function uploadSurveys() {
        token = localStorage.getItem(`token`);

        API.getUserSurveys(token)
          .then((res) => {
            setSurvey(res.data);
            accessSurvey(localStorage.getItem(`currentSurvey`))
            console.log(res.data);
          })
          .catch((err) => console.log(err));
    };

    function accessSurvey(id) {
        selectedSurvey = id; 
        console.log(selectedSurvey);
        localStorage.setItem('currentSurvey', id);
        var r = getIndex(id);
        setCurSurvey(survey[r]);
    }

    function getIndex(id) {
        return survey.findIndex(obj => obj._id === id);
      }
      function handleInputChange(event) {
        const { name, value } = event.target;
        setFormCred({ ...formCred, [name]: value });
        formatAdmin();
      }

      function handleFormSubmit(event) {
        event.preventDefault();
        const formattedData = formatAdmin();
          API.updateSurvey({
            username: formCred.username,
            password: formCred.password,
          })
            .then((result) => {
              console.log(result);

            })
            .catch((err) => console.log(err));
      }

      function formatAdmin(){
          console.log(formCred)
        //   const adminData = {
        //     surveyId: surveyId,
        //     title: surveyData.title,
        //     active: surveyData.active,
        //     public: surveyData.public
        //   }
      }

      function handleRadioSelect (event) {
          console.log( event.target.checked)
          console.log(event.target.id)
          
      }

    return (

        <div>
            <NavigationSurvey />

            <Row float="center">
            <Col sx={3} md={3}>
                    <div className="back-div">
                        {Object.keys(survey).map(key => (
                            <SurveyList name={survey[key].title} onClick={() => accessSurvey(survey[key]._id)} >
                            </SurveyList>
                        ))}
                    </div>
                </Col>
            <Col sx={8} md={9}>
                    <div className="back-div" id="displaySurvey">
                        
                        <h3>Edit Title:</h3>
                        <Input onChange={handleInputChange} name={curSurvey.title}></Input>
                        <h3>Edit Active:</h3>
                        <Radio onChange={handleRadioSelect} id = "active" name={curSurvey.active == null ? '' : "Active"}  checked={curSurvey.active == null ? '' : curSurvey.active.toString() == "true"}></Radio>
                        <Radio onChange={handleRadioSelect} id = "deactive" name={curSurvey.active == null ? '' : "Deactive"}  checked={curSurvey.active == null ? '' : curSurvey.active.toString() == "false"}></Radio>
                        <Col sx={3} md={12}>
                        <Button name="Submit" onClick={handleFormSubmit}></Button>
                        </Col>
                    </div>
                </Col>
            </Row>

        </div>

    );

}

export default Admin;