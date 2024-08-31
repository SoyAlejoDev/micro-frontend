import { useSocketStore } from "../../../../store/useSocketStore";
import { Card } from "../../../../ui/Card";

export const Entrantes = () => {
    const { online, socketData } = useSocketStore();

    // Filtramos la sección de entrantes
    const entrantesSection = socketData?.new_data_menu?.find(section => section.nombre === "Entrantes");

    return (
        <div className="lg:flex lg:flex-wrap">
            {online && entrantesSection && (
                entrantesSection.items.map((item, index) => (
                    <Card key={item.id} data={item} />
                ))
            )}
        </div>
    );
};
