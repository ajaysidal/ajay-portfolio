const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const servicesDir = path.join(__dirname, 'content/services');
const pagesDir = path.join(__dirname, 'content/pages');

if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.mdx'));

// Create a "Services" page layout in Puck format
const servicesPageData = {
  root: { props: {} },
  content: [
    {
      type: "Hero",
      props: {
        tagline: "Services",
        headline: "What I Deliver",
        text: "Core service pillars designed to transform your operations through technology, infrastructure, and intelligent automation."
      },
      id: "hero-services"
    },
    {
      type: "Features",
      props: {
        items: files.map(file => {
          const filePath = path.join(servicesDir, file);
          const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
          return {
            title: data.title || 'Service',
            text: content.trim().substring(0, 150) + '...' // Truncate for preview
          };
        })
      },
      id: "features-services"
    }
  ]
};

fs.writeFileSync(
  path.join(pagesDir, 'services.json'), 
  JSON.stringify(servicesPageData, null, 2)
);

console.log('✅ Successfully migrated services content to content/pages/services.json');
console.log('✅ Visit https://buildwithai.digital/services to see the Puck-rendered version!');
