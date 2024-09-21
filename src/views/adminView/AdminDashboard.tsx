import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Equalizer, Logout, MenuBook, Newspaper, Web } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Layout, Menu, theme } from 'antd';
import { useState, useMemo } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { AdminStepper } from './adminStep/AdminStepper';
import { MenuAdmin } from './adminStep/MenuAdmin';
import { ResumenDiario } from './resumenDiario/ResumenDiario';
import { ResumenMensual } from './resumenDiario/ResumenMensual';

const { Header, Sider, Content } = Layout;

export const AdminDashboard = () => {
    const { logoutAdmin } = useAuthStore();

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const currentDate = useMemo(() => new Date(), []);

    const menuItems = [
        {
            key: '1',
            icon: <Equalizer style={{ fontSize: '25px' }} />,
            label: 'Resumen diario',
        },
        {
            key: '2',
            icon: <Newspaper style={{ fontSize: '25px' }} />,
            label: 'Resumen mensual',
        },
        {
            key: '3',
            icon: <Web style={{ fontSize: '25px' }} />,
            label: 'Control web',
        },
        {
            key: '4',
            icon: <MenuBook style={{ fontSize: '25px' }} />,
            label: 'Control Menu',
        },
    ];

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <ResumenDiario />;
            case '2':
                return <ResumenMensual />;
            case '3':
                return <AdminStepper />;
            case '4':
                return <MenuAdmin />;
            default:
                return <div>Content</div>;
        }
    };

    const getHeaderContent = () => {
        const selectedItem = menuItems.find(item => item.key === selectedKey);
        if (!selectedItem) return '';

        if (selectedKey === '1' || selectedKey === '2') {
            const dateString = currentDate.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return `${selectedItem.label} - ${dateString}`;
        }

        return selectedItem.label;
    };

    const logout = () => {
        logoutAdmin();
    };

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedKey]}
                    onClick={(e) => setSelectedKey(e.key)}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f5faff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            startIcon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Typography variant="h4" style={{ marginLeft: 16 }}>
                            {getHeaderContent()}
                        </Typography>
                    </div>
                    <Button
                        onClick={logout}
                        variant='outlined'
                        color='error'
                        sx={{ m: 2 }}
                    >
                        <Logout color='error' />
                    </Button>
                </Header>
                <Content
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                        height: 'calc(100vh - 64px)', // Altura total menos la altura del Header
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};