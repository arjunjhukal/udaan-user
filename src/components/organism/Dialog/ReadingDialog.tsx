import { Box, Button, CircularProgress, Dialog, DialogContent, Typography, useTheme } from '@mui/material';
import Plyr, { type APITypes, type PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect, useRef, useState } from 'react';
import { resetReadingScreen, setReadingScreen } from '../../../slice/ReadingScreenSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import type { MediaProps } from '../../../types/media';
import { extractYouTubeVideoId, getYouTubeThumbnail } from '../../../utils/extractYoutubeVideoId';

interface PlyrInstance {
    plyr?: APITypes;
}
const SpotifyAudioPlayer = ({ audioUrl, imageUrl, title }: { audioUrl: string, imageUrl: string, title: string }) => {
    return (
        <div
            style={{
                width: "100%",
                background: "#121212",
                borderRadius: "12px",
                padding: "16px",
                color: "white",
            }}
        >
            {/* Image */}
            <div style={{ width: "100%", marginBottom: "12px" }}>
                <img
                    src={imageUrl}
                    alt="cover"
                    style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                />
            </div>

            {/* Title */}
            {title && (
                <h3 style={{ margin: "8px 0", fontSize: "18px" }}>{title}</h3>
            )}

            {/* Audio Player */}
            {audioUrl ? (
                <audio
                    controls
                    src={audioUrl}
                    style={{
                        width: "100%",
                        borderRadius: "8px",
                    }}
                />
            ) : (
                <p>No audio available</p>
            )}
        </div>
    );
};


export default function ReadingDialog() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { open, type, video, audio, pdf, title, isYouTube, videoId, relatedVideos } = useAppSelector(
        state => state.readScreen
    );

    const playerRef = useRef<PlyrInstance | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Get current media - video.id is the DB id, videoId from props is the YouTube ID
    const videoUrl = video?.url || null;
    const audioUrl = audio?.url || null;
    const pdfUrl = pdf?.url || null;

    const handleClose = () => {
        if (playerRef.current?.plyr) {
            try {
                (playerRef.current.plyr as any).destroy?.();
            } catch (error) {
                console.error('Error destroying player:', error);
            }
        }
        dispatch(resetReadingScreen());
    };

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
            setIsLoading(false);
        }
    }, [open, isYouTube]);

    useEffect(() => {
        if (open) {
            setIsLoading(true);
        }
    }, [open]);

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

    const handleRelatedVideoClick = (relatedVideo: MediaProps) => {
        const isYoutube = relatedVideo.url.includes('youtube.com') || relatedVideo.url.includes('youtu.be');
        const vidId = isYoutube ? extractYouTubeVideoId(relatedVideo.url) : null;

        dispatch(
            setReadingScreen({
                isYouTube: isYoutube,
                videoId: vidId || undefined,
                video: relatedVideo,
                title: relatedVideo.file_name
            })
        );
    };

    const renderContent = () => {
        switch (type) {
            case 'temp_video':
                if (isYouTube && videoId) {
                    if (isLoading || !videoId) {
                        return (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '100%',
                                backgroundColor: '#000',
                            }}>
                                <CircularProgress size={60} />
                            </div>
                        );
                    }

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
                        <div ref={containerRef}>
                            <Plyr
                                ref={playerRef as any}
                                source={plyrSource}
                                options={plyrOptions}
                            />
                        </div>
                    );
                } else if (videoUrl) {
                    return <video controls src={videoUrl} style={{ width: '100%' }} />;
                }
                return <p>No video available</p>;

            case 'temp_audios':
                return (
                    <SpotifyAudioPlayer
                        audioUrl={audioUrl || ""}
                        imageUrl="/logo.svg"
                        title="Sample Audio"
                    />
                );


            case 'temp_notes':
                return pdfUrl ? (
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        style={{ width: '100%', height: '600px', border: 'none' }}
                    />

                ) : (
                    <p>No PDF available</p>
                );

            default:
                return <p>Unsupported media type</p>;
        }
    };

    if (!open) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    background: theme.palette.primary.contrastText,
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

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-9">
                        {renderContent()}
                    </div>
                    <div className="col-span-3">
                        <Typography variant='subtitle1' className='block! mb-3!' sx={{ fontWeight: 600 }}>
                            Up Next
                        </Typography>
                        <Box className="flex flex-col gap-3" sx={{
                            maxHeight: `440px`,
                            overflowY: "auto",
                        }}>
                            {relatedVideos && relatedVideos.length > 0 ? (() => {

                                const currentIndex = relatedVideos.findIndex(v => v.id === video?.id);
                                const nextVideos = relatedVideos.slice(currentIndex + 1, currentIndex + 6);

                                return nextVideos.length > 0 ? (
                                    nextVideos.map((relatedVideo) => {
                                        const vidId = extractYouTubeVideoId(relatedVideo.url);
                                        const thumbnailUrl = vidId ? getYouTubeThumbnail(vidId) : '';

                                        return (
                                            <div
                                                key={relatedVideo.id}
                                                onClick={() => handleRelatedVideoClick(relatedVideo)}
                                                className='cursor-pointer'
                                            >
                                                <div style={{
                                                    position: 'relative',
                                                    paddingBottom: '56.25%',
                                                    background: '#000',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden'
                                                }}>
                                                    {thumbnailUrl ? (
                                                        <img
                                                            src={thumbnailUrl}
                                                            alt={relatedVideo.file_name}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            color: '#fff'
                                                        }}>
                                                            No thumbnail
                                                        </div>
                                                    )}
                                                </div>
                                                <Typography variant='subtitle1' className='font-medium mt-1!'>
                                                    {relatedVideo.file_name}
                                                </Typography>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <Typography variant="subtitle2" color="text.middle">
                                        No related videos available
                                    </Typography>
                                );

                            })() : (
                                <Typography variant="subtitle2" color="text.middle">
                                    No related videos available
                                </Typography>
                            )}

                        </Box>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '16px',
                    marginTop: '24px'
                }}>
                    <Button variant='contained' onClick={handleClose} className='cancel__btn'>
                        Cancel
                    </Button>
                    <Button variant='contained' className='primary__btn'>
                        Mark as Completed
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}