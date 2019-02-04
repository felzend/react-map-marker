import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div className="header-component">
            <nav className="navbar navbar-light">
                <a className="navbar-brand" href="javascript:void(0)">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <h3>Simple React Map Marker</h3>
                        </li>
                    </ul>
                </a>
            </nav>
        </div>
    )
  }
}
