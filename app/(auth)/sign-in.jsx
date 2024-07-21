import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" w-full justify-center min-h-[85vh] px-4 my-6">
          <Text>SignIn</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
