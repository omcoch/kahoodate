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
                            <p>הוראות הוראות הוראות הוראות</p>
                            <p>
                                Loren ispum etc...
                            </p>
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
