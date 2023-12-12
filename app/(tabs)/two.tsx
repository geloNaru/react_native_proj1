import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, View, Text } from '../../components/Themed';
import React,{ useState, SetStateAction, useEffect } from 'react';
import { TextInput, Modal} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Add this line
import { RadioButton, IconButton } from 'react-native-paper'; 
import { useFonts } from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function TabTwoScreen() { 
  const [fontsLoaded] = useFonts({
    BakbakOne: require("../../assets/fonts/BakbakOne.ttf"),
    Raleway: require("../../assets/fonts/Raleway.ttf"),
    RalewayItalic: require("../../assets/fonts/Raleway_Italic.ttf"),
    RalewayItalicSemibold: require("../../assets/fonts/Raleway_Italic_SemiBold.ttf"),
    RalewaySemibold: require("../../assets/fonts/Raleway_SemiBold.ttf")
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bloodType, setBloodType] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
  {label: 'A', value: 'A'},
  {label: 'B', value: 'B'},
  {label: 'AB', value: 'AB'},
  {label: 'O', value: 'O'}
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const postData = async () => {
    const response = await fetch(`https://lifeline-423a7-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        middleName,
        dob,
        gender,
        bloodType
      })
    });
  
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };
  
  const fetchData = async () => {
    const response = await fetch(`https://lifeline-423a7-default-rtdb.asia-southeast1.firebasedatabase.app/users/u1.json`);
  
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log(data);
      setFetchedData(data); 
    }
    setModalVisible(true);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => { // Update the type of 'event' parameter
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };
  

    

    
 

  return (
    <View style={styles.container}>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Data fetched successfully!</Text>
      {fetchedData && (
        <>
          <Text>Blood Type: {fetchedData?.bloodtype}</Text>
          <Text>Date of Birth: {fetchedData?.dob}</Text>
          <Text>First Name: {fetchedData?.firstName}</Text>
          <Text>Gender: {fetchedData?.gender}</Text>
          <Text>Last Name: {fetchedData?.lastName}</Text>
          <Text>Middle Name: {fetchedData?.middleName}</Text>
        </>
      )}
      <Button
        title="Hide Modal"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  </View>
</Modal>

      <Text style={styles.title}>Register an <Text style={{color: 'red'}}>Account</Text></Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Middle Name</Text>
        <TextInput style={styles.input} placeholder="Middle Name" onChangeText={setMiddleName}/>
      </View>

{/* 
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}> Username</Text>
        <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername}/>
      </View> */}

  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}> Date of Birth: </Text>
    <View style={{flexDirection: "row"}}>
    <IconButton 
        icon="calendar" 
        size={20} 
        onPress={() => setShowDatePicker(true)} 
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{flex: 1}}>
        <TextInput 
          style={styles.input} 
          placeholder="Date of Birth" 
          value={dob.toISOString().substring(0,10)} 
          editable={false} // Make the TextInput not editable
          pointerEvents="none" // Add this line
        />
      </TouchableOpacity> 
  </View>
  {showDatePicker && (
    <DateTimePicker 
      value={dob} 
      onChange={onDateChange} 
      mode="date" // Ensure only date is picked
      display="default" // Use the default display mode
    />
  )}
  </View>

    <View style={{flexDirection: 'column'}}>
        <RadioButton.Group  onValueChange={setGender} value={gender}>
          <RadioButton.Item label='Male' value='male' />
          <RadioButton.Item label='Female' value='female' />
        </RadioButton.Group>
    </View> 
   
   <DropDownPicker
  items={items}
  open={open}
  value={value}
  setOpen={setOpen}
  setValue={setValue}
  onChangeValue={value => {
    setBloodType(value || '');
  }}
  containerStyle={{height: 40}}
  style={{backgroundColor: '#fafafa'}}
  labelStyle={{fontSize: 14, color: 'black', justifyContent: 'flex-start'}}
  dropDownContainerStyle={{backgroundColor: '#fafafa'}}
/>


    <Button title="Sign up" onPress={fetchData}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }, 
  inputContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '80%',
  },
  inputLabel: {
    fontSize: 20,
    fontFamily: 'RalewayItalicSemibold',
    fontWeight: 'normal',
    alignItems: 'flex-start',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontFamily: 'RalewaySemibold',
    fontWeight: 'bold',
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
