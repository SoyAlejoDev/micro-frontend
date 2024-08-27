import { Navigate } from 'react-router-dom';
import { MeseroForm } from '../components/form/MeseroForm';
import { useSocketStore } from '../store/useSocketStore';



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
