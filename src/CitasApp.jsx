
import { LoginProvider } from "./context/LoginContext"
import { CitasRouter } from "./routes/CitasRouter"




export const CitasApp = () => {
    return (
       <LoginProvider>
           <CitasRouter />
       </LoginProvider>
    )
}
