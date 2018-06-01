import React, { Component } from 'react';
import './stylesheets/OpenFinChrome.css';

class OpenFinChrome extends Component {

    constructor() {
        super();
        this.state = {
            maximized: false
        }

        if (typeof fin !== "undefined") {
            this.openFinWindow = fin.desktop.Window.getCurrent();
            this.openFinApp = fin.desktop.Application.getCurrent();
            this.isMainAppWindow = this.openFinWindow.name === this.openFinApp.uuid;
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        switch(e.target.name) {
            case "close":
                if (this.isMainAppWindow) {
                    this.openFinApp.close()
                } else {
                    this.openFinWindow.close()
                }
                break;
            case "maximize":
                if (!this.state.maximized) {
                    this.openFinWindow.maximize(() => {
                        this.setState({ maximized: true });
                    });
                } else {
                    this.openFinWindow.restore(() => {
                        this.setState({ maximized: false });
                    });
                }
                break;
            case "minimize":
                this.openFinWindow.minimize(() => {
                    this.setState({ minimize: false });
                }, (e) => {
                    console.log(`Error minimizing: ${e}`)
                });
                break;
            default:
                console.log('No Valid Target');
        }
    }

    render() {
        if (typeof fin !== "undefined") {
            return (
                <div className="openfin-chrome-control-bar">
                    <img 
                        name="close"
                        src={close}
                        alt="close"
                        onClick={this.handleClick}
                        className="openfin-chrome-close"
                    />
                    <img 
                        name="maximize"
                        src={maximize}
                        alt="maximize"
                        onClick={this.handleClick}
                        className="openfin-chrome-min-max"
                    />
                    <img
                        name="minimize"
                        src={minimize}
                        alt="minimize"
                        onClick={this.handleClick}
                        className="openfin-chrome-min-max"
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}