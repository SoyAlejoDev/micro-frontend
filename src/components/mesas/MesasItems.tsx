import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { MesasArray } from '../../types';

export const MesasItems = ({ mesa, id, bussy }: MesasArray) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/mesa/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
            <h4 className="text-white text-2xl font-bold capitalize text-center">{mesa}</h4>
            <div className='flex'>
                <CheckCircleOutline
                    color={bussy ? 'error' : 'success'}
                    fontSize='large'
                />
            </div>
        </div>

    );
};
