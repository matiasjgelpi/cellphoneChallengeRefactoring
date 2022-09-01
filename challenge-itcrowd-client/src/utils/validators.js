export const validateProduct = (inputs, edit) => {
  const errors = {};
  if (!inputs.name && !edit) {
    errors.name = "Original title is required";
  } else if (inputs?.name.indexOf(" ") === 0) {
    errors.name = "No empty spaces allowed";
  }

  if (!inputs.image_url && !edit) {
    errors.image_url = "Image URL is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      inputs?.image_url
    ) && inputs.image_url
  ) {
    errors.image_url = "Image Url is not valid";
  }

  if (!inputs.price && !edit) {
    errors.price = "Price is required";
  }

  if (!inputs.brand && !edit) {
    errors.brand = "Brand is required";
  }

  if (!inputs.description && !edit) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length < 1) {
    errors.isValid = false;
  } else {
    errors.isValid = true;
  }

  return errors;
};

export const validateBrand = (inputs, edit) => {
  const errors = {};
  if (!inputs.name && !edit) {
    errors.name = "Name is required";
  } else if (inputs?.name.indexOf(" ") === 0) {
    errors.name = "No empty spaces allowed";
  }

  if (!inputs.logo_url && !edit) {
    errors.logo_url = "Image URL is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      inputs?.logo_url
    ) && inputs.logo_url
  ) {
    errors.logo_url = "Image Url is not valid";
  }

  if (Object.keys(errors).length < 1) {
    errors.isValid = false;
  } else {
    errors.isValid = true;
  }

  return errors;
};
