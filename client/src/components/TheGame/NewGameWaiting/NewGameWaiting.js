import Waiting from "../Waiting/Waiting";

export default function NewGameWaiting({ room }) {

    const shared_link = window.location.href+'?partneruid='+room
    const whatsappMessage = encodeURIComponent(`אני מזמין אותך להצטרף אליי למשחק מגניב!  ${shared_link}`)

    function copyUuid() {
        navigator.clipboard.writeText(shared_link)
    }



    return (
        <>
            <div className="row align-items-center h-100">
                <div className="col-12 mt-5 text-center">
                    <div>
                        לחץ להעתקת הקישור: <button type="button" className="btn btn-link" onClick={copyUuid}>{room}</button>
                        &nbsp; | &nbsp;
                        <a
                            href={`whatsapp://send?text=${whatsappMessage}`}
                        >
                            שיתוף קישור בווטסאפ
                        </a>
                    </div>
                </div>
            </div>
            <Waiting message="המתן שהפרטנר יתחבר" />
        </>
    );
}