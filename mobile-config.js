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
    'android_mdpi': 'resources/icons/camsoft.png',
    'android_hdpi': 'resources/icons/camsoft.png',
    'android_xhdpi': 'resources/icons/camsoft.png',
    'android_xxhdpi': 'resources/icons/camsoft.png',
    'android_xxxhdpi': 'resources/icons/camsoft.png'
});

App.launchScreens({
    'android_mdpi_portrait': 'resources/splash/mdpi.png',
    'android_mdpi_landscape': 'resources/splash/mdpi.png',
    'android_hdpi_portrait': 'resources/splash/hdpi.png',
    'android_hdpi_landscape': 'resources/splash/hdpi.png',
    'android_xhdpi_portrait': 'resources/splash/xhdpi.png',
    'android_xhdpi_landscape': 'resources/splash/xhdpi.png',
    'android_xxhdpi_portrait': 'resources/splash/xhdpi.png',
    'android_xxhdpi_landscape': 'resources/splash/xhdpi.png',
});
