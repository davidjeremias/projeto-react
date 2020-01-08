export const isAuthenticated = () => {
    if(localStorage.getItem("token") == null){
        return false;
    }else{
        return true;
    }
}

export const getRoles = () => {
    let jwtData = localStorage.getItem('token').split('.')[1]
    let decodedJwtJsonData = atob(jwtData)
    console.log(JSON.parse(decodedJwtJsonData).authorities[0]);
    return JSON.parse(decodedJwtJsonData).authorities;
}

export const getname = () => {
    let jwtData = localStorage.getItem('token').split('.')[1]
    let decodedJwtJsonData = atob(jwtData)
    return JSON.parse(decodedJwtJsonData).user_name
}


