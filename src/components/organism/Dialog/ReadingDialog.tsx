import { Button, CircularProgress, Dialog, DialogContent, useTheme } from '@mui/material';
import Plyr, { type APITypes, type PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect, useRef, useState } from 'react';
import { resetReadingScreen } from '../../../slice/ReadingScreenSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';

// Define proper types for Plyr ref
interface PlyrInstance {
    plyr?: APITypes;
}

export default function ReadingDialog() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { open, type, videoId, videoUrl, audioUrl, pdfUrl, title, isYouTube } = useAppSelector(
        state => state.readScreen
    );

    const playerRef = useRef<PlyrInstance | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        // Clean up before closing
        if (playerRef.current?.plyr) {
            try {
                (playerRef.current.plyr as any).destroy?.();
            } catch (error) {
                console.error('Error destroying player:', error);
            }
        }
        dispatch(resetReadingScreen());
    };

    // Apply YouTube security measures
    const applyYouTubeSecurityMeasures = () => {
        if (!containerRef.current) return;

        const iframe = containerRef.current.querySelector('iframe') as HTMLIFrameElement | null;
        if (!iframe) return;

        iframe.style.pointerEvents = 'none';
        iframe.style.userSelect = 'none';

        let overlay = containerRef.current.querySelector('.youtube-security-overlay') as HTMLElement | null;
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'youtube-security-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: transparent;
                z-index: 20;
                pointer-events: auto;
                user-select: none;
            `;

            const videoWrapper = containerRef.current.querySelector('.plyr__video-wrapper') as HTMLElement | null;
            if (videoWrapper) {
                videoWrapper.appendChild(overlay);
            }
        }

        const plyrControls = containerRef.current.querySelector('.plyr__controls') as HTMLElement | null;
        if (plyrControls) {
            plyrControls.style.pointerEvents = 'auto';
            plyrControls.style.zIndex = '30';
        }
    };

    useEffect(() => {
        if (open && isYouTube) {
            const securityTimeout = setTimeout(() => {
                applyYouTubeSecurityMeasures();
                setIsLoading(false);
            }, 2000);

            const style = document.createElement('style');
            style.id = 'youtube-security-styles';
            style.textContent = `
                .youtube-security-overlay ~ iframe,
                .plyr__video-wrapper iframe {
                    pointer-events: none !important;
                }
                
                .plyr__video-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: transparent;
                    z-index: 25;
                    pointer-events: auto;
                }
                
                .plyr__controls,
                .plyr__control {
                    z-index: 35 !important;
                    pointer-events: auto !important;
                }
            `;

            if (!document.querySelector('#youtube-security-styles')) {
                document.head.appendChild(style);
            }

            return () => {
                clearTimeout(securityTimeout);
                const styleElement = document.querySelector('#youtube-security-styles');
                if (styleElement) {
                    styleElement.remove();
                }
            };
        } else if (open) {
            // For non-YouTube content, remove loading state immediately
            setIsLoading(false);
        }
    }, [open, isYouTube]);

    // Reset loading state when dialog opens
    useEffect(() => {
        if (open) {
            setIsLoading(true);
        }
    }, [open]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (playerRef.current?.plyr) {
                try {
                    (playerRef.current.plyr as any).destroy?.();
                } catch (error) {
                    console.error('Error destroying player:', error);
                }
            }
        };
    }, []);

    const renderContent = () => {
        switch (type) {
            case 'temp_video':
                if (isYouTube && videoId) {
                    // Show spinner while video is loading
                    if (isLoading || !videoId) {
                        return (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '400px',
                                backgroundColor: '#000',
                                borderRadius: '8px'
                            }}>
                                <CircularProgress size={60} />
                            </div>
                        );
                    }

                    // Render YouTube video with Plyr
                    const plyrSource: PlyrProps['source'] = {
                        type: "video",
                        sources: [
                            {
                                src: videoId,
                                provider: "youtube",
                            },
                        ],
                    };

                    const plyrOptions: PlyrProps['options'] = {
                        autoplay: false,
                        controls: [
                            'play-large',
                            'play',
                            'rewind',
                            'progress',
                            'fast-forward',
                            'current-time',
                            'duration',
                            'mute',
                            'volume',
                            'settings',
                            'fullscreen'
                        ],
                        keyboard: { focused: true, global: false },
                        clickToPlay: true,
                        disableContextMenu: true,
                        fullscreen: { enabled: true },
                        seekTime: 10,
                        youtube: {
                            noCookie: false,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            controls: 0,
                            disablekb: 0,
                            fs: 1,
                            cc_load_policy: 0,
                            autoplay: 0,
                            origin: window.location.origin
                        },
                    };

                    return (
                        <div
                            ref={containerRef}

                        >
                            <Plyr
                                ref={playerRef as any}
                                source={plyrSource}
                                options={plyrOptions}
                            />
                        </div>
                    );
                } else if (videoUrl) {
                    // Render regular video
                    return <video controls src={videoUrl} style={{ width: '100%' }} />;
                }
                return <p>No video available</p>;

            case 'temp_audios':
                return audioUrl ? (
                    <audio controls src={audioUrl} style={{ width: '100%' }} />
                ) : (
                    <p>No audio available</p>
                );

            case 'temp_notes':
                return pdfUrl ? (
                    <iframe src={pdfUrl} style={{ width: '100%', height: '600px', border: 'none' }} />
                ) : (
                    <p>No PDF available</p>
                );

            default:
                return <p>Unsupported media type</p>;
        }
    };

    // Only render dialog content when open is true
    if (!open) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    background: theme.palette.primary.white,
                    borderRadius: '16px'
                },
            }}
        >
            <DialogContent sx={{ padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
                        {title || 'Media Viewer'}
                    </h2>
                </div>

                {renderContent()}

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '16px',
                    marginTop: '24px'
                }}>
                    <Button variant='contained' onClick={handleClose} className='secondary__btn'>
                        Close
                    </Button>
                    <Button variant='contained' className='primary__btn'>
                        Mark as Completed
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}