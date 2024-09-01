import { useSocketStore } from "../../../store/useSocketStore";
import { CardMesero } from "../card/CardMesero";

interface Props {
    selectedMenu: string;
    tableId: string;
}

export const MeseroMenuItem = ({ selectedMenu, tableId }: Props) => {
    const { online, socketData } = useSocketStore();

    return (
        <div className="lg:flex lg:flex-wrap gap-3 justify-between">
            {
                online && (
                    socketData?.new_data_menu?.find(section => section.nombre === selectedMenu)?.items.map((item, index) => (
                        <CardMesero
                            key={item.id}
                            data={item}
                            selectedMenu={selectedMenu}
                            tableId={Number(tableId)}
                        />
                    ))
                )
            }
        </div>
    );
};
