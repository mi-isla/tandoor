# Customization backlog – Mi Isla fork (Cushina)

## Thema / Branding
- [x] Rebrand naar **Cushina** (logo, titel, defaults)
- [x] Modern kleurenpalet (sage + coral) met **light** en **dark** mode
- [x] Thema-toggle in de navigatiebalk
- [ ] PWA-icon PNG's regenereren vanuit `logo_color.svg`
- [ ] Legacy Bootstrap-thema's (`tandoor.min.css`) alignen als die pagina's nog gebruikt worden

## Alma-integratie
- [ ] Koppeling met Alma-assistant voor receptbeheer
- [ ] Authenticatie via Alma i.p.v. standaard login

## Eenheden (US + metrisch)
- [x] `seed_cushina_units` management command (US + metric units + generieke omrekeningen)
- [x] Receptweergave: **beide** eenheden standaard (origineel + automatische omrekening)
- [x] Instelling: eenhedenweergave (beide / metrisch / US / origineel)
- [ ] Open Data-import voor food-specifieke omrekeningen (1 cup bloem = 125 g) via onboarding
- [ ] MCP gekoppeld aan lokale instance (zie `docs/MCP.md`)

## Nederlandse standaardwaarden
- [ ] Nederlandse taal als default
- [ ] Locale datum-/tijdnotatie

## Overig
- [ ] `.env` toevoegen aan `.gitignore` (indien nog niet aanwezig)
- [ ] Geen secrets/credentials committen