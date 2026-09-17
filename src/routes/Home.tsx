import { Marquee } from '@/components/home/Marquee';
import { Reveal, RevealSection } from '@/components/home/RevealSection';
import { VideoButton } from '@/components/home/VideoButton';
import { SimpleFooter } from '@/components/layout/SimpleFooter';
import { PageMeta } from '@/components/layout/PageMeta';
import { asset } from '@/lib/asset';

/** The three scenery sections between the hero and the marquee. */
const SCENERY = [
  {
    bg: 'bg-main-1-bg',
    title: 'Vestrahorn',
    caption: ['Kerid Crater Lake, a natural wonder', 'for trail Exploration'],
  },
  {
    bg: 'bg-main-2-bg',
    title: 'Klausturholar',
    caption: ['A Majestic Mountain', 'for photography and hiking'],
  },
  {
    bg: 'bg-main-3-bg',
    title: 'Vík',
    caption: ['A Charming Village', 'for Northern Lights Viewing'],
  },
];

/** The two "We Provide" / "You Can Find" feature blocks. */
const FEATURES = [
  {
    heading: 'We Provide',
    image: '/img/main-5.png',
    bg: 'bg-main-5',
    items: ['Professional Guide', 'In-Depth Tours', 'Ecological Interpretation'],
  },
  {
    heading: 'You Can Find',
    image: '/img/main-6.png',
    bg: 'bg-main-6',
    items: ['Glacier Hikes', 'Culture Experience', 'Outdoor Sports'],
  },
];

export function Home() {
  return (
    <>
      <PageMeta />
      {/* hero */}
      <header className="h-full w-full bg-banner bg-cover bg-no-repeat">
        <div className="flex h-[45%] w-screen flex-col items-center justify-center pt-[120px] md:pt-[140px] lg:mb-14 lg:pt-[150px]">
          <h1 className="font-libreBodoni_boldItalic text-[70px] text-mainYellow sm:text-[100px] md:text-[120px] lg:text-[150px]">
            <span className="animate-fadeInSlow">Explorer</span>
          </h1>
          <h2 className="font-libreBodoni_boldItalic text-3xl tracking-widest text-lightGray md:text-4xl lg:text-5xl">
            in Iceland
          </h2>
        </div>

        <div className="flex h-[15%] w-screen items-center justify-center">
          <img
            src={asset('/img/banner-icon.png')}
            className="h-[60%] max-h-[60px] animate-rotateStar object-cover md:max-h-[70px]"
            alt=""
          />
        </div>

        <div className="mx-auto mb-3 flex h-[15%] w-screen items-center justify-center gap-x-20 lg:pt-[3%] xl:max-w-7xl">
          <p className="small-text hidden text-lightGray lg:block lg:text-lg">
            {'{{'}&nbsp;Have Fun&nbsp;{'}}'}
          </p>
          <p className="small-text text-2xl text-lightGray lg:text-lg">
            {'{{'}&nbsp;Have Fun&nbsp;{'}}'}
          </p>
          <p className="small-text hidden text-lightGray lg:block lg:text-lg">
            {'{{'}&nbsp;Have Fun&nbsp;{'}}'}
          </p>
        </div>

        <div className="flex h-[5%] animate-bounce justify-center lg:items-center">
          <img src={asset('/img/banner-icon-arrow.png')} className="h-6" alt="arrow icon" />
        </div>
      </header>

      <main className="min-h-screen w-screen">
        {SCENERY.map(({ bg, title, caption }) => (
          <RevealSection
            key={title}
            className={`h-[400px] w-full ${bg} bg-cover bg-no-repeat md:h-[700px] md:bg-cover lg:h-screen`}
          >
            <div className="flex h-[45%] w-screen items-center justify-center pt-[15%] text-mainYellow">
              <Reveal className="flex flex-col items-center justify-center space-y-3 text-3xl md:space-y-5 md:text-5xl lg:text-7xl">
                <p>{title}</p>
              </Reveal>
            </div>

            <div className="flex h-[15%] w-screen items-center justify-center opacity-80">
              <img
                src={asset('/img/banner-icon.png')}
                className="h-[60%] max-h-[100px] object-cover"
                alt=""
              />
            </div>

            <Reveal className="mx-auto flex h-[15%] w-screen flex-col items-center justify-center space-y-3 pt-[6%] text-sm text-lightGray md:space-y-4 md:text-xl lg:space-y-6 lg:pt-[5%]">
              {caption.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </Reveal>
          </RevealSection>
        ))}

        <Marquee />

        {FEATURES.map(({ heading, image, bg, items }) => (
          <section key={heading} className="h-[480px] w-screen md:h-[680px] lg:h-screen">
            {/* below lg: stacked image + text */}
            <div className="mb-5 flex h-[45%] w-full justify-center md:mb-16 lg:hidden">
              <div className="h-[90%] w-[75%] md:h-[100%] md:w-[80%]">
                <img
                  src={asset(image)}
                  className="h-full w-full rounded-2xl object-cover"
                  alt=""
                />
              </div>
            </div>

            <RevealSection className="flex h-[55%] flex-col items-center lg:hidden">
              <p className="mb-6 text-2xl text-subPurple md:mb-8 md:text-4xl">{heading}</p>
              <Reveal className="mb-10 flex flex-col items-center space-y-2 text-sm md:text-xl">
                {items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </Reveal>
              <div className="flex h-[10%] justify-center">
                <img
                  src={asset('/img/main-5-icon.png')}
                  className="h-[70%] max-h-[100px] object-cover"
                  alt=""
                />
              </div>
            </RevealSection>

            {/* lg and up: split layout */}
            <div className="hidden h-screen w-screen lg:block">
              <div className="grid h-full grid-cols-12">
                <div className="col-span-6 h-full w-full pb-20 ps-32">
                  <div className={`${bg} bg-no-repea h-full w-full bg-cover`} />
                </div>
                <RevealSection className="col-span-6 flex flex-col items-center justify-center pb-20">
                  <div className="main-5-line-1 mb-28 h-1 w-[20%] bg-subPurple opacity-50" />
                  <p className="mb-14 text-4xl text-subPurple">{heading}</p>
                  <Reveal className="mb-14 flex flex-col items-center space-y-4 text-xl">
                    {items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </Reveal>
                  <div className="mb-28 flex h-[6%] justify-center">
                    <img
                      src={asset('/img/main-5-icon.png')}
                      className="h-[70%] max-h-[100px] object-cover"
                      alt=""
                    />
                  </div>
                  <div className="main-5-line-1 h-1 w-[20%] bg-subPurple opacity-50" />
                </RevealSection>
              </div>
            </div>
          </section>
        ))}

        {/* video section */}
        <section className="relative flex h-screen max-h-[400px] w-full items-center justify-center bg-main-7-bg bg-cover bg-no-repeat md:max-h-[600px] lg:h-[900px] lg:max-h-full">
          <div className="flex h-[30%] w-[70%] justify-center md:w-[60%] lg:h-[35%]">
            <video
              src={asset('/video/main-video.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="absolute top-20 text-3xl text-mainYellow md:top-28 md:text-6xl lg:top-36 lg:text-8xl">
            <p>Start a Journey</p>
          </div>
          <VideoButton />
        </section>
      </main>

      <SimpleFooter current="/" />
    </>
  );
}
