import {Link} from 'react-router-dom'

const CategorySection = () =>{
    return(
        <aside className="col-lg col-md-3 flex-lg-grow-0">
            <nav className="nav-home-aside">
                <h6 className="title-category">MAKE MY SHOP MARKETS <i className="d-md-none icon fa fa-chevron-down"></i></h6>
                <ul className="menu-category">
                    <li><Link target="_blank" to="/search/category?q=607cfd8e00069c18c491b149">Electronics</Link></li>
                    <li><Link target="_blank" to="/search/category?q=607ac5eae711a47c3c310b20">Man's Wear</Link></li>
                    <li><Link target="_blank" to="/search/category?q=607ac64ce711a47c3c310b21">Womans's Wear</Link></li>
                    <li><Link target="_blank" to="/search/category?q=607cfdc800069c18c491b14a">Furniture</Link></li>
                    <li><Link target="_blank" to="/search/category?q=605453db01a54a6c6c9a7723">Books</Link></li> 
                    <li><Link target="_blank" to="/search/category?q=602c1968fe594638606a0c8e">Stationery and Office Supplies</Link></li>
                    <li><Link target="_blank" to="/search/category?q=602c19bcfe594638606a0c8f">Sports & Fitness</Link></li>
                    <li><Link target="_blank" to="/search/category?q=602c1926fe594638606a0c8d">Nutrition and Health Care</Link></li>                                       
                </ul>
            </nav>
        </aside>
    )
}
 
export default CategorySection