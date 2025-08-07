import 'server-only'

const dictionaries = {
 en: () => import('../../../public/locales/en.json').then((module) => module.default),
 es: () => import('../../../public/locales/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'es') =>
 dictionaries[locale]()