import { useQuestion } from "../../../contexts/QuestionProvider";

function NextQuest() {
    const { requestQuestion } = useQuestion()

    function handleClick(e) {
        e.preventDefault()
        
        requestQuestion()         
        //e.target.disabled = true
    }


    return (
        <div className="row align-items-center h-100">
            <div className="col-md-6 col-sm-12 mx-auto text-center">
                <button 
                    type="button" 
                    className="btn btn-outline-success mt-5 mb-5"
                    onClick={handleClick}
                >                    
                לשאלה הבאה &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default NextQuest;