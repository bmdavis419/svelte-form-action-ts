import { error } from "@sveltejs/kit";
import { zfd } from "zod-form-data";
import { z } from "zod";

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const objectEntrySchema = z.object({
      name: z.string(),
      desc: z.string(),
    });

    const schema = zfd.formData({
      // matched to the name field in the form
      firstName: zfd.text(),
      lastName: zfd.text(),
      demoArrayJS: zfd.repeatableOfType(zfd.text()),
      objectArrayData: zfd.repeatableOfType(zfd.json(objectEntrySchema)),
    });

    const res = await schema.safeParseAsync(data);

    if (!res.success) {
      throw error(400, "You must include both firstName and lastName");
    }

    const { firstName, lastName, demoArrayJS } = res.data;

    const message = `Hello ${firstName} ${lastName}, here is your array: ${demoArrayJS}, here are the objectArrayData: ${res.data.objectArrayData.map(
      (entry) => entry.name
    )}`;

    console.log(res.data);

    return { message };
  },
};
