const TagShowService = require("./TagShowService");
const TagsRepositoryInMemory = require("../../repositories/TagsRepositoryInMemory");

describe("TagShowService", () => {
  let tagShowService = null;
  let tagsRepositoryInMemory = null;

  beforeEach(() => {
    tagsRepositoryInMemory = new TagsRepositoryInMemory();
    tagShowService = new TagShowService(tagsRepositoryInMemory);
  });

  it("Buscando por tags", async () => {
    const tags = {
      id: Math.floor(Math.random() * 1000) + 1,
      note_id: Math.floor(Math.random() * 1000) + 1,
      user_id: Math.floor(Math.random() * 1000) + 1,
      name: "tag teste",
    };

    const tagCreate = await tagsRepositoryInMemory.create(tags);
    const showTags = await tagShowService.execute(tagCreate.user_id);

    await expect(showTags).toEqual([tagCreate]);
  });

  it("Buscando por tag inexistente", async () => {
    const tags = {};

    const tagCreate = await tagsRepositoryInMemory.create(tags);
    const showTags = await tagShowService.execute(tagCreate.user_id);

    await expect(showTags).toEqual([tagCreate]);
  });
});
