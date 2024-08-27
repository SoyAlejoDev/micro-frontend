import { useSocketStore } from "../../../../store/useSocketStore";
import { Card } from "../../../../ui/Card";
export const Pizzas = () => {

    const { online, socketData } = useSocketStore();



    return (
        <div className="lg:flex lg:flex-wrap">
            {
                online && (
                    socketData?.menu.pizzas?.map((item, index) => (
                        <Card key={index} data={item} />
                    ))
                )

            }
        </div>
    );
};
