import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

const App = () => {
    return(
        <div>
            <AuthProvider>
                <Toaster/>
                <Outlet/>
            </AuthProvider>
        </div>
    )
}

export default App;