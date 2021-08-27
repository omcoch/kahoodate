import React from 'react';
import { useAnswer } from '../../../contexts/AnswerProvider';


export default function WordDisplay({setAlreadySent}) {
    const { sendAnswer } = useAnswer()
    

    function handleEmojiSubmit(e) {
        e.preventDefault();
        
        setAlreadySent(true)
        const myEmoji = e.target.className

        sendAnswer(
            myEmoji // my selected emoji
        )        

        // GO TO answer page anyway, and then wait to the partner selection
    }
    

    return (

        <div className="row align-items-center h-100">
            <div className="col-md-4 col-xs-12 mx-auto text-center">
                <div className="text-center mt-5" id="emojis">
                    <button onClick={handleEmojiSubmit} className="e-happy"></button>
                    <button onClick={handleEmojiSubmit} className="e-angry"></button>
                    <button onClick={handleEmojiSubmit} className="e-laughing"></button>
                    <button onClick={handleEmojiSubmit} className="e-sad"></button>
                    <button onClick={handleEmojiSubmit} className="e-sleeping"></button>
                    <button onClick={handleEmojiSubmit} className="e-thinking"></button>
                    <button onClick={handleEmojiSubmit} className="e-robot"></button>
                    <button onClick={handleEmojiSubmit} className="e-tongue"></button>
                </div>
            </div>
        </div>

    );
}