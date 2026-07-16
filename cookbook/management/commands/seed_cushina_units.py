from django.core.management.base import BaseCommand
from django_scopes import scopes_disabled

from cookbook.models import Space, Unit, UnitConversion, UserSpace

# US + metric units with Tandoor base_unit keys for automatic conversion.
CUSHINA_UNITS = [
    # Metric weight
    ('g', 'g', 'gram', 'gram'),
    ('kg', 'kg', 'kilogram', 'kilogram'),
    # US weight
    ('oz', 'ounce', 'ounce', 'ounces'),
    ('lb', 'pound', 'pound', 'pounds'),
    # Metric volume
    ('ml', 'ml', 'milliliter', 'milliliters'),
    ('l', 'l', 'liter', 'liters'),
    # US volume
    ('cup', 'us_cup', 'cup', 'cups'),
    ('tsp', 'tsp', 'teaspoon', 'teaspoons'),
    ('tbsp', 'tbsp', 'tablespoon', 'tablespoons'),
    ('fl oz', 'fluid_ounce', 'fluid ounce', 'fluid ounces'),
    ('pint', 'pint', 'pint', 'pints'),
    ('quart', 'quart', 'quart', 'quarts'),
    ('gallon', 'gallon', 'gallon', 'gallons'),
]

# Generic volume bridges (food-agnostic; food-specific density via Open Data import).
GENERIC_VOLUME_CONVERSIONS = [
    ('cup', 'ml', 240),
    ('tbsp', 'ml', 15),
    ('tsp', 'ml', 5),
    ('fl oz', 'ml', 30),
    ('pint', 'ml', 473),
    ('quart', 'ml', 946),
    ('gallon', 'ml', 3785),
]

GENERIC_WEIGHT_CONVERSIONS = [
    ('oz', 'g', 28.35),
    ('lb', 'g', 453.59),
]


class Command(BaseCommand):
    help = 'Seed Cushina US + metric units and generic conversions for all spaces'

    def handle(self, *args, **options):
        with scopes_disabled():
            for space in Space.objects.all():
                owner = self._space_owner(space)
                if owner is None:
                    self.stdout.write(self.style.WARNING(
                        f'Space "{space.name}" (id={space.id}): skipped, no owner user'
                    ))
                    continue
                created_units = self._seed_units(space)
                created_conv = self._seed_conversions(space, owner)
                self.stdout.write(self.style.SUCCESS(
                    f'Space "{space.name}" (id={space.id}): +{created_units} units, +{created_conv} conversions'
                ))

    def _space_owner(self, space):
        if space.created_by_id:
            return space.created_by
        userspace = UserSpace.objects.filter(space=space).select_related('user').first()
        return userspace.user if userspace else None

    def _seed_units(self, space) -> int:
        created = 0
        for name, base_unit, _desc_singular, plural_name in CUSHINA_UNITS:
            _, was_created = Unit.objects.get_or_create(
                space=space,
                name=name,
                defaults={
                    'base_unit': base_unit,
                    'plural_name': plural_name,
                    'description': '',
                },
            )
            if was_created:
                created += 1
        return created

    def _seed_conversions(self, space, owner) -> int:
        created = 0
        units_by_name = {u.name: u for u in Unit.objects.filter(space=space)}

        for conversions in (GENERIC_VOLUME_CONVERSIONS, GENERIC_WEIGHT_CONVERSIONS):
            for from_name, to_name, factor in conversions:
                base = units_by_name.get(from_name)
                converted = units_by_name.get(to_name)
                if not base or not converted:
                    continue
                _, was_created = UnitConversion.objects.get_or_create(
                    space=space,
                    base_unit=base,
                    converted_unit=converted,
                    food=None,
                    defaults={
                        'base_amount': 1,
                        'converted_amount': factor,
                        'created_by': owner,
                    },
                )
                if was_created:
                    created += 1
        return created