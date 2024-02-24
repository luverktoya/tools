import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ButtonAnchor, Card, Header } from '@luminescent/ui';
import { LogoDiscord, LogoGithub } from 'qwik-ionicons';

export default component$(() => {

  return (
    <section class="flex flex-col gap-3 mx-auto max-w-7xl px-6 py-16 items-center justify-center min-h-[calc(100svh-68px)]">
      <h1 class="font-bold text-gray-50 text-2xl sm:text-4xl mb-4 mt-10">
        Resources
      </h1>
      <div class="min-h-[60px] text-2xl flex flex-col gap-4">
        <Card color="darkgray">
          <Header subheader="Tools to help you create gradient text in Minecraft.">
            Gradient Tools
          </Header>
          <div class="flex [&>*]:flex-1 flex-wrap gap-4">
            <Card href="/resources/rgb" color="red" blobs hover="clickable">
              <Header subheader="RGB gradient creator">
                RGBirdflop
              </Header>
            </Card>
            <Card href="/resources/animtab" color="blue" blobs hover="clickable">
              <Header subheader="TAB plugin gradient animation creator">
                Animated TAB
              </Header>
            </Card>
            <Card href="/resources/animpreview" color="green" blobs hover="clickable">
              <Header subheader="Preview TAB Animations without the need to put them in-game">
                TAB Animation Previewer
              </Header>
            </Card>
          </div>
        </Card>
        <Card color="darkgray">
          <Header subheader="Tools to help configure and setup minecraft servers.">
            Server tools
          </Header>
          <div class="flex [&>*]:flex-1 flex-wrap gap-4">
            <Card href="/resources/sparkprofile" color="yellow" blobs hover="clickable">
              <Header subheader="Analyze Spark Profiles and get possible optimizations">
                Spark Profile
              </Header>
            </Card>
            <Card href="/resources/papertimings" color="pink" blobs hover="clickable">
              <Header subheader="Analyze Paper Timings Reports and get possible optimizations">
                Paper Timings
              </Header>
            </Card>
            <Card href="/resources/flags" color="orange" blobs hover="clickable">
              <Header subheader="A simple script generator to start your Minecraft servers with optimal flags">
                Flags
              </Header>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Tools',
  meta: [
  ],
};
