import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { ONBOARDING_END } from '../../../../navigation/TypeScreen';
import { size } from '../../../../themes/size';
import { ItemOnBoarding } from './itemOnBoarding';
import { styles } from './styles';

export const OnBoardingScroll = (props: any) => {
    const { navigation, route } = props;
    const {data} = route.params;
    const refDot = useRef<any>(null);
    interface propRender {
        item: any,
        index: number
    };
    const dataBoarding = [
        {
            title: 'Stay on top of your health routine',
            content: 'Track your daily routine. Earn rewards. Support your health. Every day.',
            image: require('../../../../../assets/images/onboarding/image1.png')
        }, {
            title: 'See your progress',
            content: 'Set yourself up for success by tracking your progress. Get a tailored guidance towards your goals.',
            image: require('../../../../../assets/images/onboarding/image2.png')
        }, {
            title: 'Manage your pack',
            content: 'Browse, add and remove products easily. You can also track, delay or pause orders at any time.',
            image: require('../../../../../assets/images/onboarding/image3.png')
        }, {
            title: 'Learn more about your vitamins',
            content: 'Because we know how important it is to know what your vitamins are made of and how they work.',
            image: require('../../../../../assets/images/onboarding/image4.png')
        },
    ]

    const [indexDisplay, setIndexDisplay] = useState(0);

    const onViewRef = React.useRef((viewableItems: any) => {
        const index = viewableItems && viewableItems.viewableItems && viewableItems.viewableItems[0] && viewableItems.viewableItems[0].index
        if (index) {
            if (refDot && refDot.current) {
                refDot.current.scrollToIndex({ animated: true, index: index });
                setIndexDisplay(index)
            }
        } else if (index == 0) {
            setIndexDisplay(0)
        }
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 })

    const onNext = () => {
        navigation && navigation.navigate(ONBOARDING_END, { data: data})
    };

    const renderItem = (props: propRender) => {
        const { item, index } = props
        return (
            <ItemOnBoarding item={item} index={index} />
        )
    };

    const renderItemDot = (props: propRender) => {
        const { item, index } = props
        return (
            <View style={indexDisplay === index ? styles.paggingEnable : styles.paggingDisable} />
        )
    };

    return (
        <View style={styles.vFullscreen}>
            <View style={{ backgroundColor: '#BED0A2', flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            <FlatList
                pagingEnabled
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                showsHorizontalScrollIndicator={false}
                data={dataBoarding}
                renderItem={renderItem}
                horizontal
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={styles.VBottom}>
                <View style={styles.viewPaging}>
                    <FlatList
                        ref={refDot}
                        showsHorizontalScrollIndicator={false}
                        data={dataBoarding}
                        renderItem={renderItemDot}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity
                    style={styles.viewButton}
                    onPress={onNext}>
                    <Text style={styles.textButton}>Next</Text>
                    <Image
                        style={styles.imageButtom}
                        source={require('../../../../../assets/images/onboarding/layer1.png')}
                    >
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}