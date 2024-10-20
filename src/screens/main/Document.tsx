import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Button, Center, Heading, Icon, Image } from "native-base";
import { images } from "../../constants";
import appTheme from "../../theme";
import { useNavigation } from "@react-navigation/native";

type Document = {
  title: string;
  image: string;
  pdfUrl: string;
};

const DocumentCard = ({ item }: { item: Document }) => {
  const navigation = useNavigation<any>();
  return (
    <Box style={styles.box}>
      <TouchableOpacity onPress={() => navigation.navigate('PDFViewer', { url: item.pdfUrl })} style={{ width: "100%" }}>
        <Image
          source={item.image || images.doc1 } 
          alt={item.title}
          style={styles.image}
        />
        <Heading style={styles.text}>
          {item.title}
        </Heading>
      </TouchableOpacity>
    </Box>
  );
};

const Document = () => {
  const [data, setData] = useState<Document[]>([
    {
      title: "Allys Terminology Guide",
      image: images.doc1,
      pdfUrl: "https://drive.google.com/file/d/11JmKMm7cutuD6wk8pPL5oiuUPXymyDJ6/view?usp=drive_link"
    },
    {
      title: "Coming Out Handbook",
      image: images.doc2,
      pdfUrl: "https://drive.google.com/file/d/1Z_HZpbzOZw4Dob0kbBSZ1ag3f8gPMfMe/view?usp=drive_link"
    },
    {
      title: "Factors Influencing Youth Mental Health",
      image: images.doc3,
      pdfUrl: "https://drive.google.com/file/d/1wanDaB8zN9vFLUrS-jwoVj8BH4Pda_3l/view?usp=drive_link"
    },
    {
      title: "Human Rights of LGBT Persons",
      image: images.doc4,
      pdfUrl: "https://drive.google.com/file/d/1FUF6DJBx05ggT9f8vxDuxLZXGE9nAAUW/view?usp=drive_link"
    },
    {
      title: "Mental Health and Environment",
      image: images.doc5,
      pdfUrl: "https://drive.google.com/file/d/1diYky9xoS0hmGXMlYTtBlikHnXeMWss5/view?usp=drive_link"
    },
    {
      title: "Mental Health Leg",
      image: images.doc6,
      pdfUrl: "https://drive.google.com/file/d/1u22b_8y6V1nstrnWqszSC0GK-shJirwG/view?usp=drive_link"
    },
    {
      title: "Mental Health Policy Brief",
      image: images.doc7,
      pdfUrl: "https://drive.google.com/file/d/1p00Xxk9KyQkp9Xeu7u4QTgQA3JiXB692/view?usp=drive_link"
    },
    {
      title: "Mental Health Toolkit 1",
      image: images.doc8,
      pdfUrl: "https://drive.google.com/file/d/1-rd1xPYhferoMQ7unvQ6j2YAkmRMipJd/view?usp=drive_link"
    },
    {
      title: "Mental Health Toolkit 2",
      image: images.doc9,
      pdfUrl: "https://drive.google.com/file/d/1e0TAUwyt57o5vRrvYvx0j5N3RqFODLJW/view?usp=drive_link"
    },
    {
      title: "Mental Health Toolkit 3",
      image: images.doc10,
      pdfUrl: "https://drive.google.com/file/d/1Z-XM1SY0cgdlDHtZgPOFtoLdb4NnG0vW/view?usp=drive_link"
    },
    {
      title: "On Suicide",
      image: images.doc11,
      pdfUrl: "https://drive.google.com/file/d/1dGdwfJ_b1OSXxLrtM2dRtSAL6ushue2P/view?usp=drive_link"
    }
  ]);
  return (
    <Center flex="1" bg="coolGray.700">
      <FlatList
        data={data}
        renderItem={({ item }) => <DocumentCard item={item} />}
      />
    </Center>
  );
};

export default Document;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  box: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    marginBottom: 40,
    backgroundColor: appTheme.colors.coolGray[600],
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});
