

/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

import{createUserWithEmailAndPassword,updateProfile,getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
  
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
   const axiosPublic = useAxiosPublic();
    const createUser = (displayName, photoURL,email,password)=>{
        setLoading(true);

        return ( createUserWithEmailAndPassword(auth,email,password))
    .then(result => {
       
        return updateProfile(result.user, {
          displayName: displayName,
          photoURL: photoURL,
        }).then(() => {
          setUser(result.user);
          
          return result;
        });
      });
    };

    const googleSignIn = (value) => {
        setLoading(true);
    return signInWithPopup(auth,googleProvider);
       };

       const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
       };
       const logOut =()=>{
        setLoading(true);
            return signOut(auth);
       }

       useEffect(() =>{
        const unSubscribe= onAuthStateChanged (auth,currentUser =>{
           
    
     
     setUser(currentUser);
     if(currentUser){
        const userInfo ={email:currentUser.email};
        axiosPublic.post('/jwt', userInfo)
            .then(res => {
                // console.log(res);
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token);
                    // setLoading(false);
                }
            })
     }
     else{
        localStorage.removeItem('access-token');
     }
     setLoading(false);
     });
    
     
     return () =>{
         unSubscribe();
     }  
             
        },[axiosPublic]);




    const AuthInfo = {
        googleSignIn,
        user,
        loading,
       
        createUser,
        signIn,
        logOut,
     }; 
    return (
        <AuthContext.Provider value={AuthInfo}>{children}

            </AuthContext.Provider>
    );
};

export default AuthProvider;