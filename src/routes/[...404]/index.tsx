import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead } from '@builder.io/qwik-city';
import { Button } from '@luminescent/ui';

export default component$(() => {
  return (
    <section class="flex mx-auto max-w-7xl px-6 items-center justify-center min-h-[calc(100lvh-68px)]" >
      <div class="text-red-400 text-4xl">
        <div class="flex mt-4">
          <Link href="/">
            <Button size="lg" color="blue">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: '404',
  meta: [
  ],
};
