import { error } from "@sveltejs/kit";
import { zfd } from "zod-form-data";

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const schema = zfd.formData({
      // matched to the name field in the form
      firstName: zfd.text(),
      lastName: zfd.text(),
      demoArrayJS: zfd.repeatableOfType(zfd.text()),
    });

    const res = await schema.safeParseAsync(data);

    if (!res.success) {
      throw error(400, "You must include both firstName and lastName");
    }

    const { firstName, lastName, demoArrayJS } = res.data;

    const message = `Hello ${firstName} ${lastName}, here is your array: ${demoArrayJS}`;

    return { message };
  },
};
