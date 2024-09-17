import { Loading } from '../components/loading/Loading';
import { useSocketStore } from '../store/useSocketStore';
import { MainDrawer } from '../views/menuView/MainDrawer';

export const Menu = () => {

    const { socketData } = useSocketStore();

    return (
        <>
            {
                socketData ? (<MainDrawer />) : (<Loading />)
            }
        </>

    );
};
