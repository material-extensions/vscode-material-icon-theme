const imageUrl = 'https://contributors-table.vercel.app/image';
const outputPath = './images/contributors.png';

async function fetchImage() {
  const params = new URLSearchParams({
    repo: 'material-extensions/vscode-material-icon-theme',
    max: '294',
    type: 'png',
  }).toString();

  const response = await fetch(`${imageUrl}?${params}`, {
    method: 'GET',
    headers: {
      'User-Agent': 'Material Icon Theme contributors script',
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const image = response;

  Bun.write(outputPath, image);
  console.log(`Image saved to ${outputPath}`);
}

fetchImage().catch((error) => console.error(error));
