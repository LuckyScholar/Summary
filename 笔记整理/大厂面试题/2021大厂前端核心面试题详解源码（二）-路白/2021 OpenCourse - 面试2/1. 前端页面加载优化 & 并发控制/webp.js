function checkWebp() {
    try {
        return (
            document
            .createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp') === 0
        );
    } catch (err) {
        return false;
    }
}

const supportWebp = checkWebp();

export function getWebpImageUrl(url) {
    if (!url) {
        return url;
    }
    if (url.startsWith('data:')) {
        return url;
    }
    if (!supportWebp) {
        return url;
    }
    return url + '?x-oss-process=image/format,webp';
}