import React from 'react';
import { Button, Form } from "react-bootstrap";
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form>

          <Form.Group>
            <Form.Label>อายุคุณแม่ </Form.Label>
            <Form.Control type="number" placeholder="ปี" />
            <Form.Control type="number" placeholder="วัน" />
          </Form.Group>

          <Form.Group>
            <Form.Label>อายุครรภ์ (สัปดาห์)</Form.Label>
            <select className="form-control">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
            </select>
          </Form.Group>

          <Button variant="primary" type="submit">
            ยืนยัน
          </Button>

        </Form>
      </header>
    </div>
  );
}

export default App;
