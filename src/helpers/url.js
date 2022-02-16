export const APIUrls={
    login: ()=>{
        return 'http://localhost:8000/api/create-session'
    },
    signup: ()=>{
        return 'http://localhost:8000/api/create'
    },
    userProfile: (userId)=>{
        return `http://localhost:8000/api/profile/${userId}`
    },
    }
