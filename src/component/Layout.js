import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.PureComponent {

    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar" className="sidebar">
                    <a className="sidebar-brand">
                        <img style={{ height: '30px' }} src="https://ximanginsee.gapit.com.vn/html/images/logo.png" />
                    </a>
                    <div className="sidebar-content">
                        <div className="sidebar-user">
                            <img src="https://s120-ava-talk.zadn.vn/f/f/a/9/10/120/87069ccaa43702ad56ec93fe5a75f24f.jpg" className="img-fluid rounded-circle mb-2" alt="Linda Miller" />
                            <div className="font-weight-bold">Đình Trung</div>
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
                            <li className="sidebar-item">
                                <Link to="/retailer" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-file" /> <span className="align-middle">Retailer</span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/stock-form" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-sign-in-alt" /> <span className="align-middle">Stock Form </span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/post" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-sign-in-alt" /> <span className="align-middle">Post </span>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/promotion" data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle mr-2 fas fa-fw fa-sign-in-alt" /> <span className="align-middle">Promotion </span>
                                </Link>
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