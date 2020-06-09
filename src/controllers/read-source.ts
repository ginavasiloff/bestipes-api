export const getRecipes = (src: string) => {
  const tags = src.match(/<script.*?type="?application\/ld\+json"?.*?>/g);
  const schemas = getSchemas(tags, src);
  const recipes = schemas.reduce((acc, s) => {
    const thing = JSON.parse(s);
    if (Array.isArray(thing)) {
      const things = thing.filter((thing) => thing["@type"] === "Recipe");
      return things.length > 0 ? [...acc, ...things] : acc;
    }
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

const getSchemas = (tags: string[], src: string): string[] => {
  return tags.map((tag, idx) => {
    const start = src.indexOf(tag, idx);
    const temp = src.slice(start + tag.length);
    return temp.slice(0, temp.indexOf("</script>"));
  });
};
