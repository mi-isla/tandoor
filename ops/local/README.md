# Cushina lokaal

## Start (Docker of Podman)

```bash
cd ops/local
docker compose up --build -d
# of: podman compose up --build -d
```

Open **http://localhost:8085** — maak een account aan.

## Eenheden (US + metrisch)

Na eerste login, in de web-container:

```bash
docker compose exec web_recipes python manage.py seed_cushina_units
```

Of importeer Open Data (Instellingen → Open Data) met **unit** + **conversion** voor food-specifieke omrekeningen (cup bloem → gram).

## MCP

Zie `docs/MCP.md` — API-token in Cushina, dan `tandoor-mcp-server` op `http://localhost:8085`.