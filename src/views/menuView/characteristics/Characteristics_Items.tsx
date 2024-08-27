import { Paper } from '@mui/material';
import { Characteristic } from '../../../types';

interface Props {
    characteristics: Characteristic;
}

export const Characteristics_Items = ({ characteristics }: Props) => {
    return (


        <div className='flex flex-col items-center mt-14 mx-2 mb-10'>
            <div className=" relative bg-white shadow-lg flex items-center  flex-col hover:bg-blue-600 hover:text-white ">
                <div className="absolute -top-10">
                    <img className=" h-24 w-24 rounded-full object-cover " src={characteristics.logo} alt="" />
                </div>
                <Paper elevation={3} className='md:h-[200px]'>
                    <div className="mt-16 flex items-center flex-col justify-center">
                        <p className="font-semibold text-xl text-gray-500">{characteristics.item}</p>
                        <p className="text-center mb-5 mx-2">{characteristics.text}</p>
                    </div>

                </Paper>

            </div>
        </div>

    );
};
