import './Login.css';
import React, { useRef } from 'react';
import { Container, Form } from 'react-bootstrap'
import { Switch } from 'react-router-dom';

class Login extends React.Component {
  constructor() { super(); }


  render() {
    return (
      <div class="container text-center mt-5">
        <div class="row  justify-content-md-center">
          <div class="col-md-auto">           

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input type="text" class="form-control" placeholder="הקלד/י את השם שלך" aria-label="Username" />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">כדי להתחיל את המשחק שלח/י את הקישור לבן/בת הזוג:</span>
              </div>
              <input type="text" class="form-control text-center" id="url" value="" />
              <div class="input-group-append">
                <button class="btn btn-success" type="button" onClick={this.shareLinkViaWhatsApp}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                  </svg>
                    &nbsp;שיתוף
              </button>
              </div>
            </div>

            <button type="button" class="btn btn-primary btn-lg btn-block mt-5" onClick={this.startGame}>אני מוכן להתחיל משחק חדש :)</button>

          </div>
        </div>
      </div>


    );
  }

  shareLinkViaWhatsApp() {
    window.open(
      "whatsapp://send?text=",
      '_blank'
    );
  }

  startGame() {

    // create new ID for the pair in firebase


    // change the button with displaying link-sharing to send to the partner
  }

}

export default Login;
