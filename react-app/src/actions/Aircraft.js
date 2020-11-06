import api from './api';

export const ACTION_TYPE = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    READ_ALL: 'READ_ALL',
    READ_ONE: 'READ_ONE',
    READ_ACTYPES: 'READ_ACTYPES',
    CREATE_ACTYPE: 'CREATE_ACTYPE',
    READ_ACTYPE: 'READ_ACTYPE',
    DELETE_ACTYPE: 'DELETE_ACTYPE',
    UPDATE_ACTYPE: 'UPDATE_ACTYPE',
}
//ACTION CREATOR
export const getAll = () => dispatch => {
    api.allActions().getAll()
    .then( response => {
        // console.log(response)
        dispatch({
            type:ACTION_TYPE.READ_ALL,
            payload:response.data
        })
    })
}
export const getById = (id) => dispatch => {
    api.allActions().getById(id)
    .then(response => {
        dispatch({
            type:ACTION_TYPE.READ_ONE,
            payload:response.data
        })
    })
    .catch(err => console.log(err))
}
export const update = (AC) => dispatch => {
    api.allActions().update(AC.id,AC)
    .then(response => {
        console.log(response)
        dispatch({
            type:ACTION_TYPE.UPDATE,
            payload:response.data
        })
    })
    .catch(err => console.log(err))
}
export const create = (data) => dispatch => {
    api.allActions().create(data)
    .then(response => {
        dispatch({
            type:ACTION_TYPE.CREATE,
            payload:response.data
        })
    })
    .catch(err => console.log(err))
}
export const Delete = (id) => dispatch => {
        api.allActions().delete(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPE.DELETE,
                payload:id
            })
        })
        .catch(err => console.log(err))
    }

export const getAcTypes = () => dispatch => {
        api.allActions().getAcTypes()
        .then( response => {
            dispatch({
                type:ACTION_TYPE.READ_ACTYPES,
                payload:response.data
            })
        })
    }
    export const createAcType = (data) => dispatch => {
        api.allActions().createAcType(data)
        .then(response => {
            dispatch({
                type:ACTION_TYPE.CREATE_ACTYPE,
                payload:response.data
            })
        })
        .catch(err => console.log(err))
    }
    export const deleteAcType = (id) => dispatch => {
        api.allActions().deleteAcType(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPE.DELETE_ACTYPE,
                payload:id
            })
        })
        .catch(err => console.log(err))
    }
    export const getTypeById = (id) => dispatch => {
        api.allActions().getTypeById(id)
        .then(response => {
            dispatch({
                type:ACTION_TYPE.READ_ACTYPE,
                payload:response.data
            })
        })
        .catch(err => console.log(err))
    }
    export const updateAcType = (AC) => dispatch => {
        api.allActions().updateAcType(AC.id,AC)
        .then(response => {
            dispatch({
                type:ACTION_TYPE.UPDATE_ACTYPE,
                payload:response.data
            })
        })
        .catch(err => console.log(err))
    }


