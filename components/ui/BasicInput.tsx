import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const msgRef = useRef(null);

  const onSend = () => {
    if (!name || !email || !message) {
      Alert.alert("Please fill out all fields.");
      return;
    }
    // send logic here
    Alert.alert("Thanks!", "Your message was sent.");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={() => (msgRef as any)?.current?.focus?.()}
        style={styles.input}
      />

      <View style={{ height: 14 }} />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ height: 14 }} />

      <TextInput
        ref={msgRef}
        placeholder="Message"
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
      />

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.cta} onPress={onSend} activeOpacity={0.8}>
        <Text style={styles.ctaText}>SEND MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cta: {
    height: 50,
    backgroundColor: "#7C83FF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  input: {
    
  }
});
