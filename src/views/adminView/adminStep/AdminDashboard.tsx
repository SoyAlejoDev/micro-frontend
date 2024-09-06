import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { CalendarMonth, Today, Web } from '@mui/icons-material';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { AdminStepper } from './AdminStepper';

const { Header, Sider, Content } = Layout;

export const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <div>Content for nav 1</div>;
            case '2':
                return <div>Content for nav 2</div>;
            case '3':
                return <AdminStepper />;
            default:
                return <div>Content</div>;
        }
    };

    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedKey]}
                    onClick={(e) => setSelectedKey(e.key)}
                    items={[
                        {
                            key: '1',
                            icon: <Today style={{ fontSize: '25px' }} />,
                            label: 'Resumen diario',
                        },
                        {
                            key: '2',
                            icon: <CalendarMonth style={{ fontSize: '25px' }} />,
                            label: 'Resumen mensual',
                        },
                        {
                            key: '3',
                            icon: <Web style={{ fontSize: '25px' }} />,
                            label: 'Control web',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};
