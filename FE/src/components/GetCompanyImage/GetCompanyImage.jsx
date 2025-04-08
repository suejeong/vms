const getCompanyImage = (name) => {
  const companyImages = import.meta.glob("/src/assets/images/companies/*.png", {
    eager: true,
    import: "default",
  });

  return companyImages[`/src/assets/images/companies/${name}.png`];
};

export default getCompanyImage;
