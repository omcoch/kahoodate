import React, { useState, useEffect, useCallback } from 'react';
import '../../../css/emoji.css'
import WordDisplay from '../WordDisplay/WordDisplay';
import Answer from '../Answer/Answer'
import NextQuest from '../NextQuest/NextQuest'
import Waiting from '../Waiting/Waiting'
import { useAnswer } from '../../../contexts/AnswerProvider';
import { useQuestion } from '../../../contexts/QuestionProvider';


export default function Dashboard() {
    const [alreadySent, setAlreadySent] = useState(false)
    const { answerMode } = useAnswer()
    const { question, my_answer, setCallbackFunc } = useQuestion()
    
    // that's how i send to the parent component (QuestionProvider) the setAlreadySent state-setter
    useEffect( () => {
            setCallbackFunc(()=> x => {                
                setAlreadySent(x)
            })
        }, [] )

    return (
        <div className="container mt-5">
            <div className="row align-items-center h-100">
                <div className="col-md-6 col-sm-12 mx-auto">
                    <div className="card h-100 justify-content-center" id="word-card">

                        <img className={`emoji_in_corner ${my_answer}`} style={{ visibility: alreadySent ? 'visible' : 'hidden' }} />

                        <div className="card-body text-center p-5">
                            <h1 className="card-title">{question}</h1>
                        </div>

                    </div>
                </div> 
            </div>

            {alreadySent ?
                (answerMode ? <Answer /> : <Waiting />) :
                <WordDisplay setAlreadySent={setAlreadySent} />
            }


            <NextQuest />

        </div>
    );

}