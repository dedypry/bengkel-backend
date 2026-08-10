export type ParsedUserAgent = {
  device_label: string;
  platform: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
};

export function parseUserAgent(userAgent?: string | null): ParsedUserAgent {
  const ua = userAgent || '';
  const lower = ua.toLowerCase();

  let platform: ParsedUserAgent['platform'] = 'desktop';
  if (/ipad|tablet/.test(lower)) {
    platform = 'tablet';
  } else if (/mobile|android|iphone|ipod/.test(lower)) {
    platform = 'mobile';
  }

  let browser = 'Browser';
  if (lower.includes('edg/')) browser = 'Edge';
  else if (lower.includes('chrome/')) browser = 'Chrome';
  else if (lower.includes('firefox/')) browser = 'Firefox';
  else if (lower.includes('safari/')) browser = 'Safari';
  else if (lower.includes('opera') || lower.includes('opr/')) browser = 'Opera';

  let os = 'Unknown OS';
  if (lower.includes('windows')) os = 'Windows';
  else if (lower.includes('mac os')) os = 'macOS';
  else if (lower.includes('android')) os = 'Android';
  else if (lower.includes('iphone') || lower.includes('ipad')) os = 'iOS';
  else if (lower.includes('linux')) os = 'Linux';

  return {
    device_label: `${browser} · ${os}`,
    platform,
    browser,
    os,
  };
}
