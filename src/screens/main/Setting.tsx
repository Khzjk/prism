import { Alert, Linking, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Center, Column, Heading, Icon, IconButton } from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeUser, setUser } from "../../store/user.reducer";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingButton from "../../components/SettingButton";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParams, RootStackParams } from "../../navigations/config";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { uploadImage } from "../../utils/image";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

// TODO: Fix Type of Props
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParams, "Setting">,
  StackScreenProps<RootStackParams>
>;

const Setting = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(user?.avatarUrl || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.canceled) {
      try {
        const imageUri = result.assets[0].uri;
        dispatch(setLoading());
        const { imageName, imageUrl } = await uploadImage(imageUri);
        if (user?.avatarName) {
          await deleteObject(ref(firebaseStorage, user.avatarName));
        }
        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          avatarUrl: imageUrl,
          avatarName: imageName,
        });
        dispatch(setUser({ ...user!, avatarUrl: imageUrl, avatarName: imageName }));
        setImage(imageUrl);
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
  };

  if (isLoading)
    return (
      <Column flex="1" bg="coolGray.700">
        <LoadingOverlay />
      </Column>
    );
    const handleEmailPress = () => {
      Linking.openURL("mailto:hotlinengaymai@gmail.com");
    };
  
    const handlePhonePress = () => {
      Linking.openURL("tel:0963061414");
    };
  
    const handleMapPress = () => {
      // Replace with the actual map URL or coordinate
      Linking.openURL("https://www.google.com/maps/place/Hà+Nội,+Việt+Nam");
    };
  return (
    <>
      <Column flex="1" bg="coolGray.700" px="5">
        <Center mt="8">
          <Column rounded="full">
            {image ? (
              <Avatar size="xl" source={{ uri: image }} />
            ) : (
              <Center bg="white" rounded="full" w="24" h="24">
                <Ionicons name="person-outline" color="gray" size={32} />
              </Center>
            )}
            <IconButton
              _pressed={{ bg: "coolGray.300" }}
              position="absolute"
              variant="solid"
              bg="white"
              w="6"
              h="6"
              rounded="full"
              bottom={0}
              right={0}
              icon={<Icon size="sm" as={Ionicons} name="camera-outline" color="red" />}
              onPress={pickImage}
            />
          </Column>
          <Heading color="white" mt="4">
            {user?.fullname}
          </Heading>
        </Center>
        <Column flex="1" space="6" mt="16">
          <SettingButton
            onPress={() => navigation.navigate("FillProfile")}
            leftIconName="person-outline"
          >
            Sửa thông tin
          </SettingButton>
          <SettingButton
            onPress={() => navigation.navigate("ChangePassword")}
            leftIconName="lock-open"
          >
            Mật khẩu
          </SettingButton>
          <SettingButton
            leftIconName="chatbox-outline"
            onPress={() => navigation.navigate("ResponseForUs")}
          >
            Trợ giúp & phản hồi
          </SettingButton>
          <SettingButton
            leftIconName="mail-outline"
            onPress={handleEmailPress}
          >
            Email: hotlinengaymai@gmail.com
          </SettingButton>
          <SettingButton
            leftIconName="call-outline"
            onPress={handlePhonePress}
          >
            Hotline: 096 306 1414
          </SettingButton>
          <SettingButton
            leftIconName="location-outline"
            onPress={handleMapPress}
          >
            Địa chỉ: Hà Nội, Việt Nam
          </SettingButton>
        </Column>
        <Button
          shadow={5}
          mb="6"
          leftIcon={<Icon as={Ionicons} name="exit-outline" color="coolGray.800" />}
          _text={{ color: "coolGray.800", py: "0.5", fontWeight: "medium" }}
          onPress={() => {
            dispatch(removeUser());
          }}
          rounded="full"
        >
          Đăng xuất
        </Button>
      </Column>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({});
