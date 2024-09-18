import { Navigate } from 'react-router-dom';
import { MeseroForm } from '../components/auth/meseroForm/MeseroForm';
import { useAuthStore } from '../store/useAuthStore';



export const Mesero = () => {


    const { meseroLogin } = useAuthStore();

    return (
        <div>
            {
                (meseroLogin ? <Navigate to={'/mesas'} /> : <MeseroForm />)
            }

        </div>
    );
};
