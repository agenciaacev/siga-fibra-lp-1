export function trackButton(buttonId: string, label: string) {
  fetch('http://143.95.214.125:3002/api/track/click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      button:   buttonId,
      label:    label,
      source:   sessionStorage.getItem('sf_source')   || 'direct',
      medium:   sessionStorage.getItem('sf_medium')   || '',
      campaign: sessionStorage.getItem('sf_campaign') || '',
      page:     window.location.pathname,
    }),
  }).catch(() => {})
}
