const API_URL = 'http://143.95.214.125:3002'

interface TrackSource {
  source: string
  medium: string
  campaign: string
}

function detectSource(): TrackSource {
  const p = new URLSearchParams(window.location.search)

  if (p.get('gclid') || p.get('gbraid') || p.get('gad_source')) {
    return {
      source: 'google_ads',
      medium: p.get('utm_medium') || 'cpc',
      campaign: p.get('utm_campaign') || p.get('gad_campaignid') || '',
    }
  }

  if (p.get('fbclid')) {
    return { source: 'meta_ads', medium: 'cpc', campaign: p.get('utm_campaign') || '' }
  }

  if (p.get('ttclid')) {
    return { source: 'tiktok_ads', medium: 'cpc', campaign: p.get('utm_campaign') || '' }
  }

  if (p.get('utm_source')) {
    const s = p.get('utm_source')!.toLowerCase()
    const source =
      s.includes('google') ? 'google_ads' :
      s.includes('facebook') || s.includes('instagram') || s.includes('meta') ? 'meta_ads' :
      s.includes('tiktok') ? 'tiktok_ads' :
      s.includes('twitter') || s.includes('linkedin') ? 'social' : 'other'
    return { source, medium: p.get('utm_medium') || '', campaign: p.get('utm_campaign') || '' }
  }

  const ref = document.referrer.toLowerCase()
  if (ref.includes('google.'))                                  return { source: 'organic',    medium: 'organic', campaign: '' }
  if (ref.includes('facebook.') || ref.includes('instagram.')) return { source: 'meta_ads',   medium: 'social',  campaign: '' }
  if (ref.includes('tiktok.'))                                  return { source: 'tiktok_ads', medium: 'social',  campaign: '' }
  if (ref.includes('youtube.') || ref.includes('linkedin.'))   return { source: 'social',     medium: 'social',  campaign: '' }

  return { source: 'direct', medium: 'direct', campaign: '' }
}

export function trackPageView() {
  const { source, medium, campaign } = detectSource()

  fetch(`${API_URL}/api/track/access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source,
      medium,
      campaign,
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    }),
  }).catch(() => {})
}

export function trackClick(button: string, label: string) {
  const { source, medium, campaign } = detectSource()

  fetch(`${API_URL}/api/track/click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      button,
      label,
      source,
      medium,
      campaign,
      page: window.location.pathname,
    }),
  }).catch(() => {})
}
