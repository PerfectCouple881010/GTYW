cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-appinfo/www/appinfo.js",
        "id": "cordova-plugin-appinfo.AppInfo",
        "pluginId": "cordova-plugin-appinfo",
        "merges": [
            "navigator.appInfo"
        ]
    },
    {
        "file": "plugins/cn.jpush.phonegap.JPushPlugin/www/JPushPlugin.js",
        "id": "cn.jpush.phonegap.JPushPlugin.JPushPlugin",
        "pluginId": "cn.jpush.phonegap.JPushPlugin",
        "clobbers": [
            "jPushPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-appinfo": "2.0.2",
    "cn.jpush.phonegap.JPushPlugin": "2.0.2"
}
// BOTTOM OF METADATA
});