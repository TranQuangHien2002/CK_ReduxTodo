// src/screens/Home.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,FlatList} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/actions';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(clearUser());
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {user ? user.name : 'Guest'}!</Text>
            <Text>Todo List:</Text>
            {user && user.todos && user.todos.length > 0 ? (
                <FlatList
                    data={user.todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Text>Hoàn thành: {item.complete ? 'Có' : 'Không'}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text>No todos available.</Text>
            )}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                <Text style={styles.loginButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loginButton: {
        backgroundColor: '#1877f2',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Home;
