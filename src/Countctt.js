import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import './App.css';
import axios from 'axios';

const liff = window.liff;

export default class Countctt extends Component {

  initialize() {
    liff.init(async () => {
      let profile = await liff.getProfile();
      this.setState({
        line_id : profile.userId
      });
    }); 
  }

  constructor(props) {
    super(props);
    this.state = {
      line_id : '',
      mom_age: '',
      ges_age_week:''
    };
    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "ลงทะเบียนเรียบร้อย"
    }]).then(() => {
      liff.closeWindow();
    });
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios 
    .post('https://d736c601.ngrok.io/register', this.state)
    .then(response => {
        console.log(response)

          liff.sendMessages([{
            type: 'text',
            text: "ลงทะเบียนเรียบร้อย"
          }]).then(() => {
            liff.closeWindow();
          });

    })
    .catch(error => {
        console.log(error)
    })
  }

  render() {
    const {line_id, mom_age,ges_age_week} = this.state;
    return (
      <div className="App">
        <header className="App-header">

          {/* <div className="Show-data">
            {this.state.line_id}
          </div> */}

          <div className="Regis-form">
            <Form onSubmit={this.submitHandler}>

              <Button variant="danger" type="submit" className="butt-margin">
                เพิ่ม
              </Button>

              <Button variant="danger" type="submit">
                ลด
              </Button>

            </Form>

          </div>
        </header>
      </div>
    );
  }
}
