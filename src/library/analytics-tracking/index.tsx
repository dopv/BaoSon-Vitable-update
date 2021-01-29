import * as Analytics from 'expo-firebase-analytics';

export const tracking = async (event: string, name: string, screen: string, purpose?: string) => {
    await Analytics.logEvent(event, {
        name,
        screen,
        purpose
    });
}

export const trackingCurrentScreen = async (name: string) => {
    await Analytics.setCurrentScreen(name);
}