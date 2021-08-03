import { Link, withRouter } from "react-router-dom"

const TopPageTitle = (props) =>{
    // console.log(props)
    return(
        <section className="section-pagetop bg-gray">
            <div className="container">
	            <h2 className="title-page">My account</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        {
                            props.location.pathname.includes('my') && !props.location.pathname.includes('recent') &&
                            <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{`${props.location.pathname === '/profile' ? '' : `MY ${(props.location.pathname.split('/')[2]).split('my')[1].toUpperCase()}`}`}</Link>
                            </>
                        }
                        {
                            props.location.pathname.includes('my') && props.location.pathname.includes('recent') &&
                            <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{`${props.location.pathname === '/profile' ? '' : `MY RECENT ${(props.location.pathname.split('/')[2]).split('my')[1].toUpperCase()}`}`}</Link>
                        
                            </>
                        }
                        {
                            !props.location.pathname.includes('my') &&
                            <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{`${props.location.pathname === '/profile' ? '' : `MY ORDER STATUS`}`}</Link>
                            </>
                        }
                    </ol>
                </nav>
            </div>
        </section>
    )
}

export default withRouter(TopPageTitle)