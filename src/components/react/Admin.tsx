'use client';

import { TinaCMS, TinaProvider } from 'tinacms';
import { TinaAdmin } from 'tinacms';
import { TinaCloudAuthWall } from 'tinacms';
import config from '../../../tina/config';

const cms = new TinaCMS({
  enabled: true,
  sidebar: true,
  toolbar: true,
  apiURL: config.apiURL,
  config,
});

export default function Admin() {
  return (
    <TinaProvider cms={cms}>
      <TinaCloudAuthWall>
        <TinaAdmin />
      </TinaCloudAuthWall>
    </TinaProvider>
  );
} 