import {combineReducers} from 'redux';

import AuthenticationReducer from './AuthenticationReducer';
import BootstrapReducer from './BootstrapReducer';
import LeagueReducer from './LeagueReducer';
import MyTeamReducer from './MyTeamReducer';
import PlayerReducer from './PlayerReducer';
import CompareTeamReducer from './CompareTeamReducer';

export default combineReducers({
    AuthenticationReducer,
    BootstrapReducer,
    CompareTeamReducer,
    LeagueReducer,
    MyTeamReducer,
    PlayerReducer,
});
