import { type ChangelogConfig } from 'changelogen';

const ChangelogenConfig: Partial<ChangelogConfig> = {
  types: {
    feat: {
      title: "✨ Enhancements"
    }
  },
  output: "CHANGELOG.md",
  repo: {
    provider: "github",
    repo: "material-extensions/vscode-material-icon-theme"
  }
};

export default ChangelogenConfig;
