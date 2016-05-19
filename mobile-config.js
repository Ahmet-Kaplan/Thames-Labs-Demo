App.accessRule('https://*');

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
  'iphone_2x': 'resources/icons/ios/iphone_2x.png',
  'iphone_3x': 'resources/icons/ios/iphone_3x.png',
  'ipad': 'resources/icons/ios/ipad.png',
  'ipad_2x': 'resources/icons/ios/ipad_2x.png',
  'ipad_pro': 'resources/icons/ios/ipad_pro.png',
  'ios_settings': 'resources/icons/ios/settings.png',
  'ios_settings_3x': 'resources/icons/ios/settings_3x.png',
  'ios_spotlight': 'resources/icons/ios/spotlight.png',
  'ios_spotlight_2x': 'resources/icons/ios/spotlight_2x.png',
  'android_mdpi': 'resources/icons/res/ic_launcher_mdpi.png',
  'android_hdpi': 'resources/icons/res/ic_launcher_hdpi.png',
  'android_xhdpi': 'resources/icons/res/ic_launcher_xhdpi.png',
  'android_xxhdpi': 'resources/icons/res/ic_launcher_xxhdpi.png',
  'android_xxxhdpi': 'resources/icons/res/ic_launcher_xxxhdpi.png'
});

App.launchScreens({
  'iphone_2x': 'resources/splash/ios/iphone_2x.png',
  'iphone5': 'resources/splash/ios/iphone5.png',
  'iphone6': 'resources/splash/ios/iphone6.png',
  'iphone6p_portrait': 'resources/splash/ios/iphone6p_portrait.png',
  'iphone6p_landscape': 'resources/splash/ios/iphone6p_landscape.png',
  'ipad_portrait': 'resources/splash/ios/ipad_portrait.png',
  'ipad_portrait_2x': 'resources/splash/ios/ipad_portrait2x.png',
  'ipad_landscape': 'resources/splash/ios/ipad_landscape.png',
  'ipad_landscape_2x': 'resources/splash/ios/ipad_landscape2x.png',
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