import {ShoppingList, Supermarket} from "@/openapi";
import type {UnitDisplayMode} from "@/utils/unit_utils";

export type DeviceSettings = {
    shopping_show_checked_entries: boolean
    shopping_show_delayed_entries: boolean
    shopping_show_selected_supermarket_only: boolean
    shopping_selected_grouping: string
    shopping_selected_supermarket: Supermarket | null
    shopping_selected_shopping_lists: number[]
    shopping_item_info_created_by: boolean
    shopping_item_info_mealplan: boolean
    shopping_item_info_recipe: boolean
    shopping_input_autocomplete: boolean
    shopping_show_debug: boolean

    mealplan_displayPeriod: string
    mealplan_displayPeriodCount: number
    mealplan_startingDayOfWeek: number
    mealplan_displayWeekNumbers: boolean

    recipe_mergeStepOverview: boolean,

    search_itemsPerPage: number,
    search_viewMode: 'table'|'grid',
    search_visibleFilters: String[],

    start_showMealPlan: boolean,

    general_tableItemsPerPage: number
    general_closedHelpAlerts: String[]

    /** original | metric | us | both (default: show US + metric side by side) */
    unit_display_mode: UnitDisplayMode
}