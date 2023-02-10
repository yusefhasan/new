import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 //define aservice base url 

const appApi= createApi ({
reducerPath :"appApi",
baseQuery: fetchBaseQuery({
baseUrl: 'http://localhost:5001'
}),
endpoints: (builder)=>({
// creating the user 
signupUser :builder.mutation({
query:(user)=>({
 url:"/users",
 method:"POST",
 body: user,

}),

}),
//login 
loginUser :builder.mutation({
    query:(user)=>({
     url:"/users/login",
     method:"POST",
     body: user, 
    
    }),


     }),
     //logout
     logoutUser :builder.mutation({
        query:(payload)=>({
         url:"/logout",
         method:"DELETE",
         body: payload,
        
        }),


  }),
}),
});



export const { useSignupUserMutation,useLoginUserMutation,useLogoutUserMutation}=appApi;
export default appApi;