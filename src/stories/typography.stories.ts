import type { Meta } from '@storybook/web-components';
import { html } from 'lit';


export const SoliasNativeHeadings = () => {
return html`
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
  `;
};

const meta = {
  title: 'Typography/Headings',
  tags: ['autodocs'],
  render: () => SoliasNativeHeadings(),
} satisfies Meta;

export default meta;
