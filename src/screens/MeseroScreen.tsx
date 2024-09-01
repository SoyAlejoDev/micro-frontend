import { Navigate } from 'react-router-dom';
import { useSocketStore } from '../store/useSocketStore';
import { MeseroForm } from '../components/auth/meseroForm/MeseroForm';



export const Mesero = () => {
    const { meseroLogin } = useSocketStore();

    return (
        <div>
            {
                (meseroLogin ? <Navigate to={'/mesas'} /> : <MeseroForm />)

            }

        </div>
    );
};
