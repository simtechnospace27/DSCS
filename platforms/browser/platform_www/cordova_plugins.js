cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-otp-auto-verification/www/OTPAutoVerification.js",
        "id": "cordova-plugin-otp-auto-verification.OTPAutoVerification",
        "pluginId": "cordova-plugin-otp-auto-verification",
        "clobbers": [
            "OTPAutoVerification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-sms/www/SMS.js",
        "id": "cordova-plugin-sms.SMS",
        "pluginId": "cordova-plugin-sms",
        "clobbers": [
            "window.SMS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-otp-auto-verification": "1.0.2",
    "cordova-plugin-sms": "1.0.5"
}
// BOTTOM OF METADATA
});