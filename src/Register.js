import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import './App.css';
import axios from 'axios';

const liff = window.liff;

export default class Register extends Component {

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

          <div className="form">
            <Form onSubmit={this.submitHandler}>
              
              <Form.Group>
                <Form.Control
                  className="hide"
                  name="line_id"
                  type="text"
                  placeholder="Line ID"
                  value={line_id}
                  onChange={this.changeHandler} />
              </Form.Group>

              <Form.Group>
                <Form.Label>อายุคุณแม่ (ปี)</Form.Label>
                <Form.Control
                  name="mom_age"
                  type="number"
                  placeholder="คุณแม่อายุกี่ปีคะ?"
                  min="10"
                  max="50"
                  value={mom_age}
                  onChange={this.changeHandler} />
              </Form.Group>

              <Form.Group>
                <Form.Label>อายุครรภ์ (สัปดาห์)</Form.Label>
                <Form.Control
                  name="ges_age_week"
                  type="number"
                  placeholder="อายุครรภ์กี่สัปดาห์คะ?"
                  min="1"
                  max="50"
                  value={ges_age_week}
                  onChange={this.changeHandler} />
              </Form.Group>

              <Button variant="danger" type="submit">
                ยืนยัน
              </Button>

            </Form>

          </div>
        </header>
      </div>
    );
  }
}