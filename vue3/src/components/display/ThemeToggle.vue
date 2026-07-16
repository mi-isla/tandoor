<template>
    <v-btn
        icon
        variant="text"
        class="d-print-none"
        :aria-label="isDark ? $t('ThemeLight') : $t('ThemeDark')"
        @click="toggleTheme"
    >
        <v-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"/>
    </v-btn>
</template>

<script setup lang="ts">
import {computed} from "vue"
import {useTheme} from "vuetify"
import {useUserPreferenceStore} from "@/stores/UserPreferenceStore"

const theme = useTheme()
const store = useUserPreferenceStore()

const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
    store.userSettings.theme = isDark.value ? 'TANDOOR' : 'TANDOOR_DARK'
    store.updateTheme()
    store.updateUserSettings()
}
</script>