import { CardContent, Typography } from "@mui/material";
import { Data } from "../../types";


interface Props {
    socketData: Data | null;
}

export const History = ({ socketData }: Props) => {
    return (
        <div className="overflow-y-auto md:flex md:items-start">
            <img
                className="md:max-h-[500px] lg:max-h-[500px] w-full md:w-1/2"
                src={socketData?.history.foto}
                style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}
            />

            <CardContent className="md:w-1/2">

                <p className="text-2xl font-san md:text-5xl md:mt-11 s">{socketData?.history.title}</p>
                <p className="text-sm font-san mt-2  md:text-lg s">{socketData?.history.label}</p>

                <Typography variant="body2" color="text.secondary">

                </Typography>
            </CardContent>
        </div>
    );
};
