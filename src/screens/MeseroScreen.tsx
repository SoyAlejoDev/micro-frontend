import { Navigate } from 'react-router-dom';
import { MeseroForm } from '../components/auth/meseroForm/MeseroForm';
import { useAuthStore } from '../store/useAuthStore';



export const Mesero = () => {


    const { meseroLogin } = useAuthStore();

    console.log(meseroLogin);

    return (
        <div>
            <MeseroForm />

        </div>
    );
};
