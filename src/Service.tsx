import axios from "axios";
const apiToken= '5eoGhrliJUODZ4zOrcne2tCtg5m0bRB79D96YbogDGWxkCBXCaahOmh65dA8'

const service = axios.create({
    baseURL: '/apiv2/pharmacy/',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+ apiToken,
    }
})

export function getEczane(city:string,county:string){
    const params={
        city:city,
        county:county
    }
    return service.get("list",{params:params})
}   

export function getIlce(city:string){
    const params={
        city:city
        
    }
    return service.get("city",{params:params})
} 

export function getIl(){
    return service.get("city")
}


