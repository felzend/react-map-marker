import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div className="header-component">
            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="javascript:void(0)">
                        <h3>Simple React Map Marker</h3>
                    </a>
                </div>
            </nav>
        </div>
    )
  }
}
