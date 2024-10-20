import { IPost } from "../types/posts";
import { IUserProfile } from "../types/user";

export type BottomTabsParams = {
  HomeStack: undefined;
  MeetingStack: undefined;
  Setting: undefined;
  Notification: undefined;
  DocumentStack: undefined;
  HistoryStack: undefined;
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPInput: {
    target: "FillProfile" | "ResetPassword";
  };
  ResetPassword: undefined;
};

export type HomeStackParams = {
  Home: undefined;
  PostDetail: { post: IPost };
  WritePost: undefined;
  History: undefined;
};

export type MeetingStackParams = {
  MeetingSchedule: undefined;
  OurDoctors: undefined;
  DoctorProfile: {
    doctor: IUserProfile;
  };
  Booking: undefined;
  BookingForm: {
    doctor: IUserProfile;
  };
};

export type HistoryStackParams = {
  History: undefined;
  PostDetail: { post: IPost };
};

export type DocumentStackParams = {
  Document: undefined;
  PDFViewer: { url: string };
};

export type RootStackParams = {
  Auth: undefined;
  TabNav: undefined;
  FillProfile:
    | {
        phone: string;
        password: string;
      }
    | undefined;
  ChangePassword: undefined;
  ResponseForUs: undefined;
};
