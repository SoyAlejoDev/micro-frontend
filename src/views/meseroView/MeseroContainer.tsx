import { Container, Divider, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocketStore } from '../../store/useSocketStore';
import { Orden } from '../../types';
import { OrdenCard } from '../../components/orden/OrdenCard';
import { RenderContent } from './RenderContent';
import { FabSaveOrBack } from '../../ui/FabSaveOrBack';


export const MeseroContainer = () => {

  const [selectedMenu, setSelectedMenu] = useState<string>("Entrantes");
  const [orderTable, setorderTable] = useState<Orden>();
  const navigate = useNavigate();
  const { online, ordersByTable, socketData } = useSocketStore();
  const { pathname } = useLocation();


  const tableId = pathname.split('/').slice(2).join('/');


  const seccionesMenu = socketData?.new_data_menu?.map(item => item.nombre) ?? [];

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    const existeMesa = socketData?.mesas.some(mesa => mesa.id === Number(tableId));
    if (!existeMesa) {
      navigate(`/mesa`);
    }
  }, []);

  useEffect(() => {
    if (online) {
      const orders = ordersByTable[Number(tableId)];
      if (orders) {
        setorderTable({ mesa: Number(tableId), orders });
        console.log(orderTable);
      }
    }

  }, [pathname, ordersByTable]);


  return (
    <Container >
      {
        !online ? (<p>Loading...</p>) : (
          <div className="flex gap-3 py-5 flex-wrap justify-around">
            {
              seccionesMenu.map((item, index) => (
                <Paper
                  elevation={3}
                  key={index}
                  className='w-[120px] p-2 flex justify-center'
                  onClick={() => handleMenuClick(item)}
                  style={{ backgroundColor: item === selectedMenu ? '#1976d2' : 'transparent' }}
                >
                  <Typography variant='body2'
                    style={{
                      color: item === selectedMenu ? 'white' : 'black',
                    }}
                  >{item}</Typography>

                </Paper>
              ))
            }
          </div>
        )
      }
      <Divider />

      <div className='w-full py-3 max-h-[70vh] overflow-auto'>
        <RenderContent
          seccion={selectedMenu}
          selectedMenu={selectedMenu}
          tableId={tableId}
        />


      </div>

      <div className='  w-full overflow-auto pb-20'>
        {
          orderTable?.mesa && Object.keys(ordersByTable).length !== 0 ? (
            <OrdenCard
              orden={orderTable}
              ordersByTable={ordersByTable}
              tableId={tableId}
            />
          )
            : (
              <Typography variant='h6'>No hay orden creada</Typography>
            )
        }
      </div>
      <FabSaveOrBack
        orderTable={orderTable}
      />
    </Container>

  );
};
