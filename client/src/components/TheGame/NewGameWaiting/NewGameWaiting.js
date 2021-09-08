import { useSocket } from "../../../contexts/SocketProvider";

export default function NewGameWaiting({room}) {

    const whatsappMessage = encodeURIComponent(`היי! הודעה מפדחת שמזמינה אותך להשתתף איתי במשחק של Kahoodate לחץ על הקישור ואל תפחד שזה סקאם ${window.location.href}?partneruid=${room}`)

    function copyUuid() {
        navigator.clipboard.writeText(room)
    }



    return (
        <div className="row align-items-center h-100">
            <div className="col-12 mt-5 text-center">
                <div>
                    לחץ להעתקת הקוד: <button type="button" className="btn btn-link" onClick={copyUuid}>{room}</button>
                    &nbsp; | &nbsp;
                    <a
                        href={`whatsapp://send?text=${whatsappMessage}`}
                    >
                        שיתוף קישור בווטסאפ
                    </a>
                </div>
            </div>
        </div>
    );
}