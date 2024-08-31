import { useSocketStore } from "../../../../store/useSocketStore";
import { Card } from "../../../../ui/Card";

interface Props {
    seccion: string;
}

export const MenuItem = ({ seccion }: Props) => {
    const { online, socketData } = useSocketStore();

    // Filtramos la sección de entrantes
    const entrantesSection = socketData?.new_data_menu?.find(section => section.nombre === seccion);

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
