import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '../../Images/banner.jpg'
import banner2 from '../../Images/banner2.jpg'
import slide3 from '../../Images/slide3.jpg'
// import {Link} from 'react-router-dom'

const Carousal = () =>{

    const [currentSlide, setCurrentSlide] = useState(0)
    
    useEffect(() =>{
        const interval = setInterval(() =>{
            if(currentSlide >= 2){
                setCurrentSlide(0)
            }else{
                setCurrentSlide(currentSlide =>currentSlide + 1)
            }
            
        }, 2000)
        return () => clearInterval(interval)
    }, [currentSlide])

    const sliderChange = (n) =>{
        let nextSlide = currentSlide + n
        if(nextSlide > 2){
            setCurrentSlide(0)
            return
        }
        if(nextSlide < 0){
            setCurrentSlide(2)
            return
        }
        setCurrentSlide(nextSlide)
    }

    return(
        <div className="col-md-9 col-xl-7 col-lg-7">
            <div id="carousel1_indicator" className="slider-home-banner carousel slide" data-ride="carousel">
                
            <ol className="carousel-indicators">
                <li data-target="#carousel1_indicator" data-slide-to="0" className={currentSlide === 0 ? "active": ""}></li>
                <li data-target="#carousel1_indicator" data-slide-to="1" className={currentSlide === 1 ? "active": ""}></li>
                <li data-target="#carousel1_indicator" data-slide-to="2" className={currentSlide === 2 ? "active": ""}></li>
            </ol>

                <div style={{display: currentSlide === 0 ? "": "none"}} className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://media.mysport.lv/wysiwyg/Brendu_kategoriju_content_LV/adidas_apavi-baneris.jpg" alt="First slide" /> 
                    </div>
                </div>
                <div style={{display: currentSlide === 1 ? "": "none"}} className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1791677b-5bf5-4fd7-8642-e17627638d62/ddqbakl-02430685-44aa-416a-a4f5-9ab5cb14c6bb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTc5MTY3N2ItNWJmNS00ZmQ3LTg2NDItZTE3NjI3NjM4ZDYyXC9kZHFiYWtsLTAyNDMwNjg1LTQ0YWEtNDE2YS1hNGY1LTlhYjVjYjE0YzZiYi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.NDIFqdiVPqEilTQAWt80WsY98RrI40QWK4JHvTP34NE" alt="First slide" /> 
                    </div>
                </div>
                <div style={{display: currentSlide === 2 ? "": "none"}} className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://img.freepik.com/free-vector/bedroom-furniture-sale-ad-banner-template_1441-3737.jpg?size=626&ext=jpg" alt="First slide" /> 
                    </div>
                </div>
                {/* <h1 >{currentSlide}</h1> */}
                <Link to="" onClick={() => sliderChange(-1)} className="carousel-control-prev" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </Link>
                <Link to="" onClick={() => sliderChange(+1)} className="carousel-control-next" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </Link>
            </div> 
        </div>
    )
}

export default Carousal