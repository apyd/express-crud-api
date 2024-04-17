export const isUuidV4 = (id: string) => {
  const uuidv4Regex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[4][0-9a-fA-F]{3}\b-[89abAB][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}\b$/;
  return uuidv4Regex.test(id);
};
