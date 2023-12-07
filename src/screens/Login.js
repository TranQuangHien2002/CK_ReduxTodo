// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,  StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

const URL_API = 'https://65637199ee04015769a735e3.mockapi.io/account';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(URL_API);
            const data = await response.json();

            const user = data.find((user) => user.username === username && user.password === password);

            if (user) {
                dispatch(setUser(user));
                navigation.navigate('Home');
            } else {
                alert('Thông tin đăng nhập không hợp lệ');
            }
        } catch (error) {
            alert('Lỗi khi yêu cầu API', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc số điện thoại"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#1877f2',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
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

export default Login;
