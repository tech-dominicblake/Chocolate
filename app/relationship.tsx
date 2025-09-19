import ActionButton from '@/components/prompts/ActionButton';
import { IMAGES } from '@/constants';
import { useAppThemeColor, useThemeToggle } from '@/hooks/useAppTheme';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useGameStore } from '@/state/useGameStore';

const { width: screenWidth } = Dimensions.get('window');

interface RelationshipStage {
    id: number;
    number: string;
    title: string;
    description: string;
    icon: string;
    headerColor: string;
    buttonColor: string;
}

const relationshipStages: RelationshipStage[] = [
    {
        id: 1,
        number: "Nº1",
        title: "Recently Met",
        description: "Dating for less than 3 months — flirty, fresh, still pretending to be normal.",
        icon: "💋",
        headerColor: "#FF6B9D",
        buttonColor: "#8B2756"
    },
    {
        id: 2,
        number: "Nº2",
        title: "Getting Serious",
        description: "Dating or in a relationship for 3 to 12 months — feelings are real, chaos is rising.",
        icon: "🔥",
        headerColor: "#8B5CF6",
        buttonColor: "#33358F"
    },
    {
        id: 3,
        number: "Nº3",
        title: "We Hate Each Other",
        description: "Together for 1+ year — love is strong, patience is thin.",
        icon: "❤️‍🔥",
        headerColor: "#EF4444",
        buttonColor: "#7A1818"
    }
];

export default function RelationshipPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { isDark } = useThemeToggle()
    const { setStage } = useGameStore();

    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / screenWidth);
        setCurrentIndex(index);
    };

    const handleContinue = (): void => {
        // Navigate to next screen or close
        setStage(relationshipStages[currentIndex].id);
        router.push('/endPage');
    };

    const renderStageCard = (stage: RelationshipStage) => (
        <View key={stage.id} style={styles.cardContainer}>
            <View style={styles.card}>
                {/* Header Section */}
                <View style={[styles.cardHeader, { backgroundColor: stage.headerColor }]}>
                    <Text style={styles.stageNumber}>{stage.number}</Text>
                </View>

                {/* Icon Section */}
                <View style={styles.iconContainer}>
                    <Image
                        source={currentIndex === 0 ? IMAGES.IMAGES.image10 :
                            currentIndex === 1 ? IMAGES.IMAGES.image6 :
                                IMAGES.IMAGES.image11}
                        style={styles.stageIcon} />
                </View>

                {/* Content Section */}
                <View style={[styles.cardContent, { backgroundColor: useAppThemeColor('cardBackground') }]}>
                    <Text style={[styles.stageTitle, { color: useAppThemeColor('text') }]}>{stage.title}</Text>
                    <Text style={styles.stageDescription}>{stage.description}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: useAppThemeColor('background') }]}>
            <ScrollView
                style={styles.verticalScrollView}
                contentContainerStyle={styles.verticalScrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Title */}
                <Text style={[styles.headerTitle, { color: useAppThemeColor('primaryText') }]}>Relationship stage</Text>

                {/* Swipable Cards */}
                <View style={styles.cardsContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        // style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {relationshipStages.map(renderStageCard)}
                    </ScrollView>
                </View>

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {relationshipStages.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === currentIndex && {
                                    backgroundColor: relationshipStages[currentIndex].headerColor,
                                    borderColor: relationshipStages[currentIndex].headerColor,
                                    outlineColor: relationshipStages[currentIndex].headerColor,
                                    outlineOffset: 3,
                                    outlineStyle: 'solid',
                                    outlineWidth: 2,
                                }
                            ]}
                        />
                    ))}
                </View>

                {/* Continue Button */}
                <View style={styles.continueButtonContainer}>
                    <ActionButton
                        title="CONTINUE"
                        onPress={handleContinue}
                        variant="primary"
                        backgroundImage={currentIndex === 1 ?
                            IMAGES.IMAGES.buttonBg3 :
                            currentIndex === 0 ?
                                IMAGES.IMAGES.btnBg1 :
                                IMAGES.IMAGES.btnBg3}
                        color={relationshipStages[currentIndex].buttonColor}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFF2',
    },
    verticalScrollView: {
        flex: 1,
    },
    verticalScrollContent: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingBottom: 48,
        flexGrow: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 92,
        marginBottom: 32,
        textAlign: 'center',
    },
    cardsContainer: {
        alignItems: 'center',
        marginBottom: 48,
        // backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    cardContainer: {
        width: screenWidth - 40, // Full width minus padding
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
    },
    cardHeader: {
        height: 171,
        paddingTop: 24,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    stageNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        alignSelf: 'center',
        marginRight: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: 85, // Positioned to be exactly on the border between header and content
        left: '50%',
        marginLeft: -80, // Adjusted for 160px width (160/2 = 80)
        width: 160,
        height: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 80, // Adjusted for 160px width
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 1, // Ensure icon appears above both sections
    },
    continueButtonContainer: {
        marginTop: "auto",
        paddingBottom: 40,
    },
    stageIcon: {
        width: 160,
        height: 160,
    },
    cardContent: {
        paddingTop: 117, // Increased to account for icon overlap
        paddingHorizontal: 30,
        paddingBottom: 84,
        alignItems: 'center',
    },
    stageTitle: {
        fontSize: 25,
        fontWeight: 'semibold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 16,
    },
    stageDescription: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        marginHorizontal: 20,

    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 48,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 6,
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    continueButton: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
