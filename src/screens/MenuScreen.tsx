import { Loading } from '../components/loading/Loading';
import { MenuSkeleton } from '../components/skeleton/MenuSkeleton';
import { useSocketStore } from '../store/useSocketStore';
import { MainDrawer } from '../views/menuView/MainDrawer';

export const Menu = () => {
    const { socketData, online } = useSocketStore();

    if (!online) {
        return <Loading />;
    }

    if (!socketData) {
        return (
            <MenuSkeleton />
        );
    }

    return <MainDrawer />;
};