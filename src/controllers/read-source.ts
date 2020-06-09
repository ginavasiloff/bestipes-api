import { access } from "fs";

export const getRecipes = (src: string) => {
  const tags = src.match(/<script.*?type="?application\/ld\+json"?.*?>/g);
  const schemas = tags.map((tag, idx) => {
    const start = src.indexOf(tag, idx);
    const temp = src.slice(start + tag.length);
    return temp.slice(0, temp.indexOf("</script>"));
  });
  const recipes = schemas.reduce((acc, s) => {
    const thing = JSON.parse(s);
    const recipe =
      thing["@type"] === "Recipe"
        ? thing
        : thing["@graph"]
        ? thing["@graph"].find((t) => t["@type"] === "Recipe")
        : null;
    return recipe ? [...acc, recipe] : acc;
  }, []);
  console.log(recipes);
  return recipes;
};
