import { useSocketStore } from "../../../../store/useSocketStore";
import { CardMesero } from "../../../../ui/CardMesero";

interface Props {
    selectedMenu: string;
    tableId: string;
}

export const Bebidas = ({ selectedMenu, tableId }: Props) => {

    const { online, socketData } = useSocketStore();

    return (
        <div className="lg:flex lg:flex-wrap gap-3 justify-between">
            {
                online && (
                    socketData?.menu.bebidas?.map((item, index) => (
                        <CardMesero
                            key={index}
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
