/*

!******----------------------------------------*******!
!******* mostly just an example of a migration *******!
!******----------------------------------------*******!


this just provides a version state object with version 0
should never run but encase it does wont cause a kaboom
in the app if theirs no state

*/
import { DEFAULT_STATE } from '../constants/default-state.js'

const version = 0

export const v0 = {
  version,
  migration,
}


async function migration (versionedState) {
  if (versionedState) return versionedState

  return {
    version,
    state: DEFAULT_STATE
  }
}