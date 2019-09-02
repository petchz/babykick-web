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
        line_id: profile.userId
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      line_id: '',
      data: [],
      count: 0
    };
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  // handle change in form (UID)
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Function to begin to count
  beginHandler = e => {
    e.preventDefault()
    console.log(this.state)
    
    axios
      .post('https://localhost:3001/timer/counttoten', this.state)
      .then(response => {
        console.log(response)

      document.getElementById('newCount').style.display = "none";
      document.getElementById('countPage').style.display = "block";

        this.state.count = 0;
      })
      .catch(error => {
        console.log(error)
      })
  }

  // Function to increase counting number value
  incHandler = e => {
    e.preventDefault()
    console.log(this.state)
    const { line_id } = this.state;
    axios
      .post('https://localhost:3001/ctt/increasing/' + line_id, this.state)
      .then(response => {
        console.log(response)
        this.setState({ data: response.data })
        this.setState({ count: this.state.count + 1 })

        if (this.state.count === 10) {
          console.log('count complete!')
          this.toggle()
        }

        if (this.state.data.timer_status === 'time out') {
          console.log('timeout! cannot count now')
          this.toggle()
        }

      })
      .catch(error => {
        console.log(error)
      })
  }

  // Function to decrease counting number value
  decHandler = e => {
    e.preventDefault()
    console.log(this.state)
    const { line_id } = this.state;
    axios
      .post('https://localhost:3001/ctt/decreasing/' + line_id, this.state)
      .then(response => {
        console.log(response)
        this.setState({ data: response.data })
        this.setState({ count: this.state.count - 1 })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { line_id } = this.state;

    return (
      <div className="App">
        <header className="App-header">

          <div className="form Count-ctt">

            {/* User already count in this day. */}
            <div id="alreadyCount">

            </div>

            {/* User enter count page (First time of day) */}
            <div id="newCount">

              {this.state.line_id}

              <Form.Group>
                <Form.Control
                  name="line_id"
                  type="text"
                  placeholder="Line ID"
                  value={line_id}
                  onChange={this.changeHandler} />
              </Form.Group>

              <Button variant="danger" type="submit" onClick={this.beginHandler}>
                เริ่มนับ
              </Button>

            </div>

            {/* User comeback to count again. */}
            <div id="continueCount">
        
            </div>


            {/* ---------------------------------------------------------------------------------------------------------------------------- */}
            {/* Countpage (obviously...) */}
            <div id="countPage" style={{ display: 'none'}}>
              <Form>

                <Form.Group>
                  <Form.Label className="">12:00:00</Form.Label>
                </Form.Group>

                <Button variant="danger" type="submit" className="dec-margin" onClick={this.decHandler}>
                  ลด
                </Button>

                {/* {this.state.data.map ((data) => <a key={data._id} > {data.ctt_amount} </a> )} */}
                {this.state.count}

                <Button variant="danger" type="submit" className="inc-margin" onClick={this.incHandler}>
                  เพิ่ม
                </Button>

              </Form>
            </div>

            {/* finished count (good) */}
            <div style={{ display: 'none'}}>

            </div>

            {/* finished count (bad) */}
            <div style={{ display: 'none'}}>
              
            </div>

          </div>
        </header>
      </div>
    );
  }
}
