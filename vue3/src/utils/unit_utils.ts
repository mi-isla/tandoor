import {Ingredient} from "@/openapi"
import {calculateFoodAmount} from "@/utils/number_utils"

export type UnitDisplayMode = 'both' | 'metric' | 'us' | 'original'

const US_BASE_UNITS = new Set([
    'us_cup', 'fluid_ounce', 'tsp', 'tbsp', 'pint', 'quart', 'gallon', 'ounce', 'pound',
    'imperial_fluid_ounce', 'imperial_pint', 'imperial_quart', 'imperial_gallon',
    'imperial_tbsp', 'imperial_tsp',
])

const METRIC_BASE_UNITS = new Set(['g', 'kg', 'ml', 'l'])

const US_NAME_PATTERNS = /^(cup|cups|tbsp|tbs|tsp|teaspoon|teaspoons|tablespoon|tablespoons|oz|ounce|ounces|lb|lbs|pound|pounds|fl\.?\s*oz|pint|pints|quart|quarts|gallon|gallons)$/i
const METRIC_NAME_PATTERNS = /^(g|gram|grams|kg|kilogram|kilograms|ml|milliliter|milliliters|l|liter|liters|litre|litres)$/i

export function unitSystem(unitName?: string | null, baseUnit?: string | null): 'us' | 'metric' | 'other' {
    const base = (baseUnit || '').toLowerCase()
    if (base && US_BASE_UNITS.has(base)) return 'us'
    if (base && METRIC_BASE_UNITS.has(base)) return 'metric'

    const name = (unitName || '').toLowerCase().trim()
    if (!name) return 'other'
    if (US_NAME_PATTERNS.test(name)) return 'us'
    if (METRIC_NAME_PATTERNS.test(name)) return 'metric'
    return 'other'
}

type ConversionRow = { food?: string; unit?: string; amount?: number }

export type AlternateIngredientDisplay = {
    amountHtml: string
    unit: string
    label: string
}

function formatAlternateAmount(amount: number, useFractions: boolean): string {
    return calculateFoodAmount(amount, 1, useFractions).replace(/<[^>]+>/g, '')
}

function pickTargetSystem(mode: UnitDisplayMode, current: 'us' | 'metric' | 'other'): 'us' | 'metric' | null {
    if (current === 'other') return null
    if (mode === 'both') return current === 'us' ? 'metric' : 'us'
    if (mode === 'metric' && current === 'us') return 'metric'
    if (mode === 'us' && current === 'metric') return 'us'
    return null
}

export function getAlternateIngredientDisplay(
    ingredient: Ingredient,
    mode: UnitDisplayMode,
    ingredientFactor: number,
    useFractions: boolean,
): AlternateIngredientDisplay | null {
    if (mode === 'original' || !ingredient.unit || ingredient.noAmount || !ingredient.amount) {
        return null
    }

    const conversions = (ingredient.conversions || []) as ConversionRow[]
    if (!conversions.length) return null

    const currentSystem = unitSystem(ingredient.unit.name, ingredient.unit.baseUnit)
    const target = pickTargetSystem(mode, currentSystem)
    if (!target) return null

    const match = conversions.find(c => c.unit && c.amount != null && unitSystem(c.unit) === target)

    if (!match?.unit || match.amount == null) return null

    const convertedAmount = match.amount * ingredientFactor

    return {
        amountHtml: formatAlternateAmount(convertedAmount, useFractions),
        unit: match.unit,
        label: mode === 'both' ? '≈' : '',
    }
}