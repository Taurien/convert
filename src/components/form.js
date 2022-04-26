import React, {useState ,useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap';

import {decimalToRoman, romanToDecimal, reset} from '../redux/slices/convertSlice';

function FormConverter() {
  const [optionA, setOptionA] = useState('romanos');
  const [optionB, setOptionB] = useState('decimal');
  const [payload, setPayload] = useState('');
  const [err, setErr] = useState(false);
  const result = useSelector(state => state.convert.value);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const changeOption = (e) => {
    dispatch(reset())
    inputRef.current.value = ''
    setPayload('')
    setErr(false)

    const option = e.target.value;
    const targetId = e.target.id;
    
    if(targetId === 'a' && option === 'decimal' && optionB === 'decimal'){
      setOptionA('decimal');
      setOptionB('romanos');
    }else if(targetId === 'a' && option === 'romanos' && optionB === 'romanos'){
      setOptionA('romanos');
      setOptionB('decimal');
    }else if(targetId === 'b' && option === 'decimal' && optionA === 'decimal'){
      setOptionA('romanos');
      setOptionB('decimal');
    }else{
      setOptionA('decimal');
      setOptionB('romanos');
    }
  };

  const convert = (e) => {
    e.preventDefault();
    setErr(false)

    const input = payload.toUpperCase()

    const intReg = /^(?:[1-9]\d*|\d)$/
    const strReg = /([MDCLXVI])/g

    if (optionA === 'decimal' && input.match(intReg)){
      dispatch(decimalToRoman(parseInt(input)));
    } else if(optionA === 'romanos' && input.match(strReg)){
      console.log('hi2')
      dispatch(romanToDecimal(input));
    } else {
      setErr(true)
    }
  }


  return (
    <Col>
      <Form onSubmit={e => convert(e)}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>De</Form.Label>
              <Form.Select value={optionA} onChange={changeOption} id='a'>
                <option value='romanos'>Romanos</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>A</Form.Label>
              <Form.Select id='b' value={optionB} onChange={changeOption} >
                <option value='romanos'>Romanos</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{optionA.toUpperCase()}</Form.Label>
          <Form.Control required type='text' ref={inputRef} onChange={e => setPayload(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{optionB.toUpperCase()}</Form.Label>
          <Form.Control type="text" value={result? result : isNaN(result)? 'Try Again' : result } disabled />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Convertir
        </Button>
      </Form>

      {
        err && <div>Please enter valid numbers or characters</div>
      }
    </Col>
    
  );
}

export default FormConverter;
