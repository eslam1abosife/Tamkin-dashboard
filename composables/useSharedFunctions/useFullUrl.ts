

export default function() {

    const fullUrl = (path: string) => {
        if (/^https?:\/\//.test(path))
            return path;
        // let baseURL = useRuntimeConfig().public.baseURL.replace('api.', '');
        let baseURL = 'https://tamkin.app'
        return new URL(path, baseURL).href;
    };

    return {
        fullUrl
    }
}

