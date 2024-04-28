import registerRootComponent from 'expo/build/launch/registerRootComponent';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/Redux/Store/index';
import App from '../../App';


export const provider =()=>{
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

registerRootComponent(provider);