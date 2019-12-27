export const isAuthenticated = () => {
    if(localStorage.getItem("token") == null){
        return false;
    }else{
        return true;
    }
}