import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Column, Heading, Text } from "native-base";
import MeetingItem from "../../../components/MeetingList/MeetingItem";
import { StackScreenProps } from "@react-navigation/stack";
import { MeetingStackParams, RootStackParams } from "../../../navigations/config";
import { useAppDispatch } from "../../../store";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { IUserProfile, getDoctors } from "../../../types/user";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = CompositeScreenProps<
  StackScreenProps<MeetingStackParams, "OurDoctors">,
  StackScreenProps<RootStackParams>
>;

const OurDoctors = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [doctors, setDoctors] = useState<IUserProfile[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        dispatch(setLoading());
        const doctorLoaded = await getDoctors();
        setDoctors(doctorLoaded);
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
    loadData();
  }, []);

  return (
    <Column flex="1" bg="coolGray.700" p="4" space="4">
      <Column space="1">
        <Heading color="white" fontSize="xl">
          Đặt lịch hẹn bác sĩ của chúng tôi
        </Heading>
        <Text color="coolGray.400">Hãy lựa chọn chuyên gia bạn tin tưởng</Text>
      </Column>
      {doctors.map((item) => (
        <MeetingItem
          key={item.phone}
          doctorName={item.fullname}
          degree={item.degree!}
          onPress={() => {
            // navigation.navigate("BookingForm", { doctor: item });
            navigation.navigate("DoctorProfile", { doctor: item });
          }}
        />
      ))}
    </Column>
  );
};

export default OurDoctors;

const styles = StyleSheet.create({});
