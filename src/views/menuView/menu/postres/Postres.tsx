import { useSocketStore } from "../../../../store/useSocketStore";
import { Card } from "../../../../ui/Card";

export const Postres = () => {

    const { online, socketData } = useSocketStore();

    return (
        <div className="lg:flex lg:flex-wrap">
            {
                online && (
                    socketData?.menu.agregados?.map((item, index) => (
                        <Card key={index} data={item} />
                    ))
                )

            }
        </div>
    );
};

