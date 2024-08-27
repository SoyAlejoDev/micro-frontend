import { Bebidas, PlatosPrincipales } from "../types";

interface Props {
    data: Bebidas | PlatosPrincipales | undefined;
}

export const Card = ({ data }: Props) => {
    return (
        <div className="relative rounded-lg h-[200px] flex flex-col md:flex-row items-center md:shadow-xl md:h-72 m-4 lg:w-customCard">
            <div className="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
                <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)',
                        backgroundBlendMode: 'multiply',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                ></div>
                <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                    <h4 className="w-full text-sm text-gray-100 leading-tight font-light">{data?.descripcion}.</h4>
                    <h3 className="w-full font-bold text-lg text-white leading-tight mb-2">{data?.nombre}<span style={{ fontWeight: 100, fontSize: '24px' }}> ${data?.precio}</span></h3>
                </div>
                <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="50,0 100,0 50,100 0,100" />
                </svg>
            </div>

            <div className="hidden z-10 order-2 md:order-1 w-full h-full md:w-3/5 md:flex items-center -mt-6 md:mt-0">
                <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                    <h3 className="hidden md:block font-bold text-2xl text-gray-700">{data?.nombre} <span style={{ fontWeight: 200 }}>${data?.precio}</span></h3>
                    <p className="text-gray-600 text-justify">{data?.descripcion}</p>

                </div>
            </div>
        </div>
    );
};
