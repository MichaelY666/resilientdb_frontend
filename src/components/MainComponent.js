import React, {Component} from 'react';
import Home from './HomeComponent';
import Upload from './UploadComponent';
import Uploaded from './UploadedComponent';
import Verified from './VerifiedComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from './LandingPage';

class Main extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/upload' component={Upload}/>
                        <Route exact path='/uploaded' component={Uploaded}/>
                        <Route exact path='/verified' component={Verified}/>
                        <Route exact path='/landing' component={LandingPage}/>
                        <Redirect to='/landing'/>
                    </Switch>
                
            </div>
        );
    }
}


export default Main;