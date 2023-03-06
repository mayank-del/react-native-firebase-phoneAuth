import { View, Text,TouchableOpacity,TextInput,StyleSheet,Alert } from 'react-native';
import React, { useState , useRef } from 'react';
import { FirebaseRecaptchaVerifierModal ,FirebaseAuthApplicationVerifier} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat';

const Otp = () => {
  const [phoneNumber,setPhoneNumber]=useState("");
  const[code,setCode]=useState("")
  const [verificationId,setVerificationId]=useState(null)
  const recaptchaVerifier=useRef(null)

  const sendVerification=()=>{
    const phoneProvider=new firebase.auth.PhoneAuthProvider();

    phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
    .then(setVerificationId)
    setPhoneNumber('');
  };
  const confirmCode=()=>{
    const credential=firebase.auth.PhoneAuthProvider.credential(
        verificationId,code
    );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
        setCode('');
    })
    .catch((e)=>{
        alert(e)
    })
    Alert.alert('Login Successful. Welcome.',);
}
 return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                />
                <Text style={styles.otpText}>
                    Login using OTP
                </Text>
                <TextInput
                    placeholder='Phone number with country code.'
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                    autoComplete='tel'
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.sendVerification} onPress={sendVerification}>
                        Send Verification
                    </Text>
                </TouchableOpacity>
                <TextInput
                    placeholder='Confirmation Code'
                    onChangeText={setCode}
                    keyboardType='number-pad'
                    
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={confirmCode}>
                    <Text style={styles.buttonText} >
                        Confirm Verification
                    </Text>
                </TouchableOpacity>
        </View>
    )
  }


export default Otp

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000",
        alignItems:"center",
        justifyContent:"center"
    },
    textInput:{
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomColor:"#fff",
        borderRightColor:"#fff",
        borderBottomWidth:2,
        marginBottom:20,
        textAlign:"center",
        color:'#fff'
    },
    sendVerification:{
        padding:20,
        backgroundColor:"#3498db",
        borderRadius:10,

    },
    sendCode:{
        padding:20,
        backgroundColor:"#9b59b6",
        borderRadius:10,
    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold'
    },
    otpText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#fff",
        margin:20
    }
})