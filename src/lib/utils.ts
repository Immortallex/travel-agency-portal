export const generateFlyPathID = () => {
  const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FP-2026-${segment1}-${segment2}`;
};
