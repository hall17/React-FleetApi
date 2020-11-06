import axios from 'axios'
const baseUrl = "http://localhost:6499/"
export default {
     allActions (url = baseUrl + 'Aircraft/') {
    return {
        getAll: () => axios.get(url),    
        getById: id => axios.get(url+id),
        update: (id,AC) =>  axios.put(url+id,AC),
        create: newAC =>  axios.post(url,newAC),
        delete: id => axios.delete(url+id),
        getAcTypes: () => axios.get(baseUrl+'AircraftTypes/'),
        createAcType: newAcType => axios.post(baseUrl+'AircraftTypes/',newAcType),
        getAcTypeById: id => axios.get(baseUrl+'AircraftTypes/'+id),
        updateAcType: (id,AcType) =>  axios.put(baseUrl+'AircraftTypes/'+id,AcType),
        deleteAcType: id => axios.delete(baseUrl+'AircraftTypes/'+id),

    }
}
}


