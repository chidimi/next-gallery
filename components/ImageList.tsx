type Props = {
    uid: number;
    urls: string[];
}

export default function ImageList(urls: []) {
    return (
        <div>
            {urls.map((url) => (
                <img src={url} />
            ))}
        </div>
    )
}