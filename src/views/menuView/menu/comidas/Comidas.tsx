import { useSocketStore } from "../../../../store/useSocketStore";
import { Card } from "../../../../ui/Card";

export const Comidas = () => {

    const { socketData, online } = useSocketStore();

    return (
        <div className="lg:flex lg:flex-wrap">
            {
                online && (
                    socketData?.menu?.platosPrincipales.map((item, index) => (
                        <Card key={index} data={item} />
                    )
                    )
                )
            }
        </div>
    );
};
