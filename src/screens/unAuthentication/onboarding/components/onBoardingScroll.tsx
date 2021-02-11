import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { translate } from '../../../../library/utils/i18n/translate';
import { ONBOARDING_END } from '../../../../navigation/TypeScreen';
import { size } from '../../../../themes/size';
import { ItemOnBoarding } from './itemOnBoarding';
import { styles } from './styles';

export const OnBoardingScroll = (props: any) => {
    const { navigation, route } = props;
    const { data } = route.params;
    const refDot = useRef<any>(null);
    const refList = useRef<any>(null);
    const [hourValue, setHourValue] = useState([{ id: 'hour', value: 0 }])
    const hourNumbers = [{ id: 'hour', min: 0, max: 12 }]

    interface propRender {
        item: any,
        index: number
    };
    const dataBoarding = [
        {
            title: translate('UNAUTHENTIC:BOARDING:DATA_TITLE_1'),
            content: translate('UNAUTHENTIC:BOARDING:DATA_CONTENT_1'),
            image: require('../../../../../assets/images/onboarding/image1.png')
        }, {
            title: translate('UNAUTHENTIC:BOARDING:DATA_TITLE_2'),
            content: translate('UNAUTHENTIC:BOARDING:DATA_CONTENT_2'),
            image: require('../../../../../assets/images/onboarding/image2.png')
        }, {
            title: translate('UNAUTHENTIC:BOARDING:DATA_TITLE_3'),
            content: translate('UNAUTHENTIC:BOARDING:DATA_CONTENT_3'),
            image: require('../../../../../assets/images/onboarding/image3.png')
        }, {
            title: translate('UNAUTHENTIC:BOARDING:DATA_TITLE_4'),
            content: translate('UNAUTHENTIC:BOARDING:DATA_CONTENT_4'),
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
        if (indexDisplay < 3) {
            setIndexDisplay(indexDisplay + 1)
            refList && refList.current.scrollToIndex({ animated: true, index: indexDisplay + 1 });
        } else {
            navigation && navigation.navigate(ONBOARDING_END, { data: data })
        }
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
            <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <View style={{ backgroundColor: '#BED0A2', flex: 7.9 }} />
                <View style={{ backgroundColor: '#F2EDE0', flex: 3.1 }} />
            </View>
            <FlatList
                ref={refList}
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
                    <Text style={styles.textButton}>{translate('UNAUTHENTIC:BOARDING:NEXT')}</Text>
                    <Image
                        style={styles.imageButtom}
                        source={require('../../../../../assets/images/onboarding/ic_next.png')}
                    >
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}