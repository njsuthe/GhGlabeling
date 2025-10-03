# Grocery Item GHG Labeling

A small research project exploring how greenhouse gas (GHG) labels on grocery items could inform shopper choices. I combine public nutrition/food datasets with product-level CO2e intensity estimates and visualize the impacts for different shopper profiles.

## Project Summary

- Pull base product and food group data from USDA APIs/datasets.
- Enrich items with CO2e intensities gathered from Our World in Data, CarbonCloud, and other peer-reviewed or industry sources.
- Aggregate emissions per item and per basket to show weekly, monthly, and annual GHG impacts.
- Present insights in a Tableau workbook/slides to illustrate potential label designs and behavior change.

## Data Sources

- USDA food data (for base item taxonomy and attributes)
  - FoodData Central API: item metadata and nutrient context
  - USDA reference groupings for food categories
- Greenhouse gas intensity references (CO2e per kg/lb/serving)
  - Our World in Data – food emissions research synthesis
  - CarbonCloud – product/category-level footprints (where available)
  - Additional literature/industry reports used to fill gaps

Note: Where multiple sources exist, the project selects a defensible, documented estimate (median/representative value) and records the source for transparency.

## Methodology (High-Level)

1. Ingest USDA product and category data via API/flat files.
2. Normalize and map items to a canonical category (e.g., Beef, Poultry, Dairy, Produce, Grains, Packaged Snacks).
3. Join/assign CO2e intensities by category or item (kg CO2e per kg; converted to serving sizes where relevant).
4. Compute per-item CO2e = intensity × quantity (by weight or serving).
5. Build "baskets" for three example shopper profiles with different mixes of high/low-intensity items.
6. Aggregate to weekly, monthly, and annual totals per profile.
7. Export tidy datasets for visualization in Tableau.

## Visualizations (Tableau)

- Food group comparison: average CO2e intensity across major groups
- Item-level view: distribution and outliers (e.g., ruminant meats vs plant proteins)
- Shopper profiles: three example weekly baskets → extrapolated to monthly and annual footprints
- Label mockups: examples of how per-item/receipt-level labeling might look in-store or online

## How to Reproduce (Outline)

1. Obtain USDA API key (if using FoodData Central API endpoints).
2. Run the data pull notebook to fetch and normalize USDA items/categories.
3. Load or curate the CO2e reference table (OWID, CarbonCloud, other sources) and map to categories/items.
4. Compute item/basket CO2e and export CSVs for Tableau.
5. Open the Tableau workbook (or slides) and refresh data sources.

This repo contains the core notebook for data preparation; the Tableau artifacts (PDF export provided) show the results and story.

## Repository Contents

- `Grocery_Item_GhG_Labeling.ipynb` – data prep/joins, intensity assignment, and basket calculations
- `Grocery Item GhG Labeling.pdf` – exported slides/storyboard from Tableau (CO2e by group + shopper profiles)

## Caveats and Assumptions

- Category-level intensities can mask brand/supply-chain variability.
- Estimates are sensitive to serving size, weight, and preparation assumptions.
- Some products lack definitive footprints; proxies are used and documented.
- The goal is comparative guidance, not exact accounting.

## Potential Extensions

- Add store-level SKU mapping and price signals
- Include uncertainty bands on item/basket estimates
- Expand profiles and sensitivity analyses (e.g., seasonal produce, local vs imported)
- Integrate additional datasets (e.g., Poore & Nemecek, retailer disclosures)

## License and Attribution

- Data and figures derived from sources cited above; please credit USDA, Our World in Data, CarbonCloud, and any additional referenced publications where used.
- This project is for educational and exploratory purposes.
