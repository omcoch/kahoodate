import React from 'react'


export default function Instructions() {

    return (
        <div className="mt-5">
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#explanationModal">
                מה זה בעצם?
            </button>

            <div className="modal fade" id="explanationModal" tabIndex="-1" role="dialog" aria-labelledby="explanationModalTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title" id="explanationModalTitle">מה עושים פה?</h5>
                        </div>
                        <div className="modal-body text-right">
                            <p>כמו כרטיסי דייטים עם נושאים שונים, אבל עם שיפור קטן.</p>
                            <p>
                                קודם כל, אין כרטיסים - זה במסך וזמין לכל מי שיש לו אינטרנט. דבר שני, 
                                כל אחד רואה על המסך שלו את המילה / הנושא, ובוחר אימוג'י שמתאים מבחינתו לאותו כרטיס.
                            </p>
                            <p>בכל שלב, בין לפני שבחרתם אימוג'י ובין לאחר שראיתם את התשובה של הצד השני, אפשר לעבור לשאלה הבאה.</p>
                            <p>כמובן חשוב גם לדבר על הדברים ולא רק לצחוק מהסמיילים האלה...</p>
                            <p>אז תהנו ואל תשכחו לשלוח לי משוב!</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">סגור</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
