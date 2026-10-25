# Service animation videos

Add your approved MP4 videos here. No actual video files were supplied, so the project displays a clear coming-soon state until you add them.

Each filename matches its service ID. Example:

- knee-care.mp4
- frozen-shoulder.mp4
- cerebral-palsy-rehabilitation.mp4
- speech-and-language-assessment.mp4

All configured video paths are in src/data/services.json. You can also set videoUrl to an HTTPS hosted video file URL. An MP4 URL must serve actual video bytes, not a YouTube webpage. Use MP4 with H.264 video and AAC audio for broad compatibility.

Clicking a card opens the animated detail panel and attempts muted autoplay. Native controls allow unmuting, pause, seeking and fullscreen. If autoplay is blocked, a play button appears. Closing unmounts and pauses the player. A video error falls back to the service artwork and a coming-soon message. Videos only mount when a service opens.

For captions set videoCaptionsUrl to a .vtt file URL or /videos/services/<id>.vtt. Review all clinical explanations before publishing. No treatment or outcome claims have been added to the template details.
