import React, {Component} from 'react';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import GlobalReducer from './reducers/GlobalReducer';
import Theme from './Theme';
import AppContainer from './components/containers/AppContainer';

const Store = createStore(
    GlobalReducer,
    applyMiddleware(thunkMiddleware)
);

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <PaperProvider theme={Theme}>
                    <AppContainer/>
                </PaperProvider>
            </Provider>
        );
    }
}
