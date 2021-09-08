import React, { useRef, useEffect } from 'react'
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap'

import Instructions from '../Instructions/Instructions'
import queryString from 'query-string';
import { v4 as uuidV4 } from 'uuid'

export default function Login({ username, room, submitUsername, submitRoom, setMode }) {
  const usernameRef = useRef()
  const uuidRef = useRef() // the group id to sign in (if you're the invited)
  const submitButton = useRef()


  function handleSubmit(e) {
    e.preventDefault()

    submitRoom(uuidRef.current.value)
    submitUsername(usernameRef.current.value)
    setMode('joinGame')
  }

  function newGame() {
    submitRoom(uuidV4())
    submitUsername(usernameRef.current.value)
    setMode('newGame')
  }


  useEffect(() => {
    let params = queryString.parse(window.location.search)
    if (params["partneruid"] === undefined || params["partneruid"] === '') return
    uuidRef.current.value = params["partneruid"]
    submitButton.current.click()
  }, []);






  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100" id="loginForm">
        <Form.Group>

          <InputGroup className="mb-3">
            <FormControl ref={usernameRef} defaultValue={username} required placeholder="מה השם שלך?" aria-label="התחלת משחק חדש" aria-describedby="basic-addon1" />
            <Button variant="primary" onClick={newGame}>להתחלת משחק חדש</Button>
          </InputGroup>


          <InputGroup className="mb-3">
            <FormControl ref={uuidRef} placeholder="קיבלת קוד? הכנס אותו לכאן" aria-label="להצטרף למשחק" aria-describedby="basic-addon1" />
            <Button type="submit" variant="warning" ref={submitButton}>להצטרף למשחק</Button>
          </InputGroup>
        </Form.Group>

        <Instructions />

      </Form>


    </Container>
  );

}