import { Box, Skeleton, Typography } from '@mui/material';

export const MenuSkeleton = () => {
    return (
        <div className="min-h-screen">
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <div
                style={{ paddingTop: '80px', width: '100%', height: '60vh' }}
            >
                <Typography variant='h1' sx={{ mx: 3 }}> <Skeleton /></Typography>
                <Typography variant='h5' sx={{ mx: 3 }}> <Skeleton /></Typography>
                <Typography variant='h5' sx={{ mx: 3 }}> <Skeleton /></Typography>
            </div>
            <Skeleton
                sx={{ marginTop: '10px', display: 'flex' }}
                variant="rectangular" width={'100%'} height={'40vh'}
            >
            </Skeleton>
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <div className='flex items-center justify-center mt-14' key={index}>
                        <Box sx={{ width: '90%', height: 150, position: 'relative', bgcolor: 'grey.200', borderRadius: 2 }}>
                            {/* Círculo dividido en la parte superior */}
                            <Box sx={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)' }}>
                                <Box sx={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden' }}>
                                    <Skeleton variant="circular" width={100} height={100} sx={{ bgcolor: 'grey.300' }} />
                                    <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', bgcolor: 'grey.400' }} />
                                </Box>
                            </Box>

                            {/* Contenido del rectángulo */}
                            <Box sx={{ pt: 4, px: 2 }}>
                                <Skeleton variant="text" sx={{ fontSize: '2rem', mb: 1 }} /> {/* Título */}
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> {/* Subtítulo */}
                            </Box>
                        </Box>
                    </div>
                ))
            }
            <Skeleton
                sx={{ marginTop: '10px', display: 'flex' }}
                variant="rectangular" width={'100%'} height={'30vh'}
            >
            </Skeleton>
        </div>
    );
};
