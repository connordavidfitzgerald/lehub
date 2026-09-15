import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {projectId: 'e797khcc', dataset: 'production'},
  // Both named here rather than answered at a prompt, so `sanity deploy` is
  // repeatable and always lands on the same host.
  studioHost: 'lehub',
  deployment: {appId: 'cvvo0kpzezlu457u97857e16'},
})
