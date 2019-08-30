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

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  beginHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios
      .post('https://6e1fb152.ngrok.io/timer/counttoten', this.state)
      .then(response => {
        console.log(response)
        this.state.count = 0;
      })
      .catch(error => {
        console.log(error)
      })
  }

  incHandler = e => {
    e.preventDefault()
    console.log(this.state)
    const { line_id } = this.state;
    axios
      .post('https://6e1fb152.ngrok.io/ctt/increasing/' + line_id, this.state)
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

  decHandler = e => {
    e.preventDefault()
    console.log(this.state)
    const { line_id } = this.state;
    axios
      .post('https://6e1fb152.ngrok.io/ctt/decreasing/' + line_id, this.state)
      .then(response => {
        console.log(response)
        this.setState({ data: response.data })
        this.setState({ count: this.state.count - 1 })
      })
      .catch(error => {
        console.log(error)
      })
  }

  toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

  render() {
    const { line_id } = this.state;
    const num_dis = this.state.data.length;
    const i = 0;

    var shown = {
			display: this.state.shown ? "block" : "none"
		};
		
		var hidden = {
			display: this.state.shown ? "none" : "block"
		}

    return (
      <div className="App">
        <header className="App-header">

          <div style = { hidden } className="form Count-ctt">

            <div>

              <div className="Show-data">
                {this.state.line_id}
              </div>

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

            <Form>

              <Form.Group>
                <Form.Label className="">12:00:00</Form.Label>
              </Form.Group>

              <Button variant="danger" type="submit" className="dec-margin" onClick={this.decHandler}>
                ลด
              </Button>

              {/* ยังไม่ได้เขียนให้แสดงผลค่านับทีละอัน มันเลยดึงออกมาทีเดียวทั้งหมด */}
              {/* {this.state.data.map ((data) => <a key={data._id} > {data.ctt_amount} </a> )} */}
              {this.state.count}

              <Button variant="danger" type="submit" className="inc-margin" onClick={this.incHandler}>
                เพิ่ม
              </Button>

            </Form>

          </div>

          <div style = { shown } className="form Count-ctt">
            <Form.Group>
              <Form.Label className="">ยินดีด้วยค่ะ</Form.Label>
              <br></br>
              <Form.Label className="">วันนี้คุณแม่นับครบ 10 ครั้งแล้วค่ะ</Form.Label>
              <br></br>
              <Form.Label className="">(นับไม่ครบก็หน้านี้ ยังไม่ได้ทำหน้าใหม่)</Form.Label>
            </Form.Group>
          </div>

        </header>
      </div>
    );
  }
}
