/* eslint-disable qwik/valid-lexical-scope */
import { $, component$, useStore } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { cardColorClasses } from '@luminescent/ui';
import { Button, Card, Header, LogoPaper, LogoPterodactyl, LogoPurpur, LogoVelocity, LogoWaterfall, SelectInput, TextArea, TextInput, Toggle } from '@luminescent/ui';
import { ArrowForward, CafeOutline, CheckmarkCircleOutline, CodeOutline, CodeWorkingOutline, CubeOutline, LogoApple, LogoTux, LogoWindows, RefreshCircleOutline, TerminalOutline } from 'qwik-ionicons';
import { inlineTranslate, useSpeak } from 'qwik-speak';
import { getCookies } from '~/components/util/SharedUtils';
import { generateResult } from '~/components/util/flags/generateResult';
import { extraFlags as extFlags } from '~/data/flags';
import { serverType as srvType } from '~/data/environment/serverType';

const flagTypes = {
  'none': 'none',
  'aikars': 'Aikar\'s Flags',
  'benchmarkedG1GC': 'Benchmarked (G1GC)',
  'benchmarkedZGC': 'Benchmarked (ZGC)',
  'benchmarkedShenandoah': 'Benchmarked (Shenandoah)',
  'hillttys': 'hilltty\'s Flags',
  'obyduxs': 'Obydux\'s Flags',
  'etils': 'Etil\'s Flags',
  'proxy': 'Proxy',
};

