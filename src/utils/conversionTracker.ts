export interface ConversionStats {
  impressions: number;
  consultationImpressions: number;
  sampleImpressions: number;
  conversions: number;
  consultationConversions: number;
  sampleConversions: number;
}

const DEFAULT_STATS: ConversionStats = {
  impressions: 0,
  consultationImpressions: 0,
  sampleImpressions: 0,
  conversions: 0,
  consultationConversions: 0,
  sampleConversions: 0
};

const STATS_KEY = "frontend_audit_conversion_stats";
const EVENT_NAME = "frontend_audit_conversion_update";

// Helper to safely load stats
export function getStats(): ConversionStats {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) {
      return { ...DEFAULT_STATS };
    }
    return { ...DEFAULT_STATS, ...JSON.parse(data) };
  } catch (e) {
    console.error("Failed to load conversion stats:", e);
    return { ...DEFAULT_STATS };
  }
}

// Helper to save stats
export function saveStats(stats: ConversionStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    // Dispatch custom event to notify any mounted visualizers
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: stats }));
  } catch (e) {
    console.error("Failed to save conversion stats:", e);
  }
}

// Track a modal view impression
export function trackImpression(type: "consultation" | "sample_audit"): void {
  const current = getStats();
  current.impressions += 1;
  if (type === "consultation") {
    current.consultationImpressions += 1;
  } else {
    current.sampleImpressions += 1;
  }
  saveStats(current);
}

// Track a successful form submission
export function trackConversion(type: "consultation" | "sample_audit"): void {
  const current = getStats();
  current.conversions += 1;
  if (type === "consultation") {
    current.consultationConversions += 1;
  } else {
    current.sampleConversions += 1;
  }
  saveStats(current);
}

// Reset all statistics
export function resetStats(): void {
  saveStats({ ...DEFAULT_STATS });
}

// Subscribe to real-time stats updates
export function subscribeToStats(callback: (stats: ConversionStats) => void): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<ConversionStats>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };
  
  window.addEventListener(EVENT_NAME, handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
  };
}
