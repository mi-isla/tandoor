import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import {aliases, fa} from 'vuetify/iconsets/fa'

// Composables
import {createVuetify} from 'vuetify'
import * as vuetifyLocales from "vuetify/locale";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    defaults: {
        VCard: {
            rounded: 'lg',
            elevation: 1,
        },
        VBtn: {
            rounded: 'lg',
        },
        VCardActions: {
            class: 'float-right'
        },
        VContainer: {
            maxWidth: '1400px'
        },
        VSwitch: {
            color: 'primary'
        },
    },
    locale: {
        locale: 'en',
        fallback: 'en',
        messages: vuetifyLocales,
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#F5F7F6',
                    surface: '#FFFFFF',
                    'surface-bright': '#FFFFFF',
                    'surface-light': '#EEF2F0',
                    'surface-variant': '#E3EAE7',
                    'on-surface-variant': '#4A5C56',
                    cushina: '#1B3D36',
                    tandoor: '#1B3D36',
                    primary: '#2A6B5E',
                    secondary: '#D96E4C',
                    success: '#4A9B7F',
                    info: '#3B6EA8',
                    warning: '#D4A017',
                    error: '#C44D3A',

                    save: '#4A9B7F',
                    create: '#4A9B7F',
                    edit: '#3B6EA8',
                    delete: '#C44D3A',
                    cancel: '#8A9A94',

                    recipeImagePlaceholderBg: '#EEF2F0',
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#0D1210',
                    surface: '#161D1A',
                    'surface-bright': '#1E2824',
                    'surface-light': '#1A221F',
                    'surface-variant': '#24302B',
                    'on-surface-variant': '#A8B8B2',
                    cushina: '#0A1613',
                    tandoor: '#0A1613',
                    primary: '#5CB89E',
                    secondary: '#E8886A',
                    success: '#6BC4A8',
                    info: '#6A9FD4',
                    warning: '#E8C04A',
                    error: '#E07060',

                    save: '#6BC4A8',
                    create: '#6BC4A8',
                    edit: '#6A9FD4',
                    delete: '#E07060',
                    cancel: '#7A8A84',

                    recipeImagePlaceholderBg: '#1E2824',
                },
            },
        },
    },
    icons: {
        defaultSet: 'fa',
        aliases: {
            ...aliases,
            save: 'fa-solid fa-floppy-disk',
            delete: 'fa-solid fa-trash-can',
            edit: 'fa-solid fa-pencil',
            create: 'fa-solid fa-plus',
            upload: 'fa-solid fa-file-arrow-up',
            search: 'fa-solid fa-magnifying-glass',
            copy: 'fa-solid fa-copy',
            add: 'fa-solid fa-plus',
            close: 'fa-solid fa-xmark',
            help: 'fa-solid fa-info',
            settings: 'fa-solid fa-sliders',
            dragHandle: 'fa-solid fa-grip-vertical',
            spaces: 'fa-solid fa-database',
            shopping: 'fa-solid fa-cart-shopping',
            mealplan: 'fa-solid fa-calendar-days',
            recipes: 'fa-solid fa-book',
            books: 'fa-solid fa-book-bookmark',
            menu: 'fa-solid fa-ellipsis-vertical',
            import: 'fa-solid fa-globe',
            properties: 'fa-solid fa-database',
            pantry: 'fas fa-jar',
            automation: 'fa-solid fa-robot',
            ai: 'fa-solid fa-wand-magic-sparkles',
            reset: 'fa-solid fa-circle-xmark'
        },
        sets: {
            fa,
        },
    },
})

export type VDataTableUpdateOptions = {
    page: number;
    itemsPerPage: number;
    search: string;
    sortBy?: string;
    groupBy?: string;
}

const VUETIFY_LOCALES = new Set(Object.keys(vuetifyLocales))

const VUETIFY_LOCALE_MAP: Record<string, string> = {
    'nb-no': 'no',
    'nb': 'no',
    'pt-br': 'pt',
    'zh-hans': 'zhHans',
    'zh-hant': 'zhHant',
    'sr-cyrl': 'srCyrl',
    'sr-latn': 'srLatn',
}

export function toVuetifyLocale(djangoCode: string): string {
    const lc = djangoCode.toLowerCase()
    const mapped = VUETIFY_LOCALE_MAP[lc] || lc
    return VUETIFY_LOCALES.has(mapped) ? mapped : 'en'
}