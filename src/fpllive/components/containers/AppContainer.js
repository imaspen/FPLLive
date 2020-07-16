import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

import {fetchBootstrap} from '../../actions/BootstrapActions';
import LeagueStack from '../../stacks/LeagueStack';
import MyTeamStack from '../../stacks/MyTeamStack';
import CompareTeamStack from '../../stacks/CompareTeamStack';
import LoginScreen from '../presentational/LoginPage';
import {authenticate} from '../../actions/AuthenticateActions';
import {fetchAccount} from '../../actions/AccountActions';

class AppContainer extends Component {
    AppNavigator = createMaterialBottomTabNavigator({
        League: LeagueStack,
        MyTeam: MyTeamStack,
        Compare: CompareTeamStack
        /*Live:,
        Matches:,*/
    }, {
        // initialRouteName: 'Compare',
    });

    AppContainer = createAppContainer(this.AppNavigator);

    state = {email: '', password: ''};

    static mapStateToProps(state, ownProps) {
        const {AuthenticationReducer, BootstrapReducer} = state;
        return {
            ready: !BootstrapReducer.isFetching
                && BootstrapReducer.bootstrap,
            authenticated: AuthenticationReducer.isAuthenticated,
            ...ownProps,
        };
    }

    setEmail = email => this.setState({email: email});

    setPassword = password => this.setState({password: password});

    login = () => this.props.dispatch(authenticate(this.state.email, this.state.password));

    LoadingContainer = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
            <Text style={{padding: 8}}>Loading Data</Text>
        </View>
    );

    componentDidMount() {
        this.props.dispatch(fetchBootstrap());
        this.props.dispatch(fetchAccount());
    }

    render() {
        return !this.props.authenticated
            ? <LoginScreen login={this.login} setEmail={this.setEmail} setPassword={this.setPassword}
                           email={this.state.email} password={this.state.password}/>
            : !this.props.ready
                ? <this.LoadingContainer/>
                : <this.AppContainer/>;
    }
}

export default connect(AppContainer.mapStateToProps)(AppContainer);
