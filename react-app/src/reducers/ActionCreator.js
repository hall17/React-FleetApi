import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {ACTION_TYPE} from '../actions/Aircraft'; 

const initialState = {
    list:[],
    listAcTypes:[],
    ac:''   ,
    acType:''
}
// REDUCERS
export const getAircrafts = (state=initialState,action) => {
    switch(action.type) {
        case ACTION_TYPE.READ_ALL:
            return {
                ...state,
                list:[...action.payload]
        }
        case ACTION_TYPE.READ_ONE:
            return {
                ...state,
                ac: action.payload
        }
        case ACTION_TYPE.CREATE:
            return {
                ...state,
                list:[...state.list,action.payload]
            }
        case ACTION_TYPE.UPDATE:
            return {
                ...state,
                list: state.list.map(x=> x.id == action.payload.id ? action.payload : x)
            }
            case ACTION_TYPE.DELETE:
                return {
                    ...state,
                    list:state.list.filter(x => x.id !== action.payload)
                }
            case ACTION_TYPE.READ_ACTYPES: {
                return {
                    ...state,
                    listAcTypes:[...action.payload]
                }
            }
            case ACTION_TYPE.READ_ACTYPE: {
                return {
                    ...state,
                    acType:action.payload
                }
            }
            case ACTION_TYPE.CREATE_ACTYPE:
                return {
                    ...state,
                    listAcTypes:[...state.listAcTypes,action.payload]
                }
                case ACTION_TYPE.UPDATE_ACTYPE:
                return {
                    ...state,
                    listAcTypes: state.listAcTypes.map(x=> x.id === action.payload.id ? action.payload : x)
                }
                case ACTION_TYPE.DELETE_ACTYPE:
                return {
                    ...state,
                    listAcTypes:state.listAcTypes.filter(x => x.id !== action.payload)
                }
        default:
        return state
    }
}

// Combine Reducers
const reducers = combineReducers({
    getAircrafts
})

export const store = createStore(reducers,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

