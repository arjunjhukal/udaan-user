
export const extractYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;

    try {
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return null;
        }

        let videoId = null;

        if (url.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            videoId = urlParams.get('v');
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0].split('/')[0];
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('youtube.com/embed/')[1].split('?')[0].split('/')[0];
        } else if (url.includes('youtube.com/v/')) {
            videoId = url.split('youtube.com/v/')[1].split('?')[0].split('/')[0];
        }

        return videoId;
    } catch (error) {
        console.error('Error parsing YouTube URL:', error);
        return null;
    }
};


export const isYouTubeVideo = (url: string): boolean => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
};


export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'mqdefault'): string => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};