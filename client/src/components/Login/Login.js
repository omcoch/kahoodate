import React, { useRef, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import Instructions from '../Instructions/Instructions'
import queryString from 'query-string';


export default function Login({ username, submitUsername, submitRoom }) {
  const usernameRef = useRef()
  const uuidRef = useRef() // the group id to sign in (if you're the invited)
  const loginForm = useRef()
  const newUuid = uuidV4()


  const whatsappMessage = encodeURIComponent(`היי! הודעה מפדחת שמזמינה אותך להשתתף איתי במשחק של Kahoodate לחץ על הקישור ואל תפחד שזה סקאם /?partneruid=${newUuid}`)


  //TODO: ensure that the random id is really unique 
  function handleSubmit(e) {
    e.preventDefault()

    submitUsername(usernameRef.current.value)

    if (uuidRef.current.value !== "")
      submitRoom(uuidRef.current.value)
    else
      submitRoom(newUuid)

  }


  useEffect(() => {
    let params = queryString.parse(window.location.search)
    if (params["partneruid"] === undefined || params["partneruid"] == '') return
    uuidRef.current.value = params["partneruid"]
    loginForm.current.click()
  }, []);


  function copyUuid() {
    navigator.clipboard.writeText(newUuid)
  }


  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100" id="loginForm">
        <Form.Group>
          <Form.Label>מה השם שלך?</Form.Label>
          <Form.Control type="text" ref={usernameRef} defaultValue={username} required /><br />
          <Form.Control type="text" ref={uuidRef} placeholder="קיבלת קוד? הכנס אותו לכאן" />
        </Form.Group>

        <div>
          <button type="button" class="btn btn-link" onClick={copyUuid}>{newUuid}</button>
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