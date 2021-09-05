import React, { useRef, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import Instructions from '../Instructions/Instructions'
import queryString from 'query-string';


export default function Login({ username, room, submitUsername, submitRoom }) {
  const usernameRef = useRef()
  const uuidRef = useRef() // the group id to sign in (if you're the invited)
  const loginForm = useRef()


  const whatsappMessage = encodeURIComponent(`היי! הודעה מפדחת שמזמינה אותך להשתתף איתי במשחק של Kahoodate לחץ על הקישור ואל תפחד שזה סקאם ${window.location.href}?partneruid=${room}`)
  

  //TODO: ensure that the random id is really unique 
  function handleSubmit(e) {
    e.preventDefault()

    submitUsername(usernameRef.current.value)

    if (uuidRef.current.value !== "")
      submitRoom(uuidRef.current.value)
  }


  useEffect(() => {
    let params = queryString.parse(window.location.search)
    if (params["partneruid"] === undefined || params["partneruid"] === '') return
    uuidRef.current.value = params["partneruid"]
    loginForm.current.click()
  }, []);


  function copyUuid() {
    navigator.clipboard.writeText(room)
  }


  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100" id="loginForm">
        <Form.Group>
          <Form.Control type="text" ref={usernameRef} defaultValue={username} required placeholder="מה השם שלך?" /><br />
          <Form.Control type="text" ref={uuidRef} placeholder="קיבלת קוד? הכנס אותו לכאן" />
        </Form.Group>

        <div>
          <button type="button" className="btn btn-link" onClick={copyUuid}>{room}</button>
          &nbsp; | &nbsp;
          <a
            href={`whatsapp://send?text=${whatsappMessage}`}
          >
            שליחה בווטסאפ למדוייט/ת
          </a>
        </div>

        <Button type="submit" className="mt-2" ref={loginForm}>להתחלת המשחק</Button>

        <Instructions />

      </Form>


    </Container>
  );

}