export const setCookie = $(function (store: any) {
  const json = JSON.parse(store);
  delete json.alerts;
  const cookie: { [key: string]: string; } = {};
  document.cookie.split(/\s*;\s*/).forEach(function (pair) {
    const pairsplit = pair.split(/\s*=\s*/);
    cookie[pairsplit[0]] = pairsplit.splice(1).join('=');
  });
  Object.keys(json).forEach(key => {
    const existingCookie = cookie[key];
    if (existingCookie === json[key]) return;
    if (key == 'parsed') {
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(json[key]))}; path=/`;
    } else {
      document.cookie = `${key}=${encodeURIComponent(json[key])}; path=/`;
    }
  });
});

const defaults = {
  step: 1,
  parsed: {
    operatingSystem: '',
    serverType: '',
    gui: false,
    variables: false,
    autoRestart: false,
    extraFlags: [],
    fileName: '',
    flags: 'aikars',
    withResult: true,
    withFlags: false,
    memory: 0,
  },
};

export const useCookies = routeLoader$(async ({ cookie, url }) => {
  return await getCookies(cookie, Object.keys(defaults), url.searchParams) as typeof defaults;
});

export default component$(() => {
  useSpeak({ assets: ['flags'] });
  const t = inlineTranslate();

  const environmentOptions = [
    {
      color: 'yellow',
      environment: 'linux',
      tabIcon: <LogoTux class="w-5 h-5" />,
      cardIcon: <LogoTux class="w-10 h-10" />,
      label: t('flags.environments.linux.label@@Linux'),
      description: t('flags.environments.linux.description@@The most common operating system used for servers'),
    },
    {
      color: 'blue',
      environment: 'windows',
      tabIcon: <LogoWindows class="w-5 h-5" />,
      cardIcon: <LogoWindows class="w-10 h-10" />,
      label: t('flags.environments.windows.label@@Windows'),
      description: t('flags.environments.windows.description@@The most common operating system used for home desktops'),
    },
    {
      color: 'gray',
      environment: 'macos',
      tabIcon: <LogoApple class="w-5 h-5" />,
      cardIcon: <LogoApple class="w-10 h-10" />,
      label: t('flags.environments.macos.label@@macOS'),
      description: t('flags.environments.macos.description@@Apple\'s operating system'),
    },
    {
      color: 'orange',
      environment: 'pterodactyl',
      tabIcon: <LogoPterodactyl class="w-5 h-5" />,
      cardIcon: <LogoPterodactyl class="w-10 h-10" />,
      label: t('flags.environments.pterodactyl.label@@Pterodactyl'),
      description: t('flags.environments.pterodactyl.description@@Web-based server management platform used by most hosts'),
    },
    {
      color: 'red',
      environment: 'command',
      tabIcon: <CafeOutline class="w-5 h-5" />,
      cardIcon: <CafeOutline class="w-10 h-10" />,
      label: t('flags.environments.command.label@@Command'),
      description: t('flags.environments.command.description@@Only the Java command required to start the server'),
    },
  ];

  const softwareOptions = [
    {
      color: 'gray',
      software: 'paper',
      tabIcon: <LogoPaper class="w-5 h-5" />,
      cardIcon: <LogoPaper class="w-10 h-10" />,
      label: t('flags.serverType.paper.label@@Paper'),
      description: t('flags.serverType.paper.description@@Bukkit-based plugin loader'),
    },
    {
      color: 'purple',
      software: 'purpur',
      tabIcon: <LogoPurpur class="w-5 h-5" />,
      cardIcon: <LogoPurpur class="w-10 h-10" />,
      label: t('flags.serverType.purpur.label@@Purpur'),
      description: t('flags.serverType.purpur.description@@Bukkit-based plugin loader but more'),
    },
    // {
    //   color: 'red',
    //   software: 'forge',
    //   tabIcon: <LogoForge class="w-5 h-5" />,
    //   cardIcon: <LogoForge class="w-10 h-10" />,
    //   label: t('flags.serverType.forge.label@@Forge'),
    //   description: t('flags.serverType.forge.description@@Mod loader'),
    // },
    // {
    //   color: 'orange',
    //   software: 'fabric',
    //   tabIcon: <LogoFabric class="w-5 h-5" />,
    //   cardIcon: <LogoFabric class="w-10 h-10" />,
    //   label: t('flags.serverType.fabric.label@@Fabric'),
    //   description: t('flags.serverType.fabric.description@@Better mod loader'),
    // },
    {
      color: 'yellow',
      software: 'velocity',
      tabIcon: <LogoVelocity class="w-5 h-5" />,
      cardIcon: <LogoVelocity class="w-10 h-10" />,
      label: t('flags.serverType.velocity.label@@Velocity'),
      description: t('flags.serverType.velocity.description@@Proxy with plugin loader'),
    },
    {
      color: 'blue',
      software: 'waterfall',
      tabIcon: <LogoWaterfall class="w-5 h-5" />,
      cardIcon: <LogoWaterfall class="w-10 h-10" />,
      label: t('flags.serverType.waterfall.label@@Waterfall'),
      description: t('flags.serverType.waterfall.description@@Deprecated proxy'),
    },
  ];

  const configOptions = [
    {
      id: 'gui',
      cardIcon: <TerminalOutline class="w-10 h-10" />,
      label: t('flags.gui.label@@Use GUI'),
      description: t('flags.gui.description@@Whether to display the built-in server management GUI.'),
      disable: ['pterodactyl', 'velocity', 'waterfall'],
    },
    {
      id: 'variables',
      cardIcon: <CodeWorkingOutline class="w-10 h-10" />,
      label: t('flags.variables.label@@Use Variables'),
      description: t('flags.variables.description@@Whether to use environment variables within the script to define memory, file name, and other commonly changed elements.'),
    },
    {
      id: 'autoRestart',
      cardIcon: <RefreshCircleOutline class="w-10 h-10" />,
      label: t('flags.autoRestart.label@@Auto-restart'),
      description: t('flags.autoRestart.description@@Whether to automatically restart after it is stopped.'),
    },
  ];

  const extraFlagsOptions = [
    {
      id: 'vectors',
      cardIcon: <CubeOutline class="w-10 h-10" />,
      label: t('flags.extraFlags.vectors.label@@Modern Vectors'),
      description: t('flags.extraFlags.vectors.description@@Enables SIMD operations to optimize map item rendering on Pufferfish and its forks.'),
    },
    {
      id: 'benchmarkedGraalVM',
      cardIcon: <CubeOutline class="w-10 h-10" />,
      label: t('flags.extraFlags.benchmarkedGraalVM.label@@Benchmarked (GraalVM)'),
      description: t('flags.extraFlags.benchmarkedGraalVM.description@@Additional performance flags for Benchmarked (G1GC) exclusive to GraalVM users.'),
    },
  ];
  const cookies = useCookies().value;
  const store: any = useStore({
    ...defaults,
    ...cookies,
  }, { deep: true });

  return (
    <section class="flex mx-auto max-w-7xl px-6 min-h-[calc(100svh)] pt-[72px]">
      <div class="w-full my-10 min-h-[60px]">
        <h1 class="font-bold text-gray-50 text-2xl sm:text-4xl mb-2">
          {t('flags.title@@Flags Generator')}
        </h1>
        <h2 class="text-gray-50 text-base sm:text-xl mb-6">
          {t('flags.subtitle@@A simple script generator to start your Minecraft servers with optimal flags.')}
        </h2>
        <div class="flex">
          <div class="flex-1">
            <button class="flex items-center justify-center sm:justify-normal gap-3 fill-current py-2 px-3 hover:bg-gray-800 transition-all w-full" onClick$={() => {
              store.step = 1;
              setCookie(JSON.stringify(store));
            }}>
              {environmentOptions.find(option => option.environment === store.parsed.operatingSystem)?.tabIcon
                ?? <CubeOutline class="w-5 h-5" />}
              <span class="hidden sm:flex">
                {t('flags.environment.label@@Environment')}
              </span>
            </button>
          </div>
          <div class="flex-1">
            <button disabled={store.parsed.operatingSystem == ''} class="flex items-center justify-center sm:justify-normal gap-3 fill-current py-2 px-3 hover:bg-gray-800 transition-all w-full disabled:opacity-50" onClick$={() => {
              store.step = 2;
              setCookie(JSON.stringify(store));
            }}>
              {softwareOptions.find(option => option.software === store.parsed.serverType)?.tabIcon
                ?? <TerminalOutline class="w-5 h-5" />}
              <span class="hidden sm:flex">
                {t('flags.software.label@@Software')}
              </span>
            </button>
          </div>
          <div class="flex-1">
            <button disabled={store.parsed.serverType == ''} class="flex items-center justify-center sm:justify-normal gap-3 fill-current py-2 px-3 hover:bg-gray-800 transition-all w-full disabled:opacity-50" onClick$={() => {
              store.step = 3;
              setCookie(JSON.stringify(store));
            }}>
              <CodeOutline class="w-5 h-5" />
              <span class="hidden sm:flex">
                {t('flags.config.label@@Configuration')}
              </span>
            </button>
          </div>
          <div class="flex-1">
            <button disabled={store.parsed.fileName == ''} class="flex items-center justify-center sm:justify-normal gap-3 fill-current py-2 px-3 hover:bg-gray-800 transition-all w-full disabled:opacity-50" onClick$={() => {
              store.step = 4;
              setCookie(JSON.stringify(store));
            }}>
              <CheckmarkCircleOutline class="w-5 h-5" />
              <span class="hidden sm:flex">
                {t('flags.result.label@@Result')}
              </span>
            </button>
          </div>
        </div>
        <div class={{
          'h-0.5 bg-gray-700 w-full -mb-0.5': true,
        }} />
        <div class={{
          'h-0.5 mb-4 transition-all ease-in-out bg-gradient-to-r': true,
          'w-1/4': store.step == 1,
          'w-2/4': store.step == 2,
          'w-3/4': store.step == 3,
          'w-full': store.step == 4,
        }}
        style={{
          background: store.step == 1 ? 'linear-gradient(to right, rgb(185 28 28), rgb(185 28 28))'
            : store.step == 2 ? 'linear-gradient(to right, rgb(185 28 28), rgb(161 98 7))'
              : store.step == 3 ? 'linear-gradient(to right, rgb(185 28 28), rgb(161 98 7), rgb(21 128 61))'
                : store.step == 4 ? 'linear-gradient(to right, rgb(185 28 28), rgb(161 98 7), rgb(21 128 61), rgb(29 78 216))' : '',
        }} />
        {
          store.step == 1 &&
          <div>
            <h1 class="flex sm:hidden text-xl font-bold">
              {t('flags.environment.label@@Environment')}
            </h1>
            <h2 class="text-gray-300 text-base sm:text-xl mb-6">
              {t('flags.enviroments.description@@The operating system that the server runs on.')}
            </h2>
            <div class="flex [&>*]:flex-1 flex-wrap gap-3 justify-center fill-current">
              {environmentOptions.map((option, index) => (
                <Card color={option.color as keyof typeof cardColorClasses} hover="clickable" blobs onClick$={() => {
                  store.parsed.operatingSystem = option.environment;
                  store.step = 2;
                  setCookie(JSON.stringify(store));
                  configOptions.forEach((option) => {
                    if (option.disable?.includes(store.parsed['operatingSystem']) || option.disable?.includes(store.parsed['serverType'])) {
                      store.parsed[option.id] = false;
                    }
                  });
                }} key={index}>
                  <div class="flex flex-col items-center font-bold text-white w-full gap-6 py-5">
                    {option.cardIcon}
                    {option.label}
                  </div>
                  <p class="min-w-[16rem] text-center">
                    {option.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        }
        {
          store.step == 2 &&
          <div>
            <h1 class="flex sm:hidden text-xl font-bold">
              {t('flags.software.label@@Software')}
            </h1>
            <h2 class="text-gray-300 text-base sm:text-xl mb-6">
              {t('flags.software.description@@The software in which your Minecraft server will run on.')}
            </h2>
            <div class="flex [&>*]:flex-1 flex-wrap gap-3 justify-center fill-current">
              {softwareOptions.map((option, index) => (
                <Card color={option.color as keyof typeof cardColorClasses} hover="clickable" blobs onClick$={() => {
                  store.parsed.serverType = option.software;
                  store.step = 3;
                  setCookie(JSON.stringify(store));
                  configOptions.forEach((option) => {
                    if (option.disable?.includes(store.parsed['operatingSystem']) || option.disable?.includes(store.parsed['serverType'])) {
                      store.parsed[option.id] = false;
                    }
                  });
                }} key={index}>
                  <div class="flex flex-col items-center font-bold text-white w-full gap-6 py-5">
                    {option.cardIcon}
                    {option.label}
                  </div>
                  <p class="min-w-[16rem] text-center">
                    {option.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        }
        {
          store.step == 3 &&
          <div>
            <h1 class="flex sm:hidden text-xl font-bold">
              {t('flags.config.label@@Configuration')}
            </h1>
            <div class="flex items-center mb-6">
              <h2 class="flex-1 text-gray-300 text-base sm:text-xl">
                {t('flags.config.description@@The various additions and modifications that can be made to your start script.')}
              </h2>
              <Button size='sm' color="blue" disabled={store.parsed.fileName == ''} onClick$={() => {
                store.step = 4;
                setCookie(JSON.stringify(store));
              }}>
                {t('flags.result@@Result')}
                <ArrowForward class="w-5 h-5" />
              </Button>
            </div>
            <div>
              <div class="flex [&>*]:flex-1 flex-wrap gap-4 items-end justify-between mb-6 fill-current">
                <TextInput id="input" value={store.parsed.fileName} placeholder="server.jar" onChange$={(event: any) => {
                  if (event.target!.value.replace(/ /g, '') == '') return;
                  if (!event.target!.value.endsWith('.jar')) { event.target!.value += '.jar'; }
                  store.parsed.fileName = event.target!.value;
                  setCookie(JSON.stringify(store));
                }}>
                  <Header subheader={t('flags.fileName.description@@The name of the file that will be used to start your server.')}>
                    {t('flags.fileName.label@@File Name')}
                  </Header>
                </TextInput>
                <SelectInput id="preset" class={{ 'w-full': true }} onChange$={(event: any) => {
                  store.parsed.flags = event.target!.value; setCookie(JSON.stringify(store));
                }} values={Object.keys(flagTypes).map((flag: string) => ({
                  name: flagTypes[flag as keyof typeof flagTypes],
                  value: flag,
                }))} value={store.parsed.flags}>
                  <Header subheader={t('flags.flags.description@@The collection of start arguments that typically optimize the server\'s performance')}>
                    {t('flags.flags.label@@Flags')}
                  </Header>
                </SelectInput>
              </div>
              <div class="relative w-full mb-8 flex flex-col gap-2">
                <Header subheader={t('flags.memory.description@@The amount of memory (RAM) to allocate to your server.')}>
                  {t('flags.memory.label@@RAM (GB)')}
                </Header>
                <div class="group relative w-full h-2 bg-gray-800 hover:bg-gray-700 select-none rounded-lg my-2">
                  <div class="h-2 bg-blue-800 group-hover:bg-blue-700 rounded-lg" style={{ width: `${store.parsed.memory / 32 * 100}%` }} />
                  <div class="absolute w-full top-1 flex justify-between">
                    <span class="text-left">|</span>
                    <span class="text-center">|</span>
                    <span class="text-center">|</span>
                    <span class="text-center">|</span>
                    <span class="text-right">|</span>
                  </div>
                  <div class="absolute -top-1 flex flex-col gap-4 items-center" style={{ left: `calc(${store.parsed.memory / 32 * 100}% - 48px)` }}>
                    <div class="w-4 h-4 bg-blue-700 group-hover:bg-blue-600 rounded-full" />
                    <div class="opacity-0 group-hover:opacity-100 w-24 py-2 bg-gray-800 rounded-lg flex justify-center transition-all z-50">
                      {store.parsed.memory} GB
                    </div>
                  </div>
                  <input id="labels-range-input" type="range" min="0" max="32" step="0.5" value={store.parsed.memory} class="absolute top-0 h-2 w-full opacity-0 cursor-pointer" onInput$={(event: any) => {
                    store.parsed.memory = event.target!.value;
                    setCookie(JSON.stringify(store));
                  }} />
                </div>
              </div>
              <div class="flex [&>*]:flex-1 flex-wrap gap-3 justify-center fill-current">
                {configOptions.filter((option) => {
                  return !option.disable?.includes(store.parsed['operatingSystem']) && !option.disable?.includes(store.parsed['serverType']);
                }).map((option, index) => (
                  <Card color="darkgray" key={index}>
                    <div class="flex flex-col items-center font-bold text-white w-full gap-4">
                      {option.cardIcon}
                      {option.label}
                    </div>
                    <p class="min-w-[16rem] text-center mb-16">
                      {option.description}
                    </p>
                    <div class="absolute bottom-8 w-full -mx-8">
                      <Toggle checked={store.parsed[option.id as keyof typeof store]} center onClick$={(event: any) => {
                        (store.parsed as any)[option.id] = event.target!.checked;
                        setCookie(JSON.stringify(store));
                      }} />
                    </div>
                  </Card>
                ))}
              </div>
              <div class="pt-5 flex [&>*]:flex-1 flex-wrap gap-3 justify-center fill-current">
                {extraFlagsOptions.filter((option) => {
                  return extFlags[option.id].supports.includes(store.parsed.flags) && srvType[store.parsed.serverType].extraFlags?.includes(option.id);
                }).map((option, index) => (
                  <Card color="darkgray" key={index}>
                    <div class="flex flex-col items-center font-bold text-white w-full gap-4">
                      {option.cardIcon}
                      {option.label}
                    </div>
                    <p class="min-w-[16rem] text-center mb-16">
                      {option.description}
                    </p>
                    <div class="absolute bottom-8 w-full -mx-8">
                      <Toggle checked={store.parsed.extraFlags.includes(option.id)} center onClick$={(event: any) => {
                        if (event.target!.checked) {
                          store.parsed.extraFlags.push(option.id);
                        } else {
                          store.parsed.extraFlags.splice(store.parsed.extraFlags.indexOf(option.id), 1);
                        }
                        setCookie(JSON.stringify(store));
                      }} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        }
        {
          store.step == 4 &&
          <div>
            <h1 class="flex sm:hidden text-xl font-bold">
              {t('flags.result.label@@Result')}
            </h1>
            <TextArea output class={{ 'h-96 mt-2': true }} id="Output" value={generateResult(store.parsed).script}>
              <Header subheader={t('flags.script.description@@The resulting script that can be used to start your server. Place this file in the same location as {{fileName}}, then execute it!')}>
                {t('flags.script.label@@Script')}
              </Header>
            </TextArea>
          </div>
        }
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Flags Generator',
  meta: [
  ],
};
