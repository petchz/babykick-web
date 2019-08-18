import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import './App.css';

const liff = window.liff;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName : '',
      userId : '',
      pictureUrl : '',
      statusMessage : ''
    };
    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  initialize() {
    liff.init(async (data) => {
      let profile = await liff.getProfile();
      this.setState({
        displayName : profile.displayName,
        userId : profile.userId,
        pictureUrl : profile.pictureUrl,
        statusMessage : profile.statusMessage
      });
    }); 
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

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <div className="">
            {this.state.displayName}
            <br></br>
            {this.state.userID}
          </div>

          <div className="regis-form">
            <Form>

              <Form.Group>
                <Form.Label>อายุคุณแม่ (ปี)</Form.Label>
                <Form.Control type="number" placeholder="คุณแม่อายุกี่ปีคะ?" min="10" max="50" />
              </Form.Group>

              <Form.Group>
                <Form.Label>อายุครรภ์ (สัปดาห์)</Form.Label>
                <Form.Control type="number" placeholder="อายุครรภ์กี่สัปดาห์คะ?" min="1" max="50" />
              </Form.Group>

              <Button variant="danger" type="submit" onClick={this.closeApp}>
                ยืนยัน
            </Button>

            </Form>

          </div>
        </header>
      </div>
    );
  }
}

export default App;
