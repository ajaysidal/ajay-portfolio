import type { Config } from '@puckeditor/core';
import { Hero } from '@/components/blocks/Hero';
import { Features } from '@/components/blocks/Features';
import { Content } from '@/components/blocks/Content';

export type Props = {
  Hero: {
    tagline: string;
    headline: string;
    text: string;
  };
  Features: {
    items: { title: string; text: string }[];
  };
  Content: {
    body: string;
  };
};

export const puckConfig: Config<Props> = {
  components: {
    Hero: {
      fields: {
        tagline: { type: 'text', label: 'Tagline' },
        headline: { type: 'text', label: 'Headline' },
        text: { type: 'textarea', label: 'Supporting Text' },
      },
      defaultProps: {
        tagline: 'Welcome to Silas Studio',
        headline: 'Build the Future',
        text: 'Describe your vision here.',
      },
      render: Hero,
    },
    Features: {
      fields: {
        items: {
          type: 'array',
          arrayFields: {
            title: { type: 'text', label: 'Feature Title' },
            text: { type: 'textarea', label: 'Feature Description' },
          },
          label: 'Feature Items',
        },
      },
      defaultProps: {
        items: [{ title: 'Sovereign AI', text: 'Local, secure, and deterministic workflows.' }],
      },
      render: Features,
    },
    Content: {
      fields: {
        body: { type: 'textarea', label: 'Body Content' },
      },
      defaultProps: {
        body: 'Add your main content here.',
      },
      render: Content,
    },
  },
};
