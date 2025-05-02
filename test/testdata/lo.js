module.exports = {
  fields: [
    {
      name: "title",
      config: { boost: 10 },
    },
    {
      name: "body",
    },
  ],
  documents: [
    {
      title: "ລາວ",
      body: "ປະເທດລາວ ຫຼື ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ ເປັນປະເທດທີ່ບໍ່ມີທາງອອກສູ່ທະເລ ຕັ້ງຢູ່ໃຈກາງຂອງ ອິນດູຈີນ ໃນ ອາຊີຕາເວັນອອກສ່ຽງໃຕ້",
      id: 1,
    },
    {
      title: "ນະຄອນຫຼວງວຽງຈັນ",
      body: "ນະຄອນຫຼວງວຽງຈັນ ເປັນນະຄອນຫຼວງ ແລະ ເປັນເມືອງທີ່ໃຫຍ່ທີ່ສຸດຂອງ ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ",
      id: 2,
    },
    {
      title: "ອາຫານລາວ",
      body: "ອາຫານລາວ ແມ່ນອາຫານທີ່ມີລົດຊາດເຜັດ ແລະ ມີຫຼາຍຊະນິດ ເຊັ່ນ: ຕຳໝາກຫຸ່ງ, ລາບ, ແກງໜໍ່ໄມ້, ແຈ່ວບອງ",
      id: 3,
    },
  ],
  tests: [
    {
      what: "find the word %w in multiple documents",
      search: "ລາວ",
      found: 3,
    },
    {
      what: "find the word %w in one document",
      search: "ນະຄອນຫຼວງ",
      found: 1,
    },
    {
      what: "find the word %w in one document",
      search: "ຈັນ",
      found: 1,
    },
    {
      what: "find the compound word %w in one document",
      search: "ປະເທດລາວ",
      found: 1,
    },
    {
      what: "never find a word that does not exist, like %w",
      search: "ບໍ່ມີຄຳນີ້",
      found: 0,
    },
    {
      what: "find a correctly stemmed word %w",
      search: "ອາຫານ",
      found: 1,
    },
  ],
};
