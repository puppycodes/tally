/* eslint-disable */

/* just some quick thoughts on pushing to posthog on a
 per event basis instead of including a lib...
 nothing to store and allows us to keep things pretty simple.
 */

 interface HogEventProp {
  distinct_id: string
  data: string
}
export interface HogEvent {
  api_key: string
  event: string
  properties: {
    [key: string]: HogEventProp
  }
}

type GetHogResponse = {
  data: HogEvent[]
}

async function createEvent() {
  try {
    const response = await fetch("https://app.posthog.com/capture/", {
      method: "POST",
      body: JSON.stringify({
        // this is a safe public write only api key
        // roll this key for demo 
        api_key: "phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        event: "Wallet Opened",
        properties: {
          distinct_id: "0000001",
          data: "some special data",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }

    const result = (await response.json()) as GetHogResponse

    // eslint-disable-next-line no-console
    console.log("result is: ", JSON.stringify(result, null, 4))
    return result
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log("error message: ", error.message)
      return error.message
    }
    // eslint-disable-next-line no-console
    console.log("unexpected error: ", error)
    return "An unexpected error occurred"
  }
}

// export function CreatePostHogSender<T>(HogEventproperties) {
//   return (props: T) => {
//     createEvent()
//   }
// }

// export const WalletOpenedEvent =
//   CreatePostHogSender<WalletOpenedEventProps>("Wallet Opened")
