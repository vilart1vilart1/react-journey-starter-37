
import axios from 'axios';

const API_URL = 'https://www.respizenmedical.com/mylittle/api/track_visitors.php';
const MAX_RETRIES = 2;
const RETRY_DELAY = 40000; // 40 seconds

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface VisitorData {
  page_visitors: string;
  referrer?: string;
  user_location?: {
    country?: string;
    city?: string;
    ip?: string;
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data?: {
    ip: string;
    city: string;
    country: string;
    page: string;
    referrer?: string;
    date: string;
  };
}

/**
 * Gets visitor location information using IP geolocation
 */
const getVisitorLocation = async (): Promise<{ country?: string; city?: string; ip?: string }> => {
  try {
    // Using a free IP geolocation service
    const response = await axios.get('https://ipapi.co/json/', {
      timeout: 3000
    });
    
    return {
      country: response.data.country_name || response.data.country,
      city: response.data.city,
      ip: response.data.ip
    };
  } catch (error) {
    console.warn('Failed to get location data:', error);
    
    // Fallback: try another service
    try {
      const fallbackResponse = await axios.get('https://api.ipify.org?format=json', {
        timeout: 2000
      });
      return {
        ip: fallbackResponse.data.ip
      };
    } catch (fallbackError) {
      console.warn('Failed to get IP from fallback service:', fallbackError);
      return {};
    }
  }
};

/**
 * Gets the referrer source with enhanced detection
 */
const getReferrerSource = (): string => {
  const referrer = document.referrer;
  
  if (!referrer) {
    return 'Direct';
  }

  try {
    const referrerUrl = new URL(referrer);
    const hostname = referrerUrl.hostname.toLowerCase();
    
    // Social media platforms
    if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      return 'Facebook';
    }
    if (hostname.includes('instagram.com')) {
      return 'Instagram';
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'Twitter/X';
    }
    if (hostname.includes('linkedin.com')) {
      return 'LinkedIn';
    }
    if (hostname.includes('tiktok.com')) {
      return 'TikTok';
    }
    if (hostname.includes('youtube.com')) {
      return 'YouTube';
    }
    if (hostname.includes('pinterest.com')) {
      return 'Pinterest';
    }
    if (hostname.includes('lovable.dev')) {
      return 'Lovable';
    }
    
    // Search engines
    if (hostname.includes('google.')) {
      return 'Google Search';
    }
    if (hostname.includes('bing.com')) {
      return 'Bing Search';
    }
    if (hostname.includes('yahoo.com')) {
      return 'Yahoo Search';
    }
    if (hostname.includes('duckduckgo.com')) {
      return 'DuckDuckGo Search';
    }
    
    // Email providers
    if (hostname.includes('gmail.com') || hostname.includes('outlook.com') || hostname.includes('yahoo.com')) {
      return 'Email';
    }
    
    // Return the domain name for other sources
    return hostname;
  } catch (error) {
    console.warn('Error parsing referrer URL:', error);
    return referrer;
  }
};

/**
 * Tracks a page visit by sending data to the tracking API
 * @param pageName Name of the page being visited
 * @param retryCount Current retry attempt (used internally)
 */
export const trackVisitor = async (pageName: string, retryCount = 0): Promise<void> => {
  try {
    console.log(`Tracking visit to: ${pageName}`);
    
    const referrerSource = getReferrerSource();
    
    // Get visitor location information
    const locationData = await getVisitorLocation();
    
    const visitorData: VisitorData = {
      page_visitors: pageName,
      referrer: referrerSource,
      user_location: locationData
    };

    console.log('Sending visitor data:', visitorData);

    const response = await axios.post<ApiResponse>(API_URL, visitorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 8000
    });

    if (response.data.status === 'success') {
      console.log(`Visit tracked successfully: ${pageName} (from: ${referrerSource}, country: ${locationData.country || 'Unknown'})`);
    } else {
      throw new Error(response.data.message || 'Unknown error occurred');
    }
  } catch (error) {
    console.error(`Error tracking visit to ${pageName}:`, error);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying tracking (${retryCount + 1}/${MAX_RETRIES}) after delay...`);
      await delay(RETRY_DELAY * (retryCount + 1));
      return trackVisitor(pageName, retryCount + 1);
    }
  }
};
