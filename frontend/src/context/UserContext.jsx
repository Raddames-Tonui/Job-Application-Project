import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext()

export const UserProvider = ({ children }) => 
{
    const nav = useNavigate()

    const [currentUser, setCurrentUser] = useState("Kelvin")

    // All your functions and state variables will be available to all the children components that are wrapped in the UserProvider
   //    REGISTER USER
    const register_user = (name,email, phone_number,is_organizer, password) =>{
        fetch('http://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                is_organizer: is_organizer
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
        .then((response) => response.json())
        .then((res) =>{
        //   nav("/")
         if(res.success)
            {
                toast.success(res.success)
                nav("/login")
            }
            else if(res.error)
            {
                toast.error(res.error)
            }
            else {
                toast.error("An error occured")
            }

        });
    
    }

    const contextData ={
        currentUser,
        setCurrentUser,
        register_user

    }
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}