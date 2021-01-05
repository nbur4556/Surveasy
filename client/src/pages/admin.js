import React, { useState, useEffect } from "react";
import Button from "../components/Button/button";
//import { Link } from "react-router-dom";
import API from "../utils/API";
import Input from "../components/Input/input";
import "./style.css";
import CreateSurvey from "../components/createSurvey/createSurvey";
import NavigationSurvey from "../components/NavBarSurvey/navbarSurvey";
import { Line } from "react-chartjs-2";
import SurveyList from "../components/SurveyList/surveyList"
import { Container, Grid, Row, Col } from "react-bootstrap";

function Admin() {
    const [survey, setSurvey] = useState({});
    const [curSurvey, setCurSurvey] = useState({});
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

    return (

        //navbar will be set up here 
        // ---- Have the log out button link here 
        //starting the side survey page 
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
                        <h1>{curSurvey.title}</h1>
                        <h3>{curSurvey.active == null ? '' : "Active : " + curSurvey.active.toString()}</h3>
                    </div>
                </Col>
            </Row>

        </div>

    );

}

export default Admin;
