App.accessRule('http://app.realtimecrm.co.uk/*');
App.accessRule('http://192.168.251.57:3000/*');
App.accessRule('https://realtimecrm-47612.onmodulus.net/*');
App.accessRule('http://maps.apple.com/*');

App.info({
  name: 'RealTimeCRM',
  description: 'The ultimate business tool',
  version: '0.0.1',
  id: 'uk.co.cambridgesoftware.realtimecrm',
  author: 'Cambridge Software',
  email: 'solutions@cambridgesoftware.co.uk',
  website: 'http://app.realtimecrm.co.uk/'
});

App.icons({
  'iphone_2x': 'resources/icons/res/ic_launcher_xxhdpi.png',
  'iphone_3x': 'resources/icons/res/ic_launcher_xxxhdpi.png',
  'ipad': 'resources/icons/res/ic_launcher_xhdpi.png',
  'ipad_2x': 'resources/icons/res/ic_launcher_xxxhdpi.png',
  'ipad_pro': 'resources/icons/res/ic_launcher_xxxhdpi.png',
  'ios_settings': 'resources/icons/res/ic_launcher_mdpi.png',
  'ios_settings_2x': 'resources/icons/res/ic_launcher_hdpi.png',
  'ios_settings_3x': 'resources/icons/res/ic_launcher_xhdpi.png',
  'ios_spotlight': 'resources/icons/res/ic_launcher_mdpi.png',
  'ios_spotlight_2x': 'resources/icons/res/ic_launcher_xhdpi.png',
  'android_mdpi': 'resources/icons/res/ic_launcher_mdpi.png',
  'android_hdpi': 'resources/icons/res/ic_launcher_hdpi.png',
  'android_xhdpi': 'resources/icons/res/ic_launcher_xhdpi.png',
  'android_xxhdpi': 'resources/icons/res/ic_launcher_xxhdpi.png',
  'android_xxxhdpi': 'resources/icons/res/ic_launcher_xxxhdpi.png'
});

App.launchScreens({
  'iphone_2x': 'resources/splash/xhdpi.png',
  'iphone5': 'resources/splash/xhdpi.png',
  'iphone6': 'resources/splash/xhdpi.png',
  'iphone6p_portrait': 'resources/splash/xxhdpi.png',
  'iphone6p_landscape': 'resources/splash/xxhdpi.png',
  'ipad_portrait': 'resources/splash/xxhdpi.png',
  'ipad_portrait_2x': 'resources/splash/xxhdpi.png',
  'ipad_landscape': 'resources/splash/xxhdpi.png',
  'ipad_landscape_2x': 'resources/splash/xxhdpi.png',
  'android_mdpi_portrait': 'resources/splash/mdpi.png',
  'android_mdpi_landscape': 'resources/splash/mdpi.png',
  'android_hdpi_portrait': 'resources/splash/hdpi.png',
  'android_hdpi_landscape': 'resources/splash/hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/xhdpi.png',
  'android_xhdpi_landscape': 'resources/splash/xhdpi.png',
  'android_xxhdpi_portrait': 'resources/splash/xhdpi.png',
  'android_xxhdpi_landscape': 'resources/splash/xhdpi.png'
});