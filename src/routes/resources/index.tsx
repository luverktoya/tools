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
                Gradients
              </Header>
            </Card>
            <Card href="/resources/animtab" color="blue" blobs hover="clickable">
              <Header subheader="TAB plugin gradient animation creator">
                Animated TAB
              </Header>
            </Card>
            <Card href="/resources/sparkprofile" color="green" blobs hover="clickable">
              <Header subheader="Analyze Spark Profile and optimize your fish">
                Spark Profiler
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
            <Card href="//tools.p2g.lol" color="pink" blobs hover="clickable">
              <Header subheader="Quickly edit and convert any video">
                Play2GO Video Tools
              </Header>
            </Card>
            <Card href="//check.stun.services" color="orange" blobs hover="clickable">
              <Header subheader="Check any server status">
                Check
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
