import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginUser, clearError } from '../../store/slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <View className="flex-1 p-6 justify-center bg-background">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-primary mb-2">Timeforge</Text>
        <Text className="text-gray-600 text-center">Manage your tasks effortlessly</Text>
      </View>
      
      <View className="mb-6">
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon={() => <Mail size={20} />} />}
          autoCapitalize="none"
          keyboardType="email-address"
          error={!!errors.email}
          className="mb-1"
        />
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}
      </View>
      
      <View className="mb-6">
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          left={<TextInput.Icon icon={() => <Lock size={20} />} />}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          error={!!errors.password}
          className="mb-1"
        />
        {errors.password && <HelperText type="error">{errors.password}</HelperText>}
      </View>
      
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={isLoading}
        disabled={isLoading}
        className="py-1 rounded-lg"
      >
        Login
      </Button>
      
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text className="text-primary font-bold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen; 