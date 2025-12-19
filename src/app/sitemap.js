import { languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import fs from 'fs';
import path from 'path';

const MUST_HAVE_PAGES = [];

const DYNAMIC_ROUTES = [
  {
    segment: '[lng]',
    getAllSlugs: async () => [],
  },
];

export const dynamic = 'force-static';

const appDir = path.join(process.cwd(), 'src', 'app');

async function getAllStaticRoutes() {
  const routes = new Map();

  function walk(dir, base = '') {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      if (
        file.name.startsWith('(') ||
        ['api', 'sitemap', 'loading', '[...rest]'].includes(file.name)
      ) {
        continue;
      }

      if (file.isDirectory()) {
        const fullPath = path.join(dir, file.name);
        const newBase = base ? `${base}/${file.name}` : file.name;

        const hasPage = ['.js', '.jsx', '.ts', '.tsx'].some((ext) =>
          fs.existsSync(path.join(fullPath, `page${ext}`))
        );

        if (hasPage) {
          const now = new Date();
          const startOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          const lastModified = startOfDay.toISOString();

          routes.set(newBase, lastModified);
        }

        walk(fullPath, newBase);
      }
    }
  }

  walk(appDir);
  MUST_HAVE_PAGES.forEach((r) => routes.set(r, new Date()));

  return routes;
}

function fixSlashes(text) {
  const fixed = text.replace(/\/+/g, '/');
  return fixed !== '/' ? fixed.replace(/\/$/, '') : '/';
}

export default async function sitemap() {
  const staticRoutes = await getAllStaticRoutes();
  const entries = [];

  function addEntry({
    path = '',
    lastModified = new Date(),
    changeFrequency = 'weekly',
    priority = 0.8,
  }) {
    const base = BaseUrlAddress.endsWith('/')
      ? BaseUrlAddress.slice(0, -1)
      : BaseUrlAddress;

    const isRoot = path === '/' || path === '';
    const cleanPath = isRoot
      ? ''
      : fixSlashes(path.startsWith('/') ? path : `/${path}`);

    const alternates = { languages: {} };
    for (const lng of languages) {
      alternates.languages[lng] = `${base}${fixSlashes(`/${lng}${cleanPath}`)}`;
    }
    alternates.languages['x-default'] = `${base}${fixSlashes(cleanPath)}`;

    entries.push({
      url: `${base}${fixSlashes(cleanPath)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });
  }

  for (const [route, lastMod] of staticRoutes) {
    const cleaned = route.replace('[lng]', '').replace(/\/+/g, '/');
    const isHome = cleaned === '';

    addEntry({
      path: cleaned || '/',
      lastModified: lastMod,
      changeFrequency: isHome ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : 0.9,
    });
  }

  for (const dyn of DYNAMIC_ROUTES) {
    const slugs = await dyn.getAllSlugs();
    for (const item of slugs) {
      const base = dyn.segment.replace('[lng]', '');
      const itemPath = `${base}${item.slug}`.replace(/\/+/g, '/');

      addEntry({
        path: itemPath,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
        priority: 0.8,
        changeFrequency: 'weekly',
      });
    }
  }

  return entries;
}
