import UpBtn from '../assets/up-arrow.png';


export default function ScrollToTopBtn() {

    return (

        <div className="scroll-to-top-btn">
            <img src={UpBtn} alt="up arrow" 
                className="cursor-pointer"
            />
        </div>

    )
}