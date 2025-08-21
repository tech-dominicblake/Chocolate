import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from './ActionButton';

export default function ButtonContainer() {
    const handleLetsGetMessy = () => {
        // Handle "LET'S GET MESSY" button press
        console.log('LET\'S GET MESSY pressed');
    };

    const handleNahIBail = () => {
        // Handle "NAH, I BAIL" button press
        console.log('NAH, I BAIL pressed');
    };

    return (
        <View style={styles.container}>
            <ActionButton 
                title="LET'S GET MESSY" 
                onPress={handleLetsGetMessy}
                variant="primary"
                backgroundImage={require('@/assets/images/btn-bg1.png')}
            />
            <ActionButton 
                title="NAH, I BAIL" 
                onPress={handleNahIBail}
                variant="secondary"
                backgroundImage={require('@/assets/images/btn-bg2.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
});
