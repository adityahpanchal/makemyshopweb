import Header from '../Header'
import CategorySection from './CategorySection'
import PopularCategorySection from './PopularCategorySection'
import Carousal from './Carousal'
import TopBrands from './TopBrands'
import Recommended from './Recommended'
import Footer from '../Footer'
const MainPage = (props) =>{
    return(
        <>
            <Header />
            <div style={{minWidth: '100%', backgroundColor: '#F6F7F9'}} className="container">
                <section style={{paddingLeft: 5, paddingRight: 5}} className="section-main padding-y">
                    <main className="card">
	                    <div className="card-body">
                            <div className="row">
                                <CategorySection />
                                <Carousal />
                                <PopularCategorySection />
                            
                            </div>
                        </div>
                    </main>   
                </section>
            </div>    
            <TopBrands />     
            <Recommended />
            <Footer />
        </>
    )
}

export default MainPage