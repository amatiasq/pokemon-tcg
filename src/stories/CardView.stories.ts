import type { Meta, StoryObj } from 'storybook-solidjs';
import { CardView } from '../card/CardView';

const meta = {
  title: 'Example/CardView',
  component: CardView,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/solid/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/solid/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    card: {
      id: 1,
      name: 'Test Card',
      images: {
        small: 'https://images.pokemontcg.io/basep/1.png',
        large: 'https://images.pokemontcg.io/basep/1_hires.png',
      },
    },
  },
};

// export const LoggedOut: Story = {};
