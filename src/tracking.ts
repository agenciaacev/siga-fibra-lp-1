const API_URL = 'http://143.95.214.125:3002'

function detectSource(): { source: string; medium: string; campaign: string } {
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source') || ''
  const utmMedium = params.get('utm_medium') || ''
  const utmCampaign = params.get('utm_campaign') || ''

  if (utmSource) {
    const source = utmMedium === 'cpc' || utmSource.includes('google')
      ? 'paid'
      : utmSource.includes('instagram') || utmSource.includes('facebook') || utmSource.includes('meta')
        ? 'social'
        : 'other'
    return { source, medium: utmMedium, campaign: utmCampaign }
  }

  const referrer = document.referrer
  if (!referrer) return { source: 'direct', medium: '', campaign: '' }

  if (referrer.includes('google.') || referrer.includes('bing.')) {
    return { source: 'organic', medium: 'organic', campaign: '' }
  }

  if (referrer.includes('instagram.') || referrer.includes('facebook.') || referrer.includes('t.co')) {
    return { source: 'social', medium: 'social', campaign: '' }
  }

  return { source: 'other', medium: 'referral', campaign: '' }
}

export function trackPageView() {
  const { source, medium, campaign } = detectSource()
  fetch(`${API_URL}/api/track/access`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, medium, campaign, page: window.location.pathname, referrer: document.referrer }),
  }).catch(() => {})
}

export function trackClick(button: string, label: string) {
  const { source, medium, campaign } = detectSource()
  fetch(`${API_URL}/api/track/click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ button, label, source, medium, campaign, page: window.location.pathname }),
  }).catch(() => {})
}
