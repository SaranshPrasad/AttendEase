const crypto = require("crypto");

function generateFingerprint(deviceInfo) {
  const data = `${deviceInfo.userAgent}-${deviceInfo.deviceModel}-${deviceInfo.os}-${deviceInfo.browser}-${deviceInfo.ip}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}
module.exports = generateFingerprint;