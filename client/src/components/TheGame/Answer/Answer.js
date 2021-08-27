import React from 'react';

import './Answer.css';
import { useAnswer } from '../../../contexts/AnswerProvider';




export default function Answer() {
  const { answer, username } = useAnswer()

  return (

    <div className="text-center mt-5" id="emojis">
      <span className="text-danger font-italic">{username} חושב/ת:</span><br />
      <img className={answer} alt="תשובת המדוייט/ת" />
    </div>

  );

}