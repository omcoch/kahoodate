export default function Waiting({message}) {
    
    return (
        <div className="row align-items-center h-100">
            <div className="col-12 mt-5 text-center">
                <img src="../../../../../waiting.png" alt="לתרגל קצת סבלנות לפני החתונה" />
                <br />
                {message}
            </div>
        </div>
    );
}