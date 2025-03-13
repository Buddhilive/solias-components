import type { Meta } from '@storybook/web-components';
import { html } from 'lit';


export const SoliasNativeParagraphs = () => {
return html`
<p>Lorem ipsum dolor sit amet, <u>consectetur</u> adipiscing elit. Mauris urna nibh, interdum at mi vehicula, varius suscipit mi. <em>Vestibulum</em> non mollis neque. Nunc facilisis leo ipsum, et commodo dui luctus a. Aenean felis erat, finibus ut suscipit et, pretium in metus. Fusce fringilla congue risus in molestie. Nulla ipsum urna, <a href="#" target="_blank">porta et lacinia in</a>, rhoncus non tellus. Etiam a tempor mauris. Nulla facilisi. Curabitur enim sem, facilisis et lectus et, varius varius eros. Aliquam maximus, dui id auctor suscipit, nunc nibh tristique enim, et venenatis lorem purus et lectus. Donec auctor ante ac vestibulum sagittis.</p>
  `;
};

const meta = {
  title: 'Typography/Paragraphs',
  tags: ['autodocs'],
  render: () => SoliasNativeParagraphs(),
} satisfies Meta;

export default meta;