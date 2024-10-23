interface Meta {
  siteTitle: string;
  description: string;
}

const metadata: Meta = {
  siteTitle: "Ashential Product Center",
  description: "Ashential Product Center",
};

export const getMeta = () => {
  return metadata;
};
