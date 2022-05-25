import { ArrowRightIcon } from "@heroicons/react/outline";
import { ActionFunction, redirect } from "@remix-run/cloudflare";
import { Form, Link } from "@remix-run/react";
import { constructUrlForDo } from "~/utils";

export const action: ActionFunction = async ({ context, request }) => {
  const { allowedPlayersInTotal, topic } = Object.fromEntries(await request.formData())

  const payload = {
      isPrivate: true,
      allowedPlayersInTotal,
      topic
  }

  const { env } = context

  const response = await fetch(constructUrlForDo(env.DO_HOST, 'rams'), { 
      method: 'POST',
      body: JSON.stringify(payload)
  })

  const { ramId } = await response.json()

  return redirect(`/rams/${ramId}`)
}

export default function Index() {
  return (
    <div className="flex flex-col gap-20 items-center mx-auto my-0 h-full justify-center">
      <div className="flex flex-col gap-10">
        <h1 className="text-center font-bold text-6xl">RAMory</h1>
        <h2 className="text-center font-semibold text-4xl">How good is your memory?</h2>
      </div>
      <Form method="post" className="flex flex-row items-center gap-5 justify-evenly w-full">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">How many Players?</p>
          <input type="number" min="1" max="10" placeholder="1-10" className="" name="allowedPlayersInTotal" required />
        </div> 
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Topic</p>
          <div className="flex flex-row gap-1 items-center">
            <input type="radio" id="fruits" name="topic" value="fruits" defaultChecked />
            <label htmlFor="fruits">Fruits</label>
          </div>
        </div>
        <div>
          <button type="submit" className="flex flex-row gap-2 items-center py-2 px-4 text-center bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
            Let's find out
            <ArrowRightIcon className="h-4" />
          </button>
        </div>
      </Form>
    </div>
  );
}
