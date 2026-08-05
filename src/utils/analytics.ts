// Phase 4 Analytics & Event Tracking Engine

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  const payload: AnalyticsEvent = {
    event: eventName,
    properties: properties || {},
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event Tracked]', payload);
  }

  // Client-side window analytics dispatch
  if (typeof window !== 'undefined') {
    try {
      // 1. Console & Custom Event Dispatch
      window.dispatchEvent(new CustomEvent('cacto_analytics', { detail: payload }));

      // 2. LocalStorage Event History Buffer for Retention Analysis
      const history = JSON.parse(localStorage.getItem('cacto_event_history') || '[]');
      history.push(payload);
      if (history.length > 50) history.shift();
      localStorage.setItem('cacto_event_history', JSON.stringify(history));
    } catch (e) {
      // Ignore storage errors in restricted contexts
    }
  }

  return payload;
}

// Pre-defined Phase 4 Product Retention Events
export const AnalyticsEvents = {
  AUTOMATION_CREATED: 'cacto.automation_created',
  AUTOMATION_TRIGGERED: 'cacto.automation_triggered',
  DM_DISPATCHED: 'cacto.dm_dispatched',
  TOOL_ACTION_EXECUTED: 'cacto.tool_action_executed',
  WAITLIST_SUBMITTED: 'cacto.waitlist_submitted',
  CHECKOUT_INITIATED: 'cacto.checkout_initiated',
};
