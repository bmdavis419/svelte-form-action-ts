<script>
  import { enhance } from "$app/forms";

  const objectArrayData = [
    {
      name: "showcase",
      desc: "items",
    },
    {
      name: "items 2",
      desc: "showcase 2",
    },
  ];
</script>

<form
  class="w-full h-full p-4 flex flex-col gap-y-3"
  method="post"
  use:enhance={({ formData }) => {
    // a way to have an array of items passed in, added to form data via JS
    // these could be stored in state
    formData.append("demoArrayJS", "test 1");
    formData.append("demoArrayJS", "test 2");
    formData.append("demoArrayJS", "test 3");

    return async ({ result }) => {
      console.log("running");
      if (result.type === "error") {
        alert(`failure: ${result.error.message}`);
      }
      if (result.type === "success") {
        const data = result.data;
        alert(`success: ${data?.message}`);
      }
    };
  }}
>
  <h2 class="text-slate-900 text-3xl font-bold">Test Server Action</h2>
  <div>
    <label for="firstName" class="block text-slate-800 font-light"
      >First Name</label
    >
    <input
      name="firstName"
      id="firstName"
      class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
      type="text"
      placeholder="My"
    />
  </div>

  <div>
    <label for="lastName" class="block text-slate-800 font-light"
      >Last Name
    </label>
    <input
      name="lastName"
      id="lastName"
      class="px-2 py-1 text-slate-900 rounded-lg bg-slate-100 w-[300px] font-light"
      type="text"
      placeholder="Name"
    />
  </div>

  <div>
    <!-- This is either unhinged or pure brilliance -->
    {#each objectArrayData as entry}
      <input
        class="hidden"
        name="objectArrayData"
        value={JSON.stringify(entry)}
      />
    {/each}
  </div>

  <div>
    <button
      type="submit"
      class="bg-blue-600 text-white font-bold text-lg px-3 py-1 rounded-full"
      >Send</button
    >
  </div>
</form>
