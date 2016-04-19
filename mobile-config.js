App.accessRule('http://app.realtimecrm.co.uk/*');
App.accessRule('http://192.168.251.57:3000/*');
App.accessRule('https://realtimecrm-47612.onmodulus.net/*');

App.info({
    name: 'RealtimeCRM',
    description: 'The ultimate business tool',
    version: '0.0.1',
    id: 'uk.co.cambridgesoftware.realtimecrm',
    author: 'Cambridge Software',
    email: 'solutions@cambridgesoftware.co.uk',
    website: 'http://app.realtimecrm.co.uk/'
});

App.icons({
    'android_mdpi': 'resources/icons/res/ic_launcher_mdpi.png',
    'android_hdpi': 'resources/icons/res/ic_launcher_hdpi.png',
    'android_xhdpi': 'resources/icons/res/ic_launcher_xhdpi.png',
    'android_xxhdpi': 'resources/icons/res/ic_launcher_xxhdpi.png',
    'android_xxxhdpi': 'resources/icons/res/ic_launcher_xxxhdpi.png'
});

App.launchScreens({
    'iphone_2x': 'resources/splash/ios/@2x.png',
    'iphone5': 'resources/splash/ios/568h@2x.png',
    'iphone6': 'resources/splash/ios/667h@2x.png',
    'iphone6p_portrait': 'resources/splash/ios/Portrait-736h@3x.png',
    'iphone6p_landscape': 'resources/splash/ios/Landscape-736h@3x.png',
    'ipad_portrait': 'resources/splash/ios/Portrait.png',
    'ipad_portrait_2x': 'resources/splash/ios/Portrait@2x.png',
    'ipad_landscape': 'resources/splash/ios/Landscape.png',
    'ipad_landscape_2x': 'resources/splash/ios/Landscape@2x.png',
    'android_mdpi_portrait': 'resources/splash/mdpi.png',
    'android_mdpi_landscape': 'resources/splash/mdpi.png',
    'android_hdpi_portrait': 'resources/splash/hdpi.png',
    'android_hdpi_landscape': 'resources/splash/hdpi.png',
    'android_xhdpi_portrait': 'resources/splash/xhdpi.png',
    'android_xhdpi_landscape': 'resources/splash/xhdpi.png',
    'android_xxhdpi_portrait': 'resources/splash/xhdpi.png',
    'android_xxhdpi_landscape': 'resources/splash/xhdpi.png'
});

App.setPreference('ShowSplashScreenSpinner', 'true');
App.setPreference('FadeSplashScreen', 'false');
App.setPreference('SplashScreenDelay', '100');
App.setPreference('StatusBarBackgroundColor', '#173E6F');
App.setPreference('BackgroundColor', '#173E6F');
App.setPreference('SplashMaintainAspectRatio', 'true');
