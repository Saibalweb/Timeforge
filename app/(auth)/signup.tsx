import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { signupUser, clearError } from '../../store/slices/authSlice';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Signup Failed', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      dispatch(signupUser({ name, email, password }));
    }
  };

  return (
    <View className="flex-1 p-6 justify-center bg-background">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-primary mb-2">Create Account</Text>
        <Text className="text-gray-600 text-center">Join Timeforge to manage your tasks</Text>
      </View>
      
      <View className="mb-4">
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          left={<TextInput.Icon icon={() => <User size={20} />} />}
          error={!!errors.name}
          className="mb-1"
        />
        {errors.name && <HelperText type="error">{errors.name}</HelperText>}
      </View>
      
      <View className="mb-4 justify-center">
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon={() => <Mail size={20} color={'#03DAC6'} />} />}
          autoCapitalize="none"
          keyboardType="email-address"
          error={!!errors.email}
          className="mb-1"
        />
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}
      </View>
      
      <View className="mb-4">
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
      
      <View className="mb-6">
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          left={<TextInput.Icon icon={() => <Lock size={20} />} />}
          error={!!errors.confirmPassword}
          className="mb-1"
        />
        {errors.confirmPassword && <HelperText type="error">{errors.confirmPassword}</HelperText>}
      </View>
      
      <Button
        mode="contained"
        onPress={handleSignup}
        loading={isLoading}
        disabled={isLoading}
        className="py-1 rounded-lg"
      >
        Sign Up
      </Button>
      
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-600 text-xl">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-primary font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen; 