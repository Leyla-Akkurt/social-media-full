export const LoginStart=(userCredentials)=>({
    type:"LOGIN_START"
});
export const LoginSucces=(user)=>({
 type:"LOGIN_SUCCESS",
 payload:user
});
export const LoginFailure=(error)=>({
    type:"LOGIN_FAILURE",
    payload:error
})
export const follow=(userId)=>({
  type:"FOLLOW",
  payload:userId
})
export const unfollow=(userId)=>({
 type:"UNFOLLOW",
 payload:userId
})
export const logout=()=>({
 type:"LOGOUT"
})
