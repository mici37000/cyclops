import { defineConfig } from 'cypress';
import { environment } from './src/environments/environment';

export default defineConfig({
  e2e: {
    baseUrl: environment.baseClientURI,
    specPattern: 'e2e/*.e2e-spec.cy.ts',
    fixturesFolder: 'e2e/fixtures',
    screenshotsFolder: 'e2e/screenshots',
    videosFolder: 'e2e/videos',
    supportFile: 'e2e/support/index.ts',
  }
});
