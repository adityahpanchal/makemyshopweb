import { Link, withRouter } from "react-router-dom"

const TopPageTitle = (props) =>{
    console.log(props.location.pathname.split('/'))
    return(
        <section className="section-pagetop bg-gray">
            <div className="container">
	            <h2 className="title-page">MY SELLER CONSOLE</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()} / {(props.location.pathname.split('/')[2]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{props.location.pathname === '/seller/console' ? '' : `${props.location.pathname.split('/')[3].toUpperCase()}`}</Link>
                                {props.location.pathname.split('/')[4] && <Link className="breadcrumb-item active">{!(props.location.pathname.includes('new') || !props.location.pathname.includes('processing') || !props.location.pathname.includes('delivered'))  ? '' : `${props.location.pathname.split('/')[4].toUpperCase()}`}</Link>}
                            </>
                        {/* {
                            props.location.pathname.includes('my') &&
                            <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{`${props.location.pathname === '/profile' ? '' : `MY ${(props.location.pathname.split('/')[2]).split('my')[1].toUpperCase()}`}`}</Link>
                            </>
                        }
                        {
                            !props.location.pathname.includes('my') &&
                            <>
                                <Link className="breadcrumb-item"><Link to="/profile">{(props.location.pathname.split('/')[1]).toUpperCase()}</Link></Link>
                                <Link className="breadcrumb-item active">{`${props.location.pathname === '/profile' ? '' : `MY ORDER STATUS`}`}</Link>
                            </>
                        } */}
                    </ol>
                </nav>
            </div>
        </section>
    )
}

export default withRouter(TopPageTitle)