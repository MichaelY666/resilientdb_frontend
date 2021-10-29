import React, {Component} from 'react';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Upload from './UploadComponent';
import Uploaded from './UploadedComponent';
import Verified from './VerifiedComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/upload' component={Upload}/>
                        <Route exact path='/uploaded' component={Uploaded}/>
                        <Route exact path='/verified' component={Verified}/>
                        <Redirect to='/login'/>
                    </Switch>
                
            </div>
        );
    }
}


export default Main;