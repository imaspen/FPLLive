import {combineReducers} from 'redux';

import AccountReducer from './AccountReducer';
import AuthenticationReducer from './AuthenticationReducer';
import BootstrapReducer from './BootstrapReducer';
import CompareTeamReducer from './TeamReducer';
import LeagueReducer from './LeagueReducer';
import MyTeamReducer from './MyTeamReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
    AccountReducer,
    AuthenticationReducer,
    BootstrapReducer,
    CompareTeamReducer,
    LeagueReducer,
    MyTeamReducer,
    PlayerReducer,
});
