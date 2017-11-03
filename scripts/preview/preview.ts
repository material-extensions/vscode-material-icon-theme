const cssFile = './style.css';
const styling = `<link rel="stylesheet" href="${cssFile}">`;

const createHeadRow = (amount: number) => {
    const pair = `
        <th class="icon">Icon</th>
        <th class="type">Type</th>
    `;
    const columns = [...Array(amount)].map(item => item = pair).join('');
    return `
        <tr>
            ${columns}
        </tr>
    `;
};

const createBodyRows = (items: IconDefintion[][]) => {
    let rows = '';
    items.forEach((row, i) => {
        const columns = row.map(icon => `
            <td class="icon">
                <img src="./../../icons/${icon.name}.svg" alt="${icon.name}">
            </td>
            <td class="type">${icon.type}</td>
        `).join('');
        const tableRow = `
            <tr>
                ${columns}
            </tr>
        `;
        rows = rows + tableRow;
    });
    return rows;
};

const createTable = (headRow, bodyRows) => `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`;

export const createPreview = () => {
    const table = styling + createTable(
        createHeadRow(5),
        createBodyRows([[
            { name: 'angular', type: 'Angular' },
            { name: 'html', type: 'HTML' },
            { name: 'python', type: 'Python' },
            { name: 'javascript', type: 'JavaScript' },
            { name: 'typescript', type: 'TypeScript' }
        ]])
    );
    return table;
};

interface IconDefintion {
    name: string;
    type: string;
}
