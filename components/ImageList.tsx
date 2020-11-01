type Props = {
    uid: number;
    urls: string[];
}

export default function ImageList(props) {
    const urls = props.urls
    return (
        <div>
            {urls.map((url) => (
                <img src={url} />
            ))}
        </div>
    )
}