import type { QRL } from '@builder.io/qwik';
import { component$, $ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { getValue, useForm, zodForm$ } from '@modular-forms/qwik';
//import { PrismaClient } from '@prisma/client/edge';

import type { input } from 'zod';
import { Button } from '~/components/elements/Button';
import TextInput from '~/components/elements/TextInput';
import Toggle from '~/components/elements/Toggle';
import { serverSchema } from '~/components/serverlist/schema';
//import { useAuthSession } from '~/routes/plugin@auth';

type ServerForm = input<typeof serverSchema>;

//const prisma = new PrismaClient();

export const useFormLoader = routeLoader$<InitialValues<ServerForm>>(() => ({
  name: 'Server Name',
  description: '',
  ip: '',
  port: 25565,
  votifier: false,
  votifierIp: '',
  votifierPort: 8192,
  website: '',
  version: '',
  tags: [],
}));

export default component$(() => {

  const [serverForm, { Form, Field }] = useForm<ServerForm>({
    loader: useFormLoader(),
    validate: zodForm$(serverSchema),
  });

  const handleSubmit: QRL<SubmitHandler<ServerForm>> = $(async (values) => {
    console.log('Form Submitted:', values);
  });

  return (
    <Form class="flex items-center justify-center mx-auto max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mb-16 mt-5" onSubmit$={handleSubmit}>
      <div class="bg-black/50 border-black/30 border-2 p-8 rounded-xl text-lg font-normal">
        <Field name="name">
          {(field, props) => (
            <div class="mb-4">
              <TextInput {...props} type="text" value={field.value} >Server Name</TextInput>
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <TextInput big {...props} value={field.value} >Server Description</TextInput>
          )}
        </Field>
        <Field name="ip">
          {(field, props) => (
            <div class="mb-4">
              <TextInput {...props} type="text" value={field.value} >Server IP</TextInput>
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="port" type='number'>
          {(field, props) => (
            <div class="mb-4">
              <TextInput {...props} type="number" value={field.value} >Server Port (if you arent using one leave as 25565) </TextInput>
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="votifier" type='boolean'>
          {(field, props) => (
            <div class="mb-4">
              <Toggle {...props} value={field.value} >Enable Votifier</Toggle>
            </div>
          )}
        </Field>
        {getValue(serverForm, 'votifier') && (
          <>
            <Field name="votifierIp">
              {(field, props) => (
                <div class="mb-4">
                  <TextInput {...props} type="text" value={field.value} >Votifier IP</TextInput>
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
            <Field name="votifierPort" type='number'>
              {(field, props) => (
                <div class="mb-4">
                  <TextInput {...props} type="number" value={field.value} >Votifier Port</TextInput>
                  {field.error && <div>{field.error}</div>}
                </div>
              )}
            </Field>
          </>
        )}
        <Field name="website">
          {(field, props) => (
            <div class="mb-4">
              <TextInput {...props} type="text" value={field.value} >Server Website</TextInput>
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Field name="version">
          {(field, props) => (
            <div class="mb-4">
              <TextInput {...props} type="text" value={field.value} >Server Version</TextInput>
              {field.error && <div>{field.error}</div>}
            </div>
          )}
        </Field>
        <Button type="submit" class="mt-4">Submit</Button>
      </div>
    </Form>
  );
});

export const head: DocumentHead = {
  title: 'Minecraft Hosting & Resources',
  meta: [
    {
      name: 'description',
      content: 'Minecraft Hosting & Resources',
    },
    {
      name: 'og:description',
      content: 'Minecraft Hosting & Resources',
    },
    {
      name: 'og:image',
      content: 'https://simplymc.art/images/icon.png',
    },
  ],
};
