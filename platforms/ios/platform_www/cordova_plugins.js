cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-otp-auto-verification.OTPAutoVerification",
      "file": "plugins/cordova-plugin-otp-auto-verification/www/OTPAutoVerification.js",
      "pluginId": "cordova-plugin-otp-auto-verification",
      "clobbers": [
        "OTPAutoVerification"
      ]
    },
    {
      "id": "cordova-plugin-sms.SMS",
      "file": "plugins/cordova-plugin-sms/www/SMS.js",
      "pluginId": "cordova-plugin-sms",
      "clobbers": [
        "window.SMS"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-otp-auto-verification": "1.0.2",
    "cordova-plugin-sms": "1.0.5"
  };
});