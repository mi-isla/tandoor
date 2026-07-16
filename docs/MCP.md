# Cushina / Tandoor MCP

Er is **geen officiële Tandoor MCP** in het Mi Isla-agent-plane, maar community-servers bestaan en werken met elke Tandoor/Cushina-instance via de REST API.

## Aanbevolen: `tandoor-mcp-server`

- Repo: [github.com/starbuck93/tandoor-mcp-server](https://github.com/starbuck93/tandoor-mcp-server)
- Alternatief: [github.com/ChristopherJMiller/tandoor-mcp](https://github.com/ChristopherJMiller/tandoor-mcp)

### Tools (o.a.)

| Tool | Doel |
|------|------|
| `get_recipes` / `get_recipe_details` | Recepten zoeken en ophalen |
| `create_tandoor_recipe` | Recept aanmaken (US cups/oz in `ingredients_block`) |
| `get_units` | Beschikbare eenheden (cup, g, oz, …) |
| `get_meal_plans` / `create_tandoor_meal_plan` | Meal planning |
| `get_shopping_list` / `add_shopping_list_item` | Boodschappenlijst |

### Configuratie (Cursor / Claude)

```json
{
  "mcpServers": {
    "tandoor": {
      "command": "node",
      "args": ["/pad/naar/tandoor-mcp-server/build/index.js"],
      "env": {
        "TANDOOR_URL": "http://localhost:8085",
        "TANDOOR_API_TOKEN": "jouw-api-token"
      }
    }
  }
}
```

API-token aanmaken in Cushina: **Instellingen → API → Access Token**.

### Eenheden via MCP

De MCP gebruikt Tandoor-eenheden zoals ze in je space staan. Na `seed_cushina_units` (of Open Data-import) kun je US (`cup`, `oz`) én metrisch (`g`, `ml`) gebruiken in `ingredients_block` en shopping-list calls.