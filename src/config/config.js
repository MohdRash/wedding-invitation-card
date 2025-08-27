// Nanti convert ke Bahasa Indonesia
import { translate } from '../lib/i18n';

const config = {
  data: {
    title: translate("title"),
    description: translate("description"),
    groomName: translate("groomName"),
    brideName: translate("brideName"),
    parentGroom: translate("parentGroom"),
    parentBride: translate("parentBride"),
    date: "2025-09-28",
    maps_url: "https://maps.app.goo.gl/MAmWNEiLdFKGyNa89",
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.1206788674604!2d76.10703107531226!3d11.104382853058295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6357c6454861b%3A0x7b2334c0c7a68482!2sVK%20PALACE%20AUDITORIUM!5e0!3m2!1sen!2sin!4v1756273047020!5m2!1sen!2sin",
    time: translate("time"),
    location: translate("location"),
    address: translate("address"),
    ogImage: "/images/og-image.jpg",
    favicon: "/images/favicon.ico",
    agenda: [
      {
        title: translate("akadNikahTitle"),
        date: "2025-09-28",
        startTime: "11:00 AM",
        endTime: "03:00 PM",
        location: translate("VK Palace Auditorium"),
        address: translate("address"),
      },
      
    ],
    audio: {
      src: "/audio/fulfilling-humming.mp3", // or /audio/nature-sound.mp3
      title: "Fulfilling Humming", // or Nature Sound
      autoplay: true,
      loop: true,
      toastDuration: 3000
    },
    
  }
};

export default config;
