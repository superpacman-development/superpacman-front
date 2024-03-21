import Image from 'next/image';

export default function Landing() {
  return (
    <div className="h-auto w-full">
      <Image
        src="/images/main.png"
        alt="ListBank"
        priority={true}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src="/images/features.png"
        alt="ListBank"
        priority={true}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src="/images/introduce.png"
        alt="ListBank"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src="/images/service.png"
        alt="ListBank"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src="/images/footer.png"
        alt="ListBank"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
