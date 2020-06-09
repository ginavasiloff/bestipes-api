import { getRecipes } from "./read-source";

const mockSrc =
  '<script type="application/ld+json">[{"@context":"http://schema.org","@type":"Recipe", "recipeCategory":"main-dish"}]</script>';

test("It find a recipe schema", () => {
  const schema = getRecipes(mockSrc);
  expect(schema).toBeTruthy();
});
