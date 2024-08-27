import { Data } from "../../types";


interface Props {
    socketData: Data | null;
}

export const MainMenu = ({ socketData }: Props) => {
    return (
        <div className="background-container overflow-y-auto"
            style={{
                backgroundImage: `url(${socketData?.main?.foto})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                height: '80vh',
            }}>
            <div className="overlay">
                <h1 className="title">{socketData?.main?.title}</h1>
                <p className="label">{socketData?.main?.label}</p>
            </div>
        </div>
    );
};
