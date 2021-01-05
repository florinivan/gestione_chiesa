import { Logger } from 'commons/utils/Logger';

function logTrackingError(type: 'view' | 'link', error: unknown) {
  Logger.error('utag', type, error);
}

function logTrackingSuccess(type: 'view' | 'link', eventPayload: Record<string, unknown>) {
  Logger.log('utag', type, eventPayload);
}

/**
 * Tracks interaction events:
 * clicks, swipes, form submission etc...
 * @param eventPayload
 */
export function utagLink(eventPayload: Record<string, unknown>) {
  try {
    window.utag.link({ ...eventPayload });
    logTrackingSuccess('link', eventPayload);
  } catch (e) {
    logTrackingError('link', e);
  }
}

/**
 * Tracks view events.
 * @param eventPayload
 */
export const utagView = (eventPayload: Record<string, unknown>) => {
  try {
    window.utag.view({ ...eventPayload });
    logTrackingSuccess('view', eventPayload);
  } catch (e) {
    logTrackingError('view', e);
  }
};
