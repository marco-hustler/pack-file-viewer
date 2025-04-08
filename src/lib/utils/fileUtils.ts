export function getFileTypeFromUrl(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase() || '';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const pdfExtensions = ['pdf'];
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const textExtensions = ['txt'];
    const slidesExtensions = ['ppt', 'pptx', 'key'];

    if (imageExtensions.includes(extension)) return 'image';
    if (pdfExtensions.includes(extension)) return 'pdf';
    if (videoExtensions.includes(extension)) return 'video';
    if (textExtensions.includes(extension)) return 'text';
    if (slidesExtensions.includes(extension)) return 'slides';

    return 'unknown';
}