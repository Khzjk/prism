import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { PropsWithChildren } from "react";
import { Center, Column, Heading, Image, Stack } from "native-base";
import { StatusBar } from "expo-status-bar";

type Props = {} & PropsWithChildren;

const AuthBg = ({ children }: Props) => {
  const avtRatio = 73 / 51.37;
  const avtH = 64;
  const avtW = avtH * avtRatio;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack bg="primary.600" flex={1} safeAreaTop>
        <StatusBar backgroundColor="#76CFF1" style="dark" />
        <Center height="20" mb="16">
          <Heading color="white" fontSize="4xl" fontWeight="semibold">
            Prism
          </Heading>
        </Center>
        <Stack bg="coolGray.700" flex="1" roundedTop="3xl" style={styles.shadow}>
          <Center shadow="9" mt={-16} rounded="full" bg="white" w="32" h="32">
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: avtW, height: avtH }}
              alt="App Logo"
            />
          </Center>
          <Column w="100%" px="8" justifyContent="space-between" flex={1} mt="5">
            {children}
          </Column>
        </Stack>
      </Stack>
    </TouchableWithoutFeedback>
  );
};

export default AuthBg;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    elevation: 20,
    alignItems: "center",
  },
});
