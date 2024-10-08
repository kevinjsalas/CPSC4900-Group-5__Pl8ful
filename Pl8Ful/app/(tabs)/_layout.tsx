import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import navBarStyles from '../styleSheets/navBarStyles';

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#EC8677',
                tabBarInactiveTintColor: '#34404D',
                headerShown: false,
                tabBarStyle: navBarStyles.navBar
            }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
                }} />
            <Tabs.Screen 
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }) => <AntDesign name="hearto" size={24} color={color} />
                }} />    
            <Tabs.Screen 
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
                }} />
        </Tabs>
    )
};

export default TabLayout;