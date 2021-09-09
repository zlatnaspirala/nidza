
import { Utility } from "nidza";

/**
 * @description Examples loader handler
 * I use async loading script.
 */

Utility.importAsync("builds/" + Utility.QueryUrl().u, () => {
  console.info('Application runned.')
});