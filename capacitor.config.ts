import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.next.app",
  appName: "next-capacitor-poc",
  webDir: "out",
  server: {
    url: "http://10.0.11.150:3000",
    cleartext: true,
  },
};

export default config;
