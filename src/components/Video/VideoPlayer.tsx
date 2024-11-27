export default function VideoPlayer(props: { source: string }) {
  return (
    <video
      className="w-full h-full object-cover"
      controls
      autoPlay
      preload="none"
      muted={false}
    >
      <source src={props.source} type="video/mp4" />
    </video>
  );
}
