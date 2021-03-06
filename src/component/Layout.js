import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.PureComponent {


    isActive = (name) => {
        let path = window.location.pathname;
        return path.startsWith(name);
    }

    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar" className="sidebar">
                    <a className="sidebar-brand">
                        <img style={{ height: '30px' }} src="https://ximanginsee.gapit.com.vn/html/images/logo.png" />
                    </a>
                    <div className="sidebar-content">
                        <div className="sidebar-user">
                            <img src="https://admin.insee.udev.com.vn/static/upload/rtl-insee.png" className="img-fluid rounded-circle mb-2" alt="Linda Miller" />
                            <div className="font-weight-bold">INSEE ADMIN</div>
                        </div>
                        <ul className="sidebar-nav">
                            <li className="sidebar-header">
                                Main
                            </li>
                            <li className="sidebar-item">
                                <Link to="/" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-home" /> <span className="align-middle">Dashboards</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/retailer') && 'active'}`}>
                                <Link to="/retailer" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle fas fa-fw fa-store" /> <span className="align-middle">Cửa hàng</span>
                                </Link>
                                <ul className={`sidebar-dropdown list-unstyled collapse ${this.isActive('/retailer') ? ' show' : ''}`} data-parent="#sidebar">
                                    <li className="sidebar-item active"><Link className="sidebar-link" to={"/retailer/list"}>Danh sách</Link></li>
                                </ul>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/post') && 'active'}`}>
                                <Link to="/post" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-sign-in-alt" /> <span className="align-middle">Bài viết</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/promotion') && 'active'}`}>
                                <Link to="/promotion" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle fas fa-fw fas fa-ad" /> <span className="align-middle">Khuyến mãi </span>
                                </Link>
                                <ul className={`sidebar-dropdown list-unstyled collapse ${this.isActive('/promotion') ? ' show' : ''}`} data-parent="#sidebar">
                                    <li className="sidebar-item active"><Link className="sidebar-link" to={"/promotion/list"}>DS Chiến dịch</Link></li>
                                    <li className="sidebar-item active"><Link className="sidebar-link" to={"/promotion/forms"}>Danh sách đơn</Link></li>
                                </ul>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/egagement') && 'active'}`}>
                                <Link to="/egagement" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle far fa-fw fa-heart" /> <span className="align-middle">Engagements</span>
                                </Link>
                                <ul className={`sidebar-dropdown list-unstyled collapse ${this.isActive('/egagement') ? ' show' : ''}`} data-parent="#sidebar">
                                    <li className="sidebar-item active"><Link className="sidebar-link" to={"/egagement/list"}>DS Chiến dịch</Link></li>
                                </ul>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/broadcast') && 'active'}`}>
                                <Link to="/broadcast" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle fas fa-fw fa-bullhorn" /> <span className="align-middle">Broadcast</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${this.isActive('/gift') && 'active'}`}>
                                <Link to="/gift" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle fas fa-fw fa-gift" /> <span className="align-middle">Quà tặng</span>
                                </Link>
                                <ul className={`sidebar-dropdown list-unstyled collapse ${this.isActive('/gift') ? ' show' : ''}`} data-parent="#sidebar">
                                    <li className="sidebar-item active"><Link className="sidebar-link" to={"/gift/list"}>Danh sách</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="main">
                    <nav className="navbar navbar-expand navbar-theme">
                        <a className="sidebar-toggle d-flex mr-2">
                            <i className="hamburger align-self-center" />
                        </a>
                        <form className="form-inline d-none d-sm-inline-block">
                            <input className="form-control form-control-lite" type="text" placeholder="Search projects..." />
                        </form>
                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown ml-lg-2">
                                    <a className="nav-link dropdown-toggle position-relative" href="#" id="userDropdown" data-toggle="dropdown">
                                        <i className="align-middle fas fa-cog" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {this.props.children}
                </div>
            </div>
        )
    }

}