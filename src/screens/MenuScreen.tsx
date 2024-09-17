import { Loading } from '../components/loading/Loading';
import { useSocketStore } from '../store/useSocketStore';
import { MainDrawer } from '../views/menuView/MainDrawer';

export const Menu = () => {
    const { socketData, online } = useSocketStore();

    if (!online) {
        return <Loading />;
    }

    if (!socketData) {
        return (
            <div className="bg-gray-900 min-h-screen">
                {/* AppBar Skeleton */}
                <div className="h-16 bg-gray-800 animate-pulse"></div>

                <div className="flex">
                    {/* Drawer Skeleton */}
                    <div className="w-60 h-screen bg-gray-800 animate-pulse hidden lg:block">
                        <div className="h-16 bg-gray-700 mb-4"></div>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="h-10 bg-gray-700 mb-2 mx-4 rounded"></div>
                        ))}
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-gray-800 h-48 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <MainDrawer />;
